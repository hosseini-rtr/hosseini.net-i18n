# API Authentication Guide

## Overview

The blog CMS uses **JWT (JSON Web Token)** authentication with **httpOnly cookies** for secure session management.

## Authentication Flow

```
1. User/Client POSTs credentials to /api/auth/login
2. Server validates credentials
3. Server creates JWT token (valid 24h)
4. Server sets httpOnly cookie named "auth-token"
5. Client includes cookie in subsequent requests
6. Server validates token for protected endpoints
```

## Endpoints

### Public Endpoints (No Auth Required)

- `GET /api/posts` - List all posts
- `GET /api/posts?locale={locale}` - List posts by locale
- `GET /api/posts/{id}` - Get single post by ID
- `GET /api/posts/slug/{slug}` - Get post by slug
- `GET /api/health` - Health check

### Protected Endpoints (Auth Required)

- `POST /api/posts` - Create new post
- `PUT /api/posts/{id}` - Update post
- `DELETE /api/posts/{id}` - Delete post

## Login API

### Endpoint

```
POST /api/auth/login
```

### Request

```json
{
  "username": "admin",
  "password": "admin123"
}
```

### Response (Success - 200)

```json
{
  "success": true,
  "user": {
    "username": "admin",
    "role": "admin"
  }
}
```

Sets cookie:

- Name: `auth-token`
- Type: httpOnly
- Duration: 24 hours
- SameSite: strict
- Secure: true (in production)

### Response (Error - 401)

```json
{
  "error": "Invalid credentials"
}
```

## Using Authentication

### cURL

```bash
# Step 1: Login and save cookie
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}' \
  -c cookies.txt

# Step 2: Use saved cookie for authenticated requests
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"title":"Test","content":"...","locale":"en"}'

# Update post
curl -X PUT http://localhost:3000/api/posts/1 \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"title":"Updated Title"}'

# Delete post
curl -X DELETE http://localhost:3000/api/posts/1 \
  -b cookies.txt
```

### JavaScript (Browser)

```javascript
// Login
async function login(username, password) {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // IMPORTANT: Send/receive cookies
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return await response.json();
}

// Create post (after login)
async function createPost(postData) {
  const response = await fetch("/api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // IMPORTANT: Send cookies
    body: JSON.stringify(postData),
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Authentication required - please login");
    }
    throw new Error("Failed to create post");
  }

  return await response.json();
}

// Usage
try {
  await login("admin", "admin123");
  const post = await createPost({
    title: "My Post",
    content: JSON.stringify({
      /* Editor.js data */
    }),
    locale: "en",
  });
  console.log("Created:", post);
} catch (error) {
  console.error("Error:", error.message);
}
```

### JavaScript (Node.js)

```javascript
const fetch = require("node-fetch");

// Store cookies manually in Node.js
let authCookie = "";

async function login(username, password) {
  const response = await fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  // Extract cookie from response
  const cookies = response.headers.get("set-cookie");
  if (cookies) {
    authCookie = cookies.split(";")[0]; // Get auth-token cookie
  }

  return await response.json();
}

async function createPost(postData) {
  const response = await fetch("http://localhost:3000/api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: authCookie, // Send saved cookie
    },
    body: JSON.stringify(postData),
  });

  if (!response.ok) {
    throw new Error("Failed to create post");
  }

  return await response.json();
}

// Usage
(async () => {
  await login("admin", "admin123");
  const post = await createPost({
    title: "My Post",
    content: JSON.stringify({
      /* Editor.js data */
    }),
    locale: "en",
  });
  console.log("Created:", post);
})();
```

### Python

```python
import requests

# Session automatically handles cookies
session = requests.Session()

def login(username, password):
    response = session.post(
        'http://localhost:3000/api/auth/login',
        json={'username': username, 'password': password}
    )

    if response.status_code != 200:
        raise Exception('Login failed')

    return response.json()

def create_post(post_data):
    response = session.post(
        'http://localhost:3000/api/posts',
        json=post_data
    )

    if response.status_code == 401:
        raise Exception('Authentication required')

    if response.status_code != 201:
        raise Exception(f'Failed to create post: {response.text}')

    return response.json()

# Usage
login('admin', 'admin123')
post = create_post({
    'title': 'My Post',
    'content': '{"time":...,"blocks":[...]}',
    'locale': 'en'
})
print('Created:', post)
```

## Token Details

### JWT Payload

```json
{
  "username": "admin",
  "role": "admin",
  "iat": 1729890000,
  "exp": 1729976400
}
```

### Token Lifetime

- **Duration**: 24 hours
- **Auto-refresh**: No (must login again after expiration)
- **Storage**: httpOnly cookie (not accessible via JavaScript)

## Security Features

### 1. httpOnly Cookies

- ✅ Protected from XSS attacks
- ✅ Cannot be accessed via JavaScript
- ✅ Automatically sent by browser

### 2. SameSite Policy

- ✅ Prevents CSRF attacks
- ✅ Strict mode in production
- ✅ Cookies only sent to same origin

### 3. Secure Flag

- ✅ HTTPS only in production
- ✅ Prevents man-in-the-middle attacks

### 4. JWT Secret

- ✅ Configurable via environment variable
- ✅ Default for development only
- ⚠️ **Must change in production**

## Environment Variables

```bash
# .env.local or .env.production
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_secure_password
JWT_SECRET=your-super-secret-jwt-key-min-32-characters
NODE_ENV=production
```

## Error Responses

### 401 Unauthorized

```json
{
  "error": "Authentication required"
}
```

**Cause**: No auth token cookie sent
**Solution**: Login first

### 401 Invalid Token

```json
{
  "error": "Invalid or expired token"
}
```

**Cause**: Token expired or invalid
**Solution**: Login again

### 401 Invalid Credentials

```json
{
  "error": "Invalid credentials"
}
```

**Cause**: Wrong username or password
**Solution**: Check credentials

### 500 Server Error

```json
{
  "error": "Authentication failed"
}
```

**Cause**: Server-side error during auth
**Solution**: Check server logs

## Logout

### Endpoint

```
POST /api/auth/logout
```

### Usage

```bash
# cURL
curl -X POST http://localhost:3000/api/auth/logout \
  -b cookies.txt

# JavaScript
await fetch('/api/auth/logout', {
  method: 'POST',
  credentials: 'include'
});
```

### Response

```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

Clears the `auth-token` cookie.

## Verify Authentication

### Endpoint

```
GET /api/auth/verify
```

### Usage

```bash
# cURL
curl http://localhost:3000/api/auth/verify \
  -b cookies.txt

# JavaScript
const response = await fetch('/api/auth/verify', {
  credentials: 'include'
});
const data = await response.json();
console.log('Authenticated:', data.authenticated);
```

### Response (Authenticated)

```json
{
  "authenticated": true,
  "user": {
    "username": "admin",
    "role": "admin"
  }
}
```

### Response (Not Authenticated)

```json
{
  "authenticated": false
}
```

## Best Practices

### 1. Store Credentials Securely

- ❌ Don't hardcode in source code
- ✅ Use environment variables
- ✅ Use secret management services in production

### 2. Handle Token Expiration

```javascript
async function apiCall() {
  try {
    return await fetch("/api/posts", { credentials: "include" });
  } catch (error) {
    if (error.status === 401) {
      // Token expired, login again
      await login(username, password);
      // Retry the request
      return await fetch("/api/posts", { credentials: "include" });
    }
    throw error;
  }
}
```

### 3. Always Use HTTPS in Production

```javascript
// Development
const API_URL = "http://localhost:3000";

// Production
const API_URL = "https://hosseini.net";
```

### 4. Validate Responses

```javascript
if (!response.ok) {
  if (response.status === 401) {
    // Handle authentication error
    redirectToLogin();
  } else {
    // Handle other errors
    throw new Error(`API error: ${response.status}`);
  }
}
```

## Testing Authentication

### Using cURL

```bash
# 1. Login
curl -v -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}' \
  -c cookies.txt

# 2. Check cookie file
cat cookies.txt

# 3. Test authenticated request
curl -v http://localhost:3000/api/posts \
  -b cookies.txt

# 4. Test without cookie (should work for GET)
curl http://localhost:3000/api/posts

# 5. Test POST without cookie (should fail with 401)
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"Test"}'
```

## Summary

| Method | Endpoint         | Auth Required | Cookie Handling       |
| ------ | ---------------- | ------------- | --------------------- |
| GET    | /api/posts       | ❌ No         | N/A                   |
| POST   | /api/posts       | ✅ Yes        | Send `auth-token`     |
| PUT    | /api/posts/{id}  | ✅ Yes        | Send `auth-token`     |
| DELETE | /api/posts/{id}  | ✅ Yes        | Send `auth-token`     |
| POST   | /api/auth/login  | ❌ No         | Receives `auth-token` |
| POST   | /api/auth/logout | ✅ Yes        | Clears `auth-token`   |
| GET    | /api/auth/verify | 🔄 Optional   | Check `auth-token`    |

**Remember**:

- Always include `credentials: 'include'` in browser fetch
- Use `-b cookies.txt` in cURL
- Use `session` or manually handle cookies in Python
- Tokens expire after 24 hours
