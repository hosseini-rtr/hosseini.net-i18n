# Environment Configuration

This directory contains environment-specific configuration files.

## Files Overview

- **`development`** - Development environment variables (use with `npm run build:dev`)
- **`production`** - Production environment variables (use with `npm run build`)
- **`local`** - Local secrets and credentials (⚠️ NOT committed to git)

## How to Use

### Local Development

1. Copy the appropriate environment files to project root when needed
2. Or use the build scripts that reference these files:

```bash
# Development build
npm run build:dev    # Uses .env/development

# Production build
npm run build        # Uses .env/production
```

### Setting Up Locally

1. Copy the contents of `.env/local` to your local `.env.local` in project root:

   ```bash
   cp .env/local ../.env.local
   ```

2. Update values in `../.env.local` with your local credentials

### Production Deployment

1. SSH into your production server
2. Create/update environment files in production server
3. Use the appropriate build script

## Security Guidelines

- 🔒 Never commit `.env.local` or `.env.*.local` files
- 🔒 Keep JWT_SECRET secret and rotate regularly
- 🔒 Use strong, unique credentials
- 🔒 For production, use environment management tools like GitHub Secrets or cloud provider vaults
