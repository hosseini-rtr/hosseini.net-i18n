#!/bin/bash

# Ubuntu Server Deployment Script for Next.js Static Export
# Make sure to update the configuration below

# Server configuration
SERVER_USER="your-username"       # Your Ubuntu server username
SERVER_HOST="your-server-ip"      # Server IP address or domain
SERVER_PORT="22"                  # SSH port (usually 22)
SERVER_PATH="/var/www/hosseini.net"  # Deployment path on the server

# Local configuration
LOCAL_OUT_DIR="out"
PROJECT_NAME="hosseini.net-i18n"

# Colors for better output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No color

# Function to display messages
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1" >&2
}

# Function to display error and exit
error_exit() {
    log_error "$1"
    exit 1
}

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    error_exit "npm is not installed. Please install Node.js and npm."
fi

log_info "Starting deployment process..."

# Test SSH connection
log_info "Testing SSH connection to the server..."
ssh -q -p "$SERVER_PORT" "$SERVER_USER@$SERVER_HOST" exit || error_exit "SSH connection failed. Please check SSH settings."

# Install dependencies
log_info "Installing dependencies..."
npm install || error_exit "Failed to install dependencies."

# Build Next.js project for production
log_info "Building Next.js project for production..."
npm run build || error_exit "Project build failed."

# Create output directory if it doesn't exist (for static export)
if [ ! -d "$LOCAL_OUT_DIR" ]; then
    log_warn "Output directory doesn't exist. Creating static export..."
    npx next export || error_exit "Static export failed."
fi

# Check if the output directory exists and has content
if [ ! -d "$LOCAL_OUT_DIR" ] || [ -z "$(ls -A $LOCAL_OUT_DIR)" ]; then
    error_exit "Output directory $LOCAL_OUT_DIR is empty or doesn't exist."
fi

# Compress output files
log_info "Compressing output files..."
tar -czf "${PROJECT_NAME}.tar.gz" -C "$LOCAL_OUT_DIR" . || error_exit "File compression failed."

# Transfer compressed file to the server
log_info "Transferring files to the server..."
scp -P "$SERVER_PORT" "${PROJECT_NAME}.tar.gz" "$SERVER_USER@$SERVER_HOST:/tmp/" || error_exit "File transfer to server failed."

# Extract files on the server and set permissions
log_info "Extracting files and setting permissions on the server..."
ssh -p "$SERVER_PORT" "$SERVER_USER@$SERVER_HOST" << EOF
    # Create directory if it doesn't exist
    sudo mkdir -p $SERVER_PATH
    
    # Remove previous contents
    sudo rm -rf $SERVER_PATH/*
    
    # Extract compressed file
    sudo tar -xzf /tmp/${PROJECT_NAME}.tar.gz -C $SERVER_PATH/ || exit 1
    
    # Remove temporary compressed file
    rm /tmp/${PROJECT_NAME}.tar.gz
    
    # Set ownership and permissions
    sudo chown -R www-data:www-data $SERVER_PATH
    sudo chmod -R 755 $SERVER_PATH
    
    # Create necessary directories
    sudo mkdir -p $SERVER_PATH/data
    sudo chown -R www-data:www-data $SERVER_PATH/data
    sudo chmod -R 775 $SERVER_PATH/data
EOF

[ $? -eq 0 ] || error_exit "Deployment on server failed."

# Remove local compressed file
log_info "Cleaning up local files..."
rm "${PROJECT_NAME}.tar.gz" || log_warn "Failed to remove local compressed file."

log_info "Deployment completed successfully!"
log_info "Your site should be available at: http://$SERVER_HOST"