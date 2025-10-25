#!/bin/bash

# Deployment script for hosseini.net on Ubuntu server with PM2
# Usage: ./deploy-pm2.sh

set -e  # Exit on any error

echo "🚀 Starting deployment for hosseini.net..."

# Configuration
APP_DIR="/var/www/hosseini.net"
APP_NAME="hosseini-net"
NGINX_CONF="nginx/hosseini-rtr.ir.conf"
NGINX_SITES_AVAILABLE="/etc/nginx/sites-available/hosseini-rtr.ir"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored messages
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the project root."
    exit 1
fi

# Step 1: Pull latest changes (if using git)
if [ -d ".git" ]; then
    echo "📥 Pulling latest changes from git..."
    git pull origin main || {
        print_warning "Git pull failed or no changes. Continuing anyway..."
    }
    print_success "Code updated"
fi

# Step 2: Install dependencies
echo "📦 Installing dependencies..."
npm ci
print_success "Dependencies installed"

# Step 3: Build the application
echo "🔨 Building Next.js application..."
npm run build
print_success "Build completed"

# Step 4: DON'T remove dev dependencies - they're needed for runtime
# Commented out to prevent build issues
# echo "🧹 Removing dev dependencies..."
# npm prune --production
# print_success "Dev dependencies removed"

# Step 5: Restart PM2 app
if command -v pm2 &> /dev/null; then
    echo "🔄 Restarting PM2 application..."
    
    # Check if app is already running
    if pm2 describe "$APP_NAME" &> /dev/null; then
        pm2 reload "$APP_NAME" --update-env
        print_success "PM2 app reloaded (zero-downtime)"
    else
        # Start new instance
        if [ -f "ecosystem.config.js" ]; then
            pm2 start ecosystem.config.js
        else
            pm2 start npm --name "$APP_NAME" -- start
        fi
        pm2 save
        print_success "PM2 app started"
    fi
    
    # Show status
    pm2 list
else
    print_error "PM2 not found. Please install PM2: npm install -g pm2"
    exit 1
fi

# Step 6: Update Nginx config (optional)
if [ -f "$NGINX_CONF" ]; then
    echo "🌐 Checking Nginx configuration..."
    
    # Ask user if they want to update Nginx config
    read -p "Update Nginx configuration? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        sudo cp "$NGINX_CONF" "$NGINX_SITES_AVAILABLE"
        
        # Test Nginx configuration
        if sudo nginx -t; then
            sudo systemctl reload nginx
            print_success "Nginx configuration updated and reloaded"
        else
            print_error "Nginx configuration test failed. Please fix errors."
            exit 1
        fi
    else
        print_warning "Skipped Nginx configuration update"
    fi
fi

# Step 7: Verify deployment
echo "🔍 Verifying deployment..."

sleep 3  # Give app a moment to start

if curl -f http://localhost:3313 > /dev/null 2>&1; then
    print_success "Application is running on http://localhost:3313"
else
    print_error "Application is not responding on port 3313"
    print_warning "Check logs with: pm2 logs $APP_NAME"
    exit 1
fi

# Final summary
echo ""
echo "═══════════════════════════════════════════════════════"
print_success "Deployment completed successfully! 🎉"
echo "═══════════════════════════════════════════════════════"
echo ""
echo "Useful commands:"
echo "  • View logs:      pm2 logs $APP_NAME"
echo "  • Check status:   pm2 status"
echo "  • Monitor:        pm2 monit"
echo "  • Restart:        pm2 restart $APP_NAME"
echo "  • Stop:           pm2 stop $APP_NAME"
echo ""
echo "Site URL: https://hosseini-rtr.ir"
echo ""
