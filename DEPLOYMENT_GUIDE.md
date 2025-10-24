# Deployment Guide for hosseini.net on Ubuntu Server

This guide provides two deployment options:

- **Option A: PM2 (Recommended)** - Simple, direct Node.js deployment
- **Option B: Docker** - Containerized deployment

Both options use your existing Nginx setup with SSL already configured.

---

## Prerequisites

1. **Ubuntu Server** (20.04 / 22.04 / 24.04)
2. **SSH access** with sudo privileges
3. **Domain:** hosseini-rtr.ir (already configured with SSL ✓)
4. **Nginx** already installed ✓
5. **Git** installed on server

---

## Option A: Deploy with PM2 (Recommended - Easiest)

### Step 1: Install Node.js 20

```bash
# Add NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

# Install Node.js
sudo apt install -y nodejs

# Verify installation
node --version  # Should show v20.x.x
npm --version
```

### Step 2: Install PM2 globally

```bash
sudo npm install -g pm2@latest
pm2 --version
```

### Step 3: Clone and setup the project

```bash
# Create directory
sudo mkdir -p /var/www/hosseini.net
sudo chown $USER:$USER /var/www/hosseini.net

# Clone repository
cd /var/www
git clone https://github.com/hosseinirtr/hosseini.net-i18n.git hosseini.net
cd hosseini.net

# Create .env.production file with your environment variables
nano .env.production
```

Example `.env.production`:

```env
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://hosseini-rtr.ir
# Add your other environment variables here
```

### Step 4: Install dependencies and build

**Option 4a - Build with devDependencies** (simpler):

```bash
npm ci
npm run build
```

**Option 4b - Build for production** (recommended):

```bash
# Install dependencies (including devDependencies for build)
npm ci

# Build the project
npm run build

# Remove devDependencies to save space
npm prune --production
```

### Step 5: Start with PM2

```bash
# Option 1: Start with ecosystem file (recommended)
pm2 start ecosystem.config.js

# Option 2: Start manually
pm2 start npm --name "hosseini-net" -- start
```

### Step 6: Configure PM2 for auto-restart on server reboot

```bash
pm2 save
pm2 startup systemd
# Follow the command that PM2 outputs (it will give you a sudo command to run)
```

### Step 7: Update Nginx configuration

```bash
# Backup current config
sudo cp /etc/nginx/sites-available/hosseini-rtr.ir /etc/nginx/sites-available/hosseini-rtr.ir.backup

# Copy new config
sudo cp nginx/hosseini-rtr.ir.conf /etc/nginx/sites-available/hosseini-rtr.ir

# Test configuration
sudo nginx -t

# If test passes, reload Nginx
sudo systemctl reload nginx
```

### Step 8: Verify deployment

````bash
# Check PM2 status
pm2 status
pm2 logs hosseini-net

```bash
# Check if app is running
curl http://localhost:3313

# Check public site
curl -I https://hosseini-rtr.ir
````

````

### PM2 Commands for Management

```bash
# View logs
pm2 logs hosseini-net

# Restart app
pm2 restart hosseini-net

# Stop app
pm2 stop hosseini-net

# Monitor
pm2 monit

# View status
pm2 status
````

### Future Updates/Deployments

```bash
cd /var/www/hosseini.net

# Pull latest changes
git pull origin main

# Install any new dependencies
npm ci

# Rebuild
npm run build

# Reload app (zero-downtime)
pm2 reload hosseini-net

# Or restart
pm2 restart hosseini-net
```

---

## Option B: Deploy with Docker

### Step 1: Install Docker and Docker Compose

```bash
# Update package index
sudo apt update

# Install Docker
sudo apt install -y docker.io docker-compose

# Start and enable Docker
sudo systemctl start docker
sudo systemctl enable docker

# Add your user to docker group (to run without sudo)
sudo usermod -aG docker $USER
newgrp docker

# Verify installation
docker --version
docker-compose --version
```

### Step 2: Clone repository

```bash
sudo mkdir -p /var/www/hosseini.net
sudo chown $USER:$USER /var/www/hosseini.net

cd /var/www
git clone https://github.com/hosseinirtr/hosseini.net-i18n.git hosseini.net
cd hosseini.net
```

### Step 3: Create environment file

```bash
# Create .env.production for build time
nano .env.production
```

Add your environment variables:

```env
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://hosseini-rtr.ir
# Add other variables as needed
```

### Step 4: Build and run with Docker Compose

```bash
# Build and start
docker-compose up -d --build

# View logs
docker-compose logs -f

# Check status
docker-compose ps
```

### Step 5: Update Nginx (same as PM2 option)

```bash
sudo cp nginx/hosseini-rtr.ir.conf /etc/nginx/sites-available/hosseini-rtr.ir
sudo nginx -t
sudo systemctl reload nginx
```

### Step 6: Verify

```bash
# Check container
docker-compose ps
docker-compose logs

# Check app
curl http://localhost:3313
curl -I https://hosseini-rtr.ir
```

### Docker Management Commands

```bash
# View logs
docker-compose logs -f

# Restart
docker-compose restart

# Stop
docker-compose down

# Rebuild after code changes
docker-compose up -d --build

# View running containers
docker ps
```

### Future Updates with Docker

```bash
cd /var/www/hosseini.net

# Pull latest code
git pull origin main

# Rebuild and restart (zero-downtime with proper setup)
docker-compose up -d --build

# View logs
docker-compose logs -f
```

---

## Important Notes

### 1. Environment Variables & env-cmd

Your `package.json` uses `env-cmd -f .env.production` for the build script. Since `env-cmd` is a devDependency:

- **During build:** Run `npm ci` (installs devDeps) → `npm run build` works fine
- **After build:** You can run `npm prune --production` to remove devDeps (app only needs `npm start` which doesn't use env-cmd)

### 2. Next.js Output Mode

For the Docker setup to work optimally with the standalone output, add this to your `next.config.mjs`:

```javascript
const nextConfig = {
  // ... existing config
  output: "standalone", // Add this for optimized Docker builds
};
```

Without `standalone` mode, the Dockerfile may need adjustments. Current Dockerfile assumes standalone.

### 3. Database (SQLite)

If you're using SQLite (I see database code in your repo):

- **PM2:** Database file will be in `/var/www/hosseini.net/data/` or wherever configured
- **Docker:** Mount a volume in `docker-compose.yml` to persist data:
  ```yaml
  volumes:
    - ./data:/app/data
  ```

### 4. Firewall

Ensure firewall allows HTTP/HTTPS:

```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 22/tcp  # SSH
sudo ufw enable
sudo ufw status
```

### 5. Log Management

**PM2 logs:**

- Location: `/var/log/pm2/` (as configured in ecosystem.config.js)
- Rotate logs: `pm2 install pm2-logrotate`

**Nginx logs:**

- `/var/log/nginx/hosseini-rtr-access.log`
- `/var/log/nginx/hosseini-rtr-error.log`

**Docker logs:**

- `docker-compose logs -f`
- Configure log rotation in docker-compose if needed

---

## Troubleshooting

### App not starting

```bash
# PM2
pm2 logs hosseini-net --lines 100

# Docker
docker-compose logs --tail=100
```

### Port 3313 already in use

```bash
# Find process
sudo lsof -i :3313
# Or
sudo netstat -tlnp | grep 3313

# Kill if needed
sudo kill -9 <PID>
```

### Nginx 502 Bad Gateway

```bash
# Check if app is running
curl http://localhost:3313

# PM2: restart app
pm2 restart hosseini-net

# Docker: restart container
docker-compose restart

# Check Nginx logs
sudo tail -f /var/log/nginx/hosseini-rtr-error.log
```

### SSL Certificate Renewal

Your SSL is already configured with Let's Encrypt. Auto-renewal should work, but to test:

```bash
sudo certbot renew --dry-run
```

---

## Performance Tips

1. **Enable PM2 cluster mode** for multiple instances:

   ```javascript
   // In ecosystem.config.js
   instances: 'max', // or a specific number like 2
   exec_mode: 'cluster',
   ```

2. **Set up Nginx caching** (already configured in provided nginx config)

3. **Monitor with PM2:**
   ```bash
   pm2 install pm2-logrotate
   pm2 set pm2-logrotate:max_size 10M
   ```

---

## Quick Reference

### Which option to choose?

- **Choose PM2** if:

  - You want simple, direct control
  - You're comfortable with Node.js tooling
  - You want easier debugging and log access
  - ✅ Recommended for most cases

- **Choose Docker** if:
  - You want reproducible deployments
  - You plan to use CI/CD
  - You want easy rollback with image tags
  - You're running multiple services

---

## Support

If you encounter issues:

1. Check logs first (PM2 or Docker logs)
2. Verify Nginx config: `sudo nginx -t`
3. Check environment variables are set correctly
4. Ensure Node version is 18+ (20 recommended)

---

**Your domain:** https://hosseini-rtr.ir  
**App port:** 3313 (internal)  
**Public ports:** 80, 443 (Nginx reverse proxy)
