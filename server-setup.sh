#!/bin/bash

# Ubuntu Server Setup Script for Next.js Deployment
# Run this script on your Ubuntu server to set up the environment

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1" >&2
}

error_exit() {
    log_error "$1"
    exit 1
}

# Check if running as root
if [ "$EUID" -eq 0 ]; then
    log_error "Please don't run this script as root. Use a regular user with sudo privileges."
    exit 1
fi

log_info "Setting up Ubuntu server for Next.js deployment..."

# Update system packages
log_info "Updating system packages..."
sudo apt update && sudo apt upgrade -y || error_exit "Failed to update system packages."

# Install essential packages
log_info "Installing essential packages..."
sudo apt install -y curl wget git unzip software-properties-common apt-transport-https ca-certificates gnupg lsb-release || error_exit "Failed to install essential packages."

# Install Node.js (using NodeSource repository for latest LTS)
log_info "Installing Node.js..."
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
    sudo apt-get install -y nodejs || error_exit "Failed to install Node.js."
else
    log_info "Node.js is already installed: $(node --version)"
fi

# Install PM2 for process management
log_info "Installing PM2..."
if ! command -v pm2 &> /dev/null; then
    sudo npm install -g pm2 || error_exit "Failed to install PM2."
    
    # Setup PM2 startup
    pm2 startup
    log_warn "Please run the command above if PM2 startup was configured."
else
    log_info "PM2 is already installed: $(pm2 --version)"
fi

# Install Nginx
log_info "Installing Nginx..."
if ! command -v nginx &> /dev/null; then
    sudo apt install -y nginx || error_exit "Failed to install Nginx."
    sudo systemctl enable nginx
    sudo systemctl start nginx
else
    log_info "Nginx is already installed."
fi

# Install UFW (Uncomplicated Firewall)
log_info "Setting up firewall..."
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw --force enable

# Create application directory
log_info "Creating application directory..."
sudo mkdir -p /var/www/hosseini.net
sudo chown -R $USER:$USER /var/www/hosseini.net

# Install SSL with Let's Encrypt (Certbot)
log_info "Installing Certbot for SSL certificates..."
sudo snap install core; sudo snap refresh core
sudo snap install --classic certbot
sudo ln -sf /snap/bin/certbot /usr/bin/certbot || true

# Create basic Nginx site configuration
log_info "Creating basic Nginx configuration..."
sudo tee /etc/nginx/sites-available/hosseini.net > /dev/null << 'EOF'
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

# Enable the site
sudo ln -sf /etc/nginx/sites-available/hosseini.net /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx || log_warn "Nginx configuration test failed. Please check manually."

# Display summary
log_info "Server setup completed successfully!"
echo ""
echo "Next steps:"
echo "1. Update the domain name in /etc/nginx/sites-available/hosseini.net"
echo "2. Point your domain DNS to this server's IP address"
echo "3. Run SSL setup: sudo certbot --nginx -d your-domain.com -d www.your-domain.com"
echo "4. Deploy your application using the deployment script"
echo ""
echo "Installed versions:"
echo "- Node.js: $(node --version)"
echo "- npm: $(npm --version)"
echo "- PM2: $(pm2 --version)"
echo "- Nginx: $(nginx -v 2>&1)"
echo ""
log_info "Your server is ready for Next.js deployment!"