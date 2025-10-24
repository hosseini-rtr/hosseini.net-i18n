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

### Authentication (Built-in)

- `POST /api/auth/login` - Login with admin credentials
- `GET /api/auth/verify` - Verify authentication token
- `POST /api/auth/logout` - Logout and clear session

### Blog Posts (Built-in)

- `GET /api/posts` - List all posts (supports ?locale=en|fa|it parameter)
- `POST /api/posts` - Create a new post
- `PUT /api/posts/{id}` - Update existing post
- `DELETE /api/posts/{id}` - Delete post

### File Management (Built-in)

- `POST /api/upload-image` - Upload images for blog posts
- `POST /api/fetch-link` - Fetch link metadata for embeds

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
