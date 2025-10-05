#!/bin/bash

# Ubuntu Server Deployment Script for Next.js with Server-Side Features
# This script deploys your Next.js app as a Node.js application with PM2

# Server configuration
SERVER_USER="your-username"
SERVER_HOST="your-server-ip"
SERVER_PORT="22"
SERVER_PATH="/var/www/hosseini.net"
APP_NAME="hosseini-net"
APP_PORT="3000"

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

log_info "Starting server-side deployment..."

# Test SSH connection
log_info "Testing SSH connection..."
ssh -q -p "$SERVER_PORT" "$SERVER_USER@$SERVER_HOST" exit || error_exit "SSH connection failed."

# Build the project locally
log_info "Building project locally..."
npm install || error_exit "Failed to install dependencies."
npm run build || error_exit "Build failed."

# Create deployment package
log_info "Creating deployment package..."
tar -czf hosseini-net-app.tar.gz \
    .next \
    public \
    data \
    package.json \
    package-lock.json \
    next.config.mjs \
    i18n.ts \
    messages \
    || error_exit "Failed to create deployment package."

# Transfer to server
log_info "Transferring files to server..."
scp -P "$SERVER_PORT" hosseini-net-app.tar.gz "$SERVER_USER@$SERVER_HOST:/tmp/" || error_exit "File transfer failed."

# Deploy on server
log_info "Deploying on server..."
ssh -p "$SERVER_PORT" "$SERVER_USER@$SERVER_HOST" << EOF
    set -e
    
    # Create application directory
    sudo mkdir -p $SERVER_PATH
    cd $SERVER_PATH
    
    # Stop existing application
    if command -v pm2 &> /dev/null; then
        pm2 stop $APP_NAME || true
        pm2 delete $APP_NAME || true
    fi
    
    # Extract new version
    sudo tar -xzf /tmp/hosseini-net-app.tar.gz -C $SERVER_PATH/
    sudo chown -R $USER:$USER $SERVER_PATH
    
    # Install production dependencies
    npm ci --only=production
    
    # Create data directory if it doesn't exist
    mkdir -p data
    
    # Copy posts.json if it doesn't exist
    if [ ! -f data/posts.json ]; then
        echo '[]' > data/posts.json
    fi
    
    # Start application with PM2
    if command -v pm2 &> /dev/null; then
        pm2 start npm --name "$APP_NAME" -- start
        pm2 save
    else
        echo "PM2 not installed. Starting with nohup..."
        nohup npm start > app.log 2>&1 &
    fi
    
    # Clean up
    rm /tmp/hosseini-net-app.tar.gz
EOF

[ $? -eq 0 ] || error_exit "Server deployment failed."

# Clean up local files
rm hosseini-net-app.tar.gz

log_info "Deployment completed successfully!"
log_info "Application should be running on port $APP_PORT"