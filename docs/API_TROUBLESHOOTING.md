# Common API Errors and Solutions

## Error: Content Shows as `[object Object]`

### Problem

When you create a post and the content displays as `[object Object]` on the blog page.

### Cause

You sent the `content` field as a **nested JavaScript object** instead of a **stringified JSON string**.

### Incorrect Request:

```json
{
  "title": "My Post",
  "content": {
    "time": 1729890000000,
    "blocks": [...]
  }
}
```

### Correct Request:

```json
{
  "title": "My Post",
  "content": "{\"time\":1729890000000,\"blocks\":[...]}"
}
```

### Solution in Different Languages:

**JavaScript:**

```javascript
const editorData = {
  time: Date.now(),
  blocks: [...]
};

// ✅ Correct - stringify the content
const postData = {
  title: "My Post",
  content: JSON.stringify(editorData),  // ← Use JSON.stringify()
  locale: "en"
};
```

**Python:**

```python
import json

editor_data = {
    "time": 1729890000000,
    "blocks": [...]
}

# ✅ Correct - stringify the content
post_data = {
    "title": "My Post",
    "content": json.dumps(editor_data),  # ← Use json.dumps()
    "locale": "en"
}
```

**cURL:**

```bash
# ✅ Correct - use escaped quotes for the content field
curl -X POST https://yourdomain.com/api/posts \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "title": "My Post",
    "content": "{\"time\":1729890000000,\"blocks\":[...]}",
    "locale": "en"
  }'
```

---

## Error: 301 Moved Permanently

### Problem

```html
<html>
  <head>
    <title>301 Moved Permanently</title>
  </head>
  <body>
    <center><h1>301 Moved Permanently</h1></center>
  </body>
</html>
```

### Cause

Your server is configured to redirect HTTP to HTTPS.

### Solution

Use `https://` instead of `http://`:

```bash
# ❌ Wrong
curl -X POST http://hosseini-rtr.ir/api/auth/login ...

# ✅ Correct
curl -X POST https://hosseini-rtr.ir/api/auth/login ...
```

---

## Error: Nested `metadata` and `content` Objects

### Problem

You're using the LLM output format with nested `metadata` and `content` objects.

### Incorrect Format:

```json
{
  "metadata": {
    "title": "My Post",
    "slug": "my-post",
    "tags": ["tag1"],
    "locale": "en"
  },
  "content": {
    "time": 1729890000000,
    "blocks": [...]
  }
}
```

### Correct Format:

The API expects a **flat structure**:

```json
{
  "title": "My Post",
  "slug": "my-post",
  "tags": ["tag1"],
  "locale": "en",
  "content": "{\"time\":1729890000000,\"blocks\":[...]}"
}
```

### Solution

Flatten the structure and stringify the content:

**JavaScript:**

```javascript
// ❌ LLM output format
const llmOutput = {
  metadata: {
    title: "...",
    slug: "...",
    tags: [...],
    locale: "en"
  },
  content: {
    time: 123,
    blocks: [...]
  }
};

// ✅ Convert to API format
const apiFormat = {
  ...llmOutput.metadata,
  content: JSON.stringify(llmOutput.content)
};

// Now send apiFormat to the API
fetch('/api/posts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
  body: JSON.stringify(apiFormat)
});
```

**Python:**

```python
import json

# ❌ LLM output format
llm_output = {
    "metadata": {
        "title": "...",
        "slug": "...",
        "tags": [...],
        "locale": "en"
    },
    "content": {
        "time": 123,
        "blocks": [...]
    }
}

# ✅ Convert to API format
api_format = {
    **llm_output["metadata"],
    "content": json.dumps(llm_output["content"])
}

# Now send api_format to the API
requests.post('/api/posts', json=api_format, cookies=cookies)
```

---

## Error: 401 Unauthorized

### Problem

```json
{
  "error": "Authentication required"
}
```

### Cause

You didn't login or the auth cookie is not being sent.

### Solution

**1. Login First:**

```bash
curl -X POST https://yourdomain.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}' \
  -c cookies.txt
```

**2. Send Cookie with Requests:**

**cURL:**

```bash
curl -X POST https://yourdomain.com/api/posts \
  -b cookies.txt \  # ← Include this!
  -H "Content-Type: application/json" \
  -d '{...}'
```

**JavaScript (Browser):**

```javascript
fetch("/api/posts", {
  method: "POST",
  credentials: "include", // ← Include this!
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(postData),
});
```

**Python:**

```python
# Login first
response = requests.post('/api/auth/login', json=credentials)
cookies = response.cookies

# Use cookies in subsequent requests
requests.post('/api/posts', json=post_data, cookies=cookies)
```

---

## Error: Invalid or Expired Token

### Problem

```json
{
  "error": "Invalid or expired token"
}
```

### Cause

Your JWT token has expired (tokens expire after 24 hours).

### Solution

Login again to get a fresh token:

```bash
# Login again
curl -X POST https://yourdomain.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}' \
  -c cookies.txt
```

---

## Error: Tags/Locale/Image Are Empty

### Problem

The created post has empty fields for `tags`, `og_description`, `image`, etc.

### Cause

The API defaults missing fields to empty values.

### Solution

Ensure you include ALL required fields:

```json
{
  "title": "Required",
  "content": "Required (stringified JSON)",
  "og_description": "Required for SEO",
  "tags": ["required", "array"],
  "slug": "required-url-slug",
  "locale": "en", // Required: en, fa, or it
  "image": "/assets/user.jpg", // Required
  "author": "Admin" // Required
}
```

---

## Error: Persian/Farsi Text Shows as `<200c>`

### Problem

Your Farsi text contains `<200c>` characters (Zero-Width Non-Joiner).

### Cause

These are invisible Unicode characters used in Persian typography.

### Solution

This is actually **correct**! The `<200c>` (ZWNJ - Zero-Width Non-Joiner) is used in Persian text to:

- Prevent unwanted ligatures
- Properly display compound words

Example: `پایگاه‌داده` (correct) vs `پایگاهداده` (incorrect)

The API will handle these correctly. When rendered, they won't be visible but will ensure proper text display.

---

## Complete Working Example

```bash
#!/bin/bash

# Step 1: Login
curl -X POST https://hosseini-rtr.ir/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "your-username",
    "password": "your-password"
  }' \
  -c cookies.txt

# Step 2: Create post with ALL fields and STRINGIFIED content
curl -X POST https://hosseini-rtr.ir/api/posts \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "title": "تست پست فارسی",
    "content": "{\"time\":1729890000000,\"blocks\":[{\"id\":\"abc123\",\"type\":\"header\",\"data\":{\"text\":\"عنوان پست\",\"level\":1}},{\"id\":\"def456\",\"type\":\"paragraph\",\"data\":{\"text\":\"این یک پاراگراف تست است.\"}}],\"version\":\"2.29.0\"}",
    "og_description": "توضیحات متا برای سئو",
    "tags": ["تست", "فارسی", "وبلاگ"],
    "slug": "test-farsi-post",
    "locale": "fa",
    "image": "/assets/user.jpg",
    "author": "حسین حسینی"
  }'

# Step 3: Verify
curl https://hosseini-rtr.ir/api/posts?locale=fa | jq
```

---

## Quick Checklist

Before sending a POST request, verify:

- [ ] Logged in and have cookies.txt
- [ ] Using HTTPS (not HTTP) for production
- [ ] Content field is STRINGIFIED JSON (escaped quotes)
- [ ] Structure is FLAT (no nested metadata/content objects)
- [ ] All required fields are included:
  - [ ] title
  - [ ] content (stringified)
  - [ ] og_description
  - [ ] tags (array)
  - [ ] slug
  - [ ] locale (en/fa/it)
  - [ ] image
  - [ ] author
- [ ] Using `-b cookies.txt` (cURL) or `credentials: 'include'` (JS)

---

## Testing Your Request

Use `jq` to validate JSON before sending:

```bash
# Save your request to a file
cat > post.json << 'EOF'
{
  "title": "Test",
  "content": "{\"time\":123,\"blocks\":[...]}",
  "locale": "en",
  ...
}
EOF

# Validate JSON
cat post.json | jq

# If valid, send it
curl -X POST https://yourdomain.com/api/posts \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d @post.json
```
