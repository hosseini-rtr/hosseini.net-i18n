# Admin System Documentation

## Overview

This project includes a complete admin system for managing blog posts with authentication and a rich text editor.

## Features

### Authentication

- Login page at `/login`
- Cookie-based authentication (handled automatically by browser)
- Protected admin routes
- Automatic authentication verification
- Logout functionality

### Blog Post Management

- Create new blog posts with Editor.js
- Rich text editor with multiple tools:
  - Headers (H1-H6)
  - Lists (ordered/unordered)
  - Checklists
  - Quotes
  - Code blocks
  - Tables
  - Images
  - Links
  - Embeds (YouTube, etc.)
  - Markers and inline code
- Post listing and management
- Delete posts
- Publish/unpublish posts

## API Endpoints

### Authentication

- `POST https://api.datamdynamics.com/api/auth/superuser` - Login
- `GET https://api.datamdynamics.com/api/auth/verify` - Verify authentication
- `POST https://api.datamdynamics.com/api/auth/logout` - Logout

### Blog Posts

- `GET https://api.datamdynamics.com/api/posts` - List posts
- `POST https://api.datamdynamics.com/api/posts` - Create post
- `DELETE https://api.datamdynamics.com/api/posts/{id}` - Delete post

### Editor.js Support

- `POST /api/upload-image` - Upload images
- `POST /api/fetch-link` - Fetch link metadata

## Routes

### Public Routes

- `/login` - Login page

### Protected Admin Routes

- `/admin/posts` - List all posts
- `/admin/create-post` - Create new post

## Components

### AuthGuard

Protects admin routes by checking authentication status and redirecting to login if needed.

### LogoutButton

Provides logout functionality by clearing local storage and redirecting to login.

### Editor.js Integration

Full-featured rich text editor with:

- Multiple block types
- Inline formatting
- Image uploads
- Link embedding
- Table creation
- Code highlighting

## Usage

1. Navigate to `/login`
2. Enter credentials
3. After successful login, you'll be redirected to `/admin/create-post`
4. Use the rich text editor to create content
5. Fill in post details (title, description, tags)
6. Save the post
7. Manage posts from `/admin/posts`

## Security

- All admin routes are protected by authentication
- Cookies are handled automatically by the browser
- Automatic authentication verification on page load
- Automatic logout on session expiration

## Styling

The admin interface uses:

- Tailwind CSS for styling
- Shadcn/ui components
- Responsive design
- Clean, modern interface

## Internationalization

The admin system supports multiple languages through next-intl:

- English (default)
- Persian
- Italian

Translation keys are available in `messages/en.json` under the `Login` and `Admin` namespaces.
