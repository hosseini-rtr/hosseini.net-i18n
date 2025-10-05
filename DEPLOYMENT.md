# Ubuntu Server Deployment Guide for hosseini.net-i18n

## 📋 Prerequisites

- Ubuntu 20.04+ server with sudo access
- Domain name pointed to your server IP
- SSH access configured

## 🚀 Quick Deployment

### Step 1: Server Setup (Run on Ubuntu Server)

```bash
# Download and run the setup script
wget https://raw.githubusercontent.com/your-repo/server-setup.sh
chmod +x server-setup.sh
./server-setup.sh
```

**Or manually:**

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx
sudo systemctl enable nginx
sudo systemctl start nginx

# Setup firewall
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw --force enable

# Create app directory
sudo mkdir -p /var/www/hosseini.net
sudo chown -R $USER:$USER /var/www/hosseini.net
```

### Step 2: Configure Environment (On Your Local Machine)

```bash
# Copy environment template
cp .env.production.example .env.production

# Edit with your production values
nano .env.production
```

### Step 3: Deploy Application

**Option A: Server-Side Deployment (Recommended)**

```bash
# Make deployment script executable
chmod +x deploy-server.sh

# Update server details in the script
nano deploy-server.sh

# Deploy
./deploy-server.sh
```

**Option B: Static Export Deployment**

```bash
# Configure next.config.mjs for static export
# Add: output: 'export'

# Make deployment script executable
chmod +x deploy-static.sh

# Update server details
nano deploy-static.sh

# Deploy
./deploy-static.sh
```

### Step 4: Configure Nginx

```bash
# On your server, copy the Nginx configuration
sudo cp /path/to/nginx/hosseini.net.conf /etc/nginx/sites-available/hosseini.net

# Edit domain name
sudo nano /etc/nginx/sites-available/hosseini.net

# Enable site
sudo ln -sf /etc/nginx/sites-available/hosseini.net /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Step 5: Setup SSL (Optional but Recommended)

```bash
# Install Certbot
sudo snap install --classic certbot

# Get SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

## 🔧 Configuration Files

### Server Configuration Files:

- `server-setup.sh` - Ubuntu server setup
- `deploy-server.sh` - Server-side deployment
- `deploy-static.sh` - Static export deployment
- `nginx/hosseini.net.conf` - Nginx configuration
- `ecosystem.config.json` - PM2 configuration

### Application Files:

- `.env.production.example` - Production environment template
- `next.config.mjs` - Next.js configuration

## 📊 Managing Your Application

### PM2 Commands:

```bash
# Check status
pm2 status

# View logs
pm2 logs hosseini-net

# Restart app
pm2 restart hosseini-net

# Stop app
pm2 stop hosseini-net

# Monitor
pm2 monit
```

### Nginx Commands:

```bash
# Test configuration
sudo nginx -t

# Reload configuration
sudo systemctl reload nginx

# Restart Nginx
sudo systemctl restart nginx

# Check status
sudo systemctl status nginx
```

## 🔍 Troubleshooting

### Application Not Starting:

```bash
# Check PM2 logs
pm2 logs hosseini-net

# Check if port 3000 is in use
sudo netstat -tlnp | grep :3000

# Manually start for debugging
cd /var/www/hosseini.net
npm start
```

### Nginx Issues:

```bash
# Check Nginx error logs
sudo tail -f /var/log/nginx/error.log

# Test configuration
sudo nginx -t

# Check if Nginx is running
sudo systemctl status nginx
```

### SSL Issues:

```bash
# Renew SSL certificate
sudo certbot renew --dry-run

# Check certificate status
sudo certbot certificates
```

## 🔄 Updates and Maintenance

### To Update Your Application:

1. Run the deployment script again: `./deploy-server.sh`
2. PM2 will automatically restart the application

### Regular Maintenance:

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Update Node.js packages globally
sudo npm update -g

# Clean PM2 logs
pm2 flush
```

## 🌐 Multi-Language Support

Your app supports three languages:

- **English**: `https://your-domain.com/en`
- **Persian/Farsi**: `https://your-domain.com/fa`
- **Italian**: `https://your-domain.com/it`

The Nginx configuration handles all locale routing automatically.

## 📈 Performance Optimization

Your deployment includes:

- ✅ Gzip compression
- ✅ Static asset caching
- ✅ CDN-ready headers
- ✅ Security headers
- ✅ Process management with PM2
- ✅ Automatic restarts on failure

## 🔐 Security Features

- UFW firewall configured
- Nginx security headers
- SSL/TLS encryption ready
- Sensitive file access blocked
- Process isolation with PM2

## 📞 Support

If you encounter issues:

1. Check the logs: `pm2 logs hosseini-net`
2. Verify Nginx: `sudo nginx -t`
3. Check system resources: `htop` or `free -h`
4. Review firewall: `sudo ufw status`
