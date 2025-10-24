"use client";
import BlogContent from "./BlogContent";

// Simple example component
export default function ContentExample() {
  const exampleHTMLContent = `
    <h2>Welcome to the Blog</h2>
    <p>This is an example of HTML content rendering.</p>
  `;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <BlogContent content={exampleHTMLContent} />
    </div>
  );
}
