# Blog Content System Documentation

This document explains the improved blog content rendering system that provides safe HTML parsing, modern styling, and internationalization support.

## Overview

The new blog content system replaces `dangerouslySetInnerHTML` with a safe, feature-rich content renderer that supports:

- ✅ Safe HTML parsing with `html-react-parser`
- ✅ Modern styling with Tailwind Typography
- ✅ Internationalization support (English, Farsi, Italian)
- ✅ RTL language support
- ✅ Future-proof structured JSON blocks
- ✅ Custom component rendering for enhanced styling
- ✅ Error handling and fallbacks

## Components

### BlogContent

The main component for rendering blog content safely.

```tsx
import BlogContent from "@/components/BlogContent";

// Basic usage with HTML content
<BlogContent content={post.content} />

// With custom styling
<BlogContent
  content={post.content}
  className="custom-prose-class"
/>

// With fallback content
<BlogContent
  content={post.content}
  fallback={<div>Content not available</div>}
/>
```

### StructuredBlogContent

For rendering structured JSON blocks (future-proof).

```tsx
import { StructuredBlogContent, ContentBlock } from "@/components/BlogContent";

const blocks: ContentBlock[] = [
  {
    type: "heading",
    content: "My Blog Post",
    metadata: { level: 1 },
  },
  {
    type: "paragraph",
    content: "This is a paragraph of text.",
  },
];

<StructuredBlogContent blocks={blocks} />;
```

## Content Types

### HTML Content

The system can render HTML content safely:

```html
<h1>Blog Title</h1>
<p>This is a <strong>paragraph</strong> with <em>emphasis</em>.</p>
<ul>
  <li>List item 1</li>
  <li>List item 2</li>
</ul>
<blockquote>This is a quote.</blockquote>
<pre><code>console.log('Hello World');</code></pre>
```

### Structured Content

For future migration, the system supports structured JSON blocks:

```typescript
interface ContentBlock {
  type: "paragraph" | "heading" | "image" | "code" | "quote" | "list" | "table";
  content: string;
  metadata?: {
    level?: number; // for headings
    language?: string; // for code blocks
    caption?: string; // for images
    items?: string[]; // for lists
    ordered?: boolean; // for lists
    data?: string[][]; // for tables
    [key: string]: any;
  };
}
```

## Styling

### Tailwind Typography

The system uses Tailwind Typography (`prose`) classes with custom dark theme styling:

- **Headings**: White text with proper hierarchy
- **Paragraphs**: Gray text with good line height
- **Code**: Dark background with borders
- **Blockquotes**: Accent-colored left border
- **Links**: Accent color with hover effects
- **Tables**: Dark theme with borders
- **Lists**: Proper spacing and bullets

### RTL Support

For Farsi content, the system automatically:

- Sets `dir="rtl"` on the container
- Applies RTL-specific styling
- Uses the Vazirmatn font
- Adjusts blockquote borders and list padding

### Custom Styling

You can override default styles by passing a `className` prop:

```tsx
<BlogContent
  content={post.content}
  className="prose prose-lg prose-invert custom-prose-overrides"
/>
```

## Internationalization

### Language Detection

The system automatically detects the current locale:

```tsx
const locale = useLocale();
const isFarsi = locale === "fa";
```

### Font Selection

Different fonts are applied based on language:

- **English/Italian**: System fonts
- **Farsi**: Vazirmatn font

### RTL Layout

For RTL languages, the system applies:

- Right-to-left text direction
- RTL-specific spacing and borders
- Proper list and table alignment

## Migration Guide

### From dangerouslySetInnerHTML

**Before:**

```tsx
<div
  className="prose prose-invert"
  dangerouslySetInnerHTML={{ __html: post.content }}
/>
```

**After:**

```tsx
<BlogContent content={post.content} />
```

### To Structured Content

When your backend starts providing structured content:

```tsx
// Current: HTML string
const content = "<h1>Title</h1><p>Content</p>";

// Future: Structured blocks
const content = [
  { type: "heading", content: "Title", metadata: { level: 1 } },
  { type: "paragraph", content: "Content" },
];

// The BlogContent component handles both automatically
<BlogContent content={content} />;
```

## Utility Functions

### Content Parsing

```tsx
import {
  htmlToStructuredBlocks,
  structuredBlocksToHtml,
} from "@/lib/content-parser";

// Convert HTML to structured blocks
const blocks = htmlToStructuredBlocks(htmlContent);

// Convert structured blocks back to HTML
const html = structuredBlocksToHtml(blocks);
```

### Content Type Detection

```tsx
import { renderContent, isStructuredContent } from "@/lib/content-parser";

// Detect content type
const contentInfo = renderContent(content);
if (contentInfo.type === "structured") {
  // Handle structured content
} else {
  // Handle HTML content
}
```

## Error Handling

The system includes comprehensive error handling:

- **HTML Parsing Errors**: Falls back to safe text display
- **Invalid Content**: Shows fallback component
- **Missing Content**: Displays "Content not available" message

```tsx
<BlogContent
  content={post.content}
  fallback={<div className="text-red-400">Error loading content</div>}
/>
```

## Performance Optimizations

- **Memoized Parsing**: Content type detection is memoized
- **Lazy Rendering**: Components are only rendered when needed
- **Optimized Images**: Next.js Image component for better performance

## Examples

### Basic Blog Post

```tsx
export default function BlogPost({ post }) {
  return (
    <article className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
      <BlogContent content={post.content} />
    </article>
  );
}
```

### With Custom Styling

```tsx
<BlogContent
  content={post.content}
  className="prose prose-lg prose-invert max-w-4xl mx-auto"
/>
```

### Mixed Content Types

```tsx
// The component automatically handles both HTML and structured content
const content = isStructured ? structuredBlocks : htmlString;
<BlogContent content={content} />;
```

## Best Practices

1. **Always use BlogContent**: Never use `dangerouslySetInnerHTML`
2. **Provide fallbacks**: Include meaningful fallback content
3. **Test RTL**: Verify content looks good in Farsi
4. **Optimize images**: Use proper image dimensions and alt text
5. **Validate content**: Ensure HTML content is properly sanitized on the backend

## Troubleshooting

### Content Not Rendering

- Check if content is a valid string or array
- Verify HTML syntax is correct
- Check browser console for parsing errors

### Styling Issues

- Ensure Tailwind Typography is installed
- Check if custom CSS conflicts with prose classes
- Verify RTL styling for Farsi content

### Performance Issues

- Use memoization for large content
- Consider code splitting for heavy components
- Optimize images and external resources

## Future Enhancements

- [ ] Syntax highlighting for code blocks
- [ ] Interactive elements (embeds, videos)
- [ ] Advanced table styling
- [ ] Custom block types
- [ ] Content versioning
- [ ] A/B testing support
