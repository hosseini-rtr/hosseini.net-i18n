"use client";
import BlogContent, { ContentBlock } from "./BlogContent";

// Example of structured content blocks
const exampleStructuredContent: ContentBlock[] = [
  {
    type: "heading",
    content: "Getting Started with Next.js",
    metadata: { level: 1 },
  },
  {
    type: "paragraph",
    content:
      "Next.js is a powerful React framework that makes building full-stack web applications simple and efficient.",
  },
  {
    type: "heading",
    content: "Key Features",
    metadata: { level: 2 },
  },
  {
    type: "list",
    content: "",
    metadata: {
      items: [
        "Server-side rendering (SSR)",
        "Static site generation (SSG)",
        "API routes",
        "File-based routing",
        "Built-in CSS and Sass support",
      ],
      ordered: false,
    },
  },
  {
    type: "heading",
    content: "Code Example",
    metadata: { level: 2 },
  },
  {
    type: "code",
    content: `import React from 'react'

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to Next.js!</h1>
      <p>This is a server-side rendered page.</p>
    </div>
  )
}`,
    metadata: { language: "javascript" },
  },
  {
    type: "quote",
    content: "Next.js is the React framework for production.",
  },
  {
    type: "heading",
    content: "Comparison Table",
    metadata: { level: 2 },
  },
  {
    type: "table",
    content: "",
    metadata: {
      data: [
        ["Feature", "Next.js", "Create React App"],
        ["SSR", "✅ Built-in", "❌ Not available"],
        ["SSG", "✅ Built-in", "❌ Not available"],
        ["API Routes", "✅ Built-in", "❌ Not available"],
        ["File Routing", "✅ Built-in", "❌ Manual setup"],
      ],
    },
  },
];

// Example of HTML content
const exampleHtmlContent = `
<h1>Welcome to Our Blog</h1>
<p>This is an example of <strong>HTML content</strong> that will be safely parsed and rendered.</p>
<h2>Features</h2>
<ul>
  <li>Safe HTML parsing</li>
  <li>Modern styling with Tailwind Typography</li>
  <li>Internationalization support</li>
  <li>RTL language support</li>
</ul>
<blockquote>
  This is a blockquote that demonstrates the styling capabilities.
</blockquote>
<pre><code class="language-javascript">console.log('Hello, World!');</code></pre>
<p>You can also include <a href="https://example.com">links</a> and <em>emphasized text</em>.</p>
`;

export default function ContentExample() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* Structured Content Example */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">
          Structured Content Example
        </h2>
        <div className="bg-gray-800/50 rounded-lg p-6">
          <BlogContent content={exampleStructuredContent} />
        </div>
      </section>

      {/* HTML Content Example */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">
          HTML Content Example
        </h2>
        <div className="bg-gray-800/50 rounded-lg p-6">
          <BlogContent content={exampleHtmlContent} />
        </div>
      </section>

      {/* Mixed Content Example */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">
          Mixed Content Example
        </h2>
        <div className="bg-gray-800/50 rounded-lg p-6">
          <BlogContent
            content={exampleStructuredContent.slice(0, 3)}
            className="mb-8"
          />
          <hr className="my-8 border-gray-700" />
          <BlogContent content={exampleHtmlContent} />
        </div>
      </section>
    </div>
  );
}
