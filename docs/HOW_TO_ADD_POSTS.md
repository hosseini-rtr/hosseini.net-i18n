# How to Add Blog Posts to the System

This guide shows you all the methods to add blog posts to your CMS.

## Table of Contents

1. [Authentication](#authentication)
2. [Using the Admin UI (Recommended)](#method-1-using-the-admin-ui-recommended)
3. [Using the API Directly](#method-2-using-the-api-directly)
4. [Editing posts.json Manually](#method-3-editing-postsjson-manually)
5. [Using a Script](#method-4-using-a-script-bulk-import)

---

## Authentication

### Required for:

- ✅ Creating posts (POST)
- ✅ Updating posts (PUT)
- ✅ Deleting posts (DELETE)
- ❌ Reading posts (GET) - No auth required

### How Authentication Works:

1. **Login** at `/api/auth/login` with credentials
2. Server returns a **JWT token** stored in an **httpOnly cookie** named `auth-token`
3. Cookie is automatically sent with subsequent requests
4. Token is valid for **24 hours**

### Default Credentials:

```
Username: admin
Password: admin123
```

⚠️ **Change these in production** via environment variables:

```bash
ADMIN_USERNAME=your_username
ADMIN_PASSWORD=your_secure_password
JWT_SECRET=your-super-secret-jwt-key
```

### Login Example:

**cURL:**

```bash
# Development (HTTP)
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}' \
  -c cookies.txt  # Save cookie to file

# Production (HTTPS) - Always use HTTPS in production
curl -X POST https://yourdomain.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}' \
  -c cookies.txt
```

**Note**: If you get a `301 Moved Permanently` error, your server is redirecting HTTP to HTTPS. Use `https://` instead of `http://`.

**JavaScript:**

```javascript
const response = await fetch("http://localhost:3000/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  credentials: "include", // Important!
  body: JSON.stringify({ username: "admin", password: "admin123" }),
});
```

**Python:**

```python
response = requests.post(
    'http://localhost:3000/api/auth/login',
    json={'username': 'admin', 'password': 'admin123'}
)
cookies = response.cookies  # Save for later use
```

---

## Method 1: Using the Admin UI (Recommended)

### Steps:

1. Navigate to: `http://localhost:3000/en/login` (or your domain)
2. Login with admin credentials
3. Go to: `http://localhost:3000/en/admin/create-post`
4. Fill in the form:
   - **Title**: Your post title
   - **Meta Description**: SEO description (120-160 characters)
   - **URL Slug**: URL-friendly identifier
   - **Tags**: Comma-separated (e.g., "web, nextjs, tutorial")
   - **Image**: Path to image (e.g., "/assets/user.jpg")
   - **Locale**: Select from dropdown (en/fa/it)
5. Use the **Editor.js** rich text editor to create content
6. Click **Save** to create the post

### Pros:

✅ User-friendly interface
✅ Rich text editing with live preview
✅ Automatic slug generation
✅ No technical knowledge required

### Cons:

❌ One post at a time
❌ Requires UI access

---

## Method 2: Using the API Directly

⚠️ **Authentication Required**: Write operations (POST, PUT, DELETE) require authentication. You need to:

1. Login first to get the auth token
2. Include the token in subsequent requests

### Step 1: Login to Get Auth Token

```bash
# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin123"
  }' \
  -c cookies.txt

# This saves the auth-token cookie to cookies.txt
```

### Step 2: Create Post with Authentication

```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "title": "My New Blog Post",
    "content": "{\"time\":1729890000000,\"blocks\":[{\"id\":\"abc123\",\"type\":\"header\",\"data\":{\"text\":\"Hello World\",\"level\":1}},{\"id\":\"def456\",\"type\":\"paragraph\",\"data\":{\"text\":\"This is my first post.\"}}],\"version\":\"2.29.0\"}",
    "og_description": "This is a test post",
    "tags": ["test", "api"],
    "slug": "my-new-post",
    "locale": "en",
    "image": "/assets/user.jpg",
    "author": "Admin"
  }'
```

**IMPORTANT Notes**:

- `-b cookies.txt` sends the auth cookie with the request
- The `content` field MUST be a **stringified JSON** (notice the escaped quotes)
- Use `https://` for production servers (not `http://`)
- The structure is **flat** - no nested `metadata` or `content` objects

### Using JavaScript/TypeScript

```javascript
// Step 1: Login to get auth token
const login = async () => {
  const response = await fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Important: Include cookies
    body: JSON.stringify({
      username: "admin",
      password: "admin123",
    }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return await response.json();
};

// Step 2: Create post (cookie is sent automatically)
const createPost = async () => {
  // Login first
  await login();

  // Now create the post
  const postData = {
    title: "My New Blog Post",
    content: JSON.stringify({
      time: Date.now(),
      blocks: [
        {
          id: "abc123",
          type: "header",
          data: {
            text: "Hello World",
            level: 1,
          },
        },
        {
          id: "def456",
          type: "paragraph",
          data: {
            text: "This is my first post.",
          },
        },
      ],
      version: "2.29.0",
    }),
    og_description: "This is a test post",
    tags: ["test", "api"],
    slug: "my-new-post",
    locale: "en",
    image: "/assets/user.jpg",
    author: "Admin",
  };

  const response = await fetch("http://localhost:3000/api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Important: Send cookies
    body: JSON.stringify(postData),
  });

  if (!response.ok) {
    throw new Error("Failed to create post");
  }

  const result = await response.json();
  console.log("Created post:", result);
  return result;
};

createPost();
```

### Using Python

```python
import requests
import json

# Step 1: Login to get auth token
def login():
    response = requests.post(
        'http://localhost:3000/api/auth/login',
        json={
            'username': 'admin',
            'password': 'admin123'
        }
    )

    if response.status_code != 200:
        raise Exception('Login failed')

    return response.cookies

# Step 2: Create post with auth cookie
def create_post():
    # Login first
    cookies = login()

    post_data = {
        "title": "My New Blog Post",
        "content": json.dumps({
            "time": 1729890000000,
            "blocks": [
                {
                    "id": "abc123",
                    "type": "header",
                    "data": {
                        "text": "Hello World",
                        "level": 1
                    }
                },
                {
                    "id": "def456",
                    "type": "paragraph",
                    "data": {
                        "text": "This is my first post."
                    }
                }
            ],
            "version": "2.29.0"
        }),
        "og_description": "This is a test post",
        "tags": ["test", "api"],
        "slug": "my-new-post",
        "locale": "en",
        "image": "/assets/user.jpg",
        "author": "Admin"
    }

    response = requests.post(
        'http://localhost:3000/api/posts',
        json=post_data,
        cookies=cookies  # Send auth cookie
    )

    if response.status_code != 201:
        raise Exception(f'Failed to create post: {response.text}')

    print('Created post:', response.json())
    return response.json()

create_post()
```

### API Response:

```json
{
  "id": 5,
  "title": "My New Blog Post",
  "content": "{...}",
  "slug": "my-new-post",
  "author": "Admin",
  "tags": ["test", "api"],
  "locale": "en",
  "og_description": "This is a test post",
  "image": "/assets/user.jpg",
  "created_at": "2025-10-25T12:00:00.000Z",
  "update_at": "2025-10-25T12:00:00.000Z"
}
```

### Pros:

✅ Programmatic control
✅ Can be automated
✅ Good for integrations
✅ Bulk operations possible

### Cons:

❌ Requires technical knowledge
❌ Manual JSON formatting

---

## Method 3: Editing posts.json Manually

### Location:

```
/data/posts.json
```

### Steps:

1. **Open the file**:

   ```bash
   nano data/posts.json
   # or use any text editor
   code data/posts.json
   ```

2. **Add your post to the array**:

   ```json
   [
     {
       "id": 1,
       "title": "Existing Post",
       "content": "...",
       ...
     },
     {
       "id": 5,
       "title": "My New Post",
       "content": "{\"time\":1729890000000,\"blocks\":[{\"id\":\"abc123\",\"type\":\"header\",\"data\":{\"text\":\"New Post\",\"level\":1}}],\"version\":\"2.29.0\"}",
       "slug": "my-new-post",
       "author": "Admin",
       "tags": ["manual", "edit"],
       "locale": "en",
       "og_description": "Manually added post",
       "image": "/assets/user.jpg",
       "created_at": "2025-10-25T12:00:00.000Z",
       "update_at": "2025-10-25T12:00:00.000Z"
     }
   ]
   ```

3. **Important Notes**:

   - Use unique sequential ID
   - Content must be **stringified JSON** (Editor.js format)
   - Ensure valid JSON syntax (no trailing commas)
   - Use ISO 8601 format for dates
   - Restart the dev server to see changes

4. **Validate JSON**:
   ```bash
   # Check if JSON is valid
   cat data/posts.json | jq
   ```

### Pros:

✅ Direct control
✅ Good for quick edits
✅ No server needed

### Cons:

❌ Manual ID management
❌ Risk of JSON syntax errors
❌ No validation
❌ Must restart server

---

## Method 4: Using a Script (Bulk Import)

Create a script to import multiple posts at once.

### Create: `scripts/import-posts.js`

```javascript
const fs = require("fs");
const path = require("path");

const POSTS_FILE = path.join(__dirname, "..", "data", "posts.json");

// Read existing posts
const readPosts = () => {
  if (fs.existsSync(POSTS_FILE)) {
    const data = fs.readFileSync(POSTS_FILE, "utf8");
    return JSON.parse(data);
  }
  return [];
};

// Write posts
const writePosts = (posts) => {
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2));
};

// New posts to import
const newPosts = [
  {
    title: "Understanding React Hooks",
    content: JSON.stringify({
      time: Date.now(),
      blocks: [
        {
          id: "hook1",
          type: "header",
          data: { text: "Understanding React Hooks", level: 1 },
        },
        {
          id: "hook2",
          type: "paragraph",
          data: {
            text: "React Hooks revolutionized how we write components...",
          },
        },
      ],
      version: "2.29.0",
    }),
    slug: "understanding-react-hooks",
    author: "Admin",
    tags: ["react", "hooks", "javascript"],
    locale: "en",
    og_description: "Learn about React Hooks and how to use them effectively",
    image: "/assets/user.jpg",
  },
  {
    title: "آموزش React Hooks",
    content: JSON.stringify({
      time: Date.now(),
      blocks: [
        {
          id: "fa1",
          type: "header",
          data: { text: "آموزش React Hooks", level: 1 },
        },
        {
          id: "fa2",
          type: "paragraph",
          data: { text: "React Hooks نحوه نوشتن کامپوننت‌ها را متحول کرد..." },
        },
      ],
      version: "2.29.0",
    }),
    slug: "react-hooks-fa",
    author: "حسین حسینی",
    tags: ["react", "hooks", "آموزش"],
    locale: "fa",
    og_description: "آموزش React Hooks و نحوه استفاده موثر از آنها",
    image: "/assets/user2.jpg",
  },
];

// Import function
const importPosts = () => {
  const existingPosts = readPosts();
  const maxId =
    existingPosts.length > 0 ? Math.max(...existingPosts.map((p) => p.id)) : 0;

  const postsToAdd = newPosts.map((post, index) => ({
    id: maxId + index + 1,
    ...post,
    created_at: new Date().toISOString(),
    update_at: new Date().toISOString(),
  }));

  const allPosts = [...existingPosts, ...postsToAdd];
  writePosts(allPosts);

  console.log(`✅ Successfully imported ${postsToAdd.length} posts`);
  console.log(`📊 Total posts: ${allPosts.length}`);
};

// Run import
importPosts();
```

### Run the script:

```bash
node scripts/import-posts.js
```

### Pros:

✅ Bulk import capability
✅ Automated ID assignment
✅ Reusable
✅ Good for migrations

### Cons:

❌ Requires Node.js
❌ Need to write script

---

## Method 5: Using LLM-Generated Content

Based on the prompt in `docs/LLM_BLOG_POST_GENERATION_PROMPT.md`:

### Steps:

1. **Generate content with LLM** (ChatGPT, Claude, etc.):

   ```
   Using the prompt from LLM_BLOG_POST_GENERATION_PROMPT.md,
   generate a blog post about "Next.js Performance Optimization"
   in English, medium length (800-1500 words)
   ```

2. **LLM will provide**:

   - Metadata (title, description, slug, tags, etc.)
   - Editor.js formatted content

3. **Use any method above** to add the generated content:
   - Copy into Admin UI editor
   - POST via API
   - Add to posts.json
   - Use import script

---

## Content Format Reference

### Required Fields:

```typescript
{
  title: string;           // 50-100 characters
  content: string;         // Stringified Editor.js JSON
  og_description: string;  // 120-160 characters
  tags: string[];          // Array of tags
  slug: string;            // URL-friendly
  locale: "en" | "fa" | "it";
  image: string;           // Path to image
  author: string;          // Author name
}
```

### Auto-Generated Fields:

- `id` - Auto-incremented
- `created_at` - ISO 8601 timestamp
- `update_at` - ISO 8601 timestamp

### Editor.js Content Structure:

```json
{
  "time": 1729890000000,
  "blocks": [
    {
      "id": "unique-id",
      "type": "header|paragraph|list|code|image|...",
      "data": {
        /* block-specific data */
      }
    }
  ],
  "version": "2.29.0"
}
```

---

## Best Practices

### 1. **Content**:

- Always stringify Editor.js JSON for the `content` field
- Use unique block IDs
- Follow the Editor.js block structure

### 2. **Slugs**:

- Use lowercase
- Replace spaces with hyphens
- Remove special characters
- Keep it short (3-6 words)

### 3. **SEO**:

- Title: 50-100 characters
- Description: 120-160 characters
- Use relevant tags (3-5 recommended)

### 4. **Images**:

- Use paths relative to public directory
- Common paths: `/assets/`, `/assets/work/`, `/assets/groups/`
- Recommended size: 1200x630px

### 5. **Localization**:

- Set correct locale (en/fa/it)
- Use appropriate language in content
- For Farsi: Use proper Persian characters and RTL formatting

---

## Troubleshooting

### Post not appearing?

- Check if JSON is valid
- Verify locale matches your URL
- Restart development server
- Check browser console for errors

### API errors?

- Ensure server is running
- Check network tab in dev tools
- Verify JSON format in request body
- Check server logs

### Authentication errors?

- **401 Unauthorized**: Login first or token expired
- **Invalid credentials**: Check username/password
- **Token expired**: Login again (tokens expire after 24h)
- **Cookie not sent**: Use `credentials: 'include'` (JS) or `-b cookies.txt` (cURL)

### Editor.js content not rendering?

- Ensure content is stringified JSON
- Verify Editor.js block structure
- Check for unique block IDs
- Validate JSON syntax

---

## Quick Reference Commands

```bash
# Start dev server
npm run dev

# Login and save cookie
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}' \
  -c cookies.txt

# Check JSON validity
cat data/posts.json | jq

# Backup posts
cp data/posts.json data/posts.json.backup

# API health check
curl http://localhost:3000/api/health

# Get all posts (no auth required)
curl http://localhost:3000/api/posts

# Get posts by locale (no auth required)
curl http://localhost:3000/api/posts?locale=en

# Create post (auth required)
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d @new-post.json

# Update post (auth required)
curl -X PUT http://localhost:3000/api/posts/1 \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d @updated-post.json

# Delete post (auth required)
curl -X DELETE http://localhost:3000/api/posts/1 \
  -b cookies.txt
```

---

## Example: Complete Workflow

### 1. Generate with LLM

Ask ChatGPT/Claude to generate a post using the LLM prompt

### 2. Save to file

```bash
# Save LLM output to file
cat > new-post.json << 'EOF'
{
  "title": "Advanced TypeScript Patterns",
  "content": "{\"time\":1729890000000,\"blocks\":[...]}",
  "og_description": "Learn advanced TypeScript design patterns",
  "tags": ["typescript", "patterns", "advanced"],
  "slug": "advanced-typescript-patterns",
  "locale": "en",
  "image": "/assets/user.jpg",
  "author": "Admin"
}
EOF
```

### 3. Login to get auth cookie

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}' \
  -c cookies.txt
```

### 4. Post via API with authentication

```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d @new-post.json
```

### 5. Verify

```bash
# Check if post was created
curl http://localhost:3000/api/posts | jq '.[] | select(.slug=="advanced-typescript-patterns")'
```

---

## Recommended Workflow

**For single posts**: Use Admin UI
**For multiple posts**: Use bulk import script
**For automation**: Use API directly
**For migration**: Edit posts.json with backup

Choose the method that best fits your use case!
