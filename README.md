# Next.js Internationalized Static Website

A modern, fully static internationalized website built with Next.js App Router, featuring multiple languages and static exports. This project combines the power of Next.js 14 with internationalization support through `next-intl`.

## ✨ Features

- 🌐 Full internationalization support with `next-intl` (English, Persian/Farsi, Italian)
- 🎨 Modern UI with Tailwind CSS and Radix UI components
- 🔄 Smooth animations with Framer Motion
- 📱 Responsive design with mobile-first approach
- 🎯 SEO optimized with automatic sitemap generation
- 🚀 RTL language support for Persian
- ⚡ Performance optimized with Next.js
- 📝 Blog content system with safe HTML rendering
- � Smooth page transitions with optimized animations

## 🛠️ Tech Stack

- **Framework:** Next.js 14
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI
- **Animations:** Framer Motion
- **Icons:** React Icons
- **Internationalization:** next-intl
- **Type Safety:** TypeScript
- **Content Parsing:** html-react-parser
- **Typography:** @tailwindcss/typography

## 📁 Project Structure

```text
app/
 ├── [locale]/           # Locale-specific pages
 │   ├── page.tsx       # Main page for each locale
 │   ├── blog/          # Blog pages
 │   │   ├── page.tsx   # Blog listing
 │   │   └── [id]/      # Individual blog posts
 │   │       └── page.tsx
 │   └── sub/           # Subpages
 │       └── page.tsx
 ├── components/        # Reusable UI components
 │   ├── BlogContent.tsx    # Safe HTML content renderer
 │   └── ContentExample.tsx # Example usage
 ├── lib/              # Utility functions and configurations
 │   └── content-parser.ts  # Content parsing utilities
 ├── messages/         # Translation files
 │   ├── en.json
 │   ├── de.json
 │   └── ja.json
 └── public/           # Static assets
```

## 🚀 Getting Started

1. **Clone the repository**

```bash
git clone <repository-url>
cd hosseini.net-i18n
```

2. **Install dependencies**

```bash
npm install
```

3. **Start development server**

```bash
npm run dev
```

4. **Access the application**

- **Website:** [http://localhost:3000](http://localhost:3000)

## 🔨 Build and Deployment

### Development Build

```bash
npm run build:dev
```

### Production Build

```bash
npm run build
```

The static output will be generated in the `out` directory with the following structure:

```text
out/
  ├── en/              # English pages
  │   ├── index.html
  │   └── sub/
  │       └── index.html
  ├── de/              # German pages
  ├── ja/              # Japanese pages
  ├── en.html          # Language selection pages
  ├── de.html
  └── ja.html
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build:dev` - Create development build
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run postbuild` - Generate sitemap

## 🌐 Supported Languages

- English (en)
- Persian/Farsi (fa) - with RTL support
- Italian (it)

Add more languages by:

1. Creating a new translation file in `messages/[locale].json`
2. Adding the locale to the configuration in `i18n.ts`

## Blog Content System

The project includes a sophisticated blog content rendering system that replaces `dangerouslySetInnerHTML` with safe, feature-rich content rendering.

### Key Features

- **Safe HTML Parsing**: Uses `html-react-parser` for secure HTML rendering
- **Modern Typography**: Tailwind Typography (prose) with custom dark theme styling
- **Internationalization**: Automatic RTL support for Farsi content
- **Future-Proof**: Supports both HTML and structured JSON content blocks
- **Custom Components**: Enhanced styling for images, code blocks, tables, and more

### Usage

```tsx
import BlogContent from "@/components/BlogContent";

// Basic usage
<BlogContent content={post.content} />

// With custom styling
<BlogContent
  content={post.content}
  className="prose prose-lg prose-invert"
/>

// With fallback
<BlogContent
  content={post.content}
  fallback={<div>Content not available</div>}
/>
```

### Migration from dangerouslySetInnerHTML

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

For detailed documentation, see [Blog Content System Documentation](docs/BLOG_CONTENT_SYSTEM.md).

## 🔍 SEO

The project includes automatic sitemap generation using `next-sitemap`. The configuration can be found in `next-sitemap.config.js`.

## ⚠️ Troubleshooting

### Missing Favicon Error

If you encounter the following error during development:

```
Error: Page "/[locale]/page" is missing param "/favicon.ico" in "generateStaticParams()", which is required with "output: export" config.
```

**Solution:** Place a `favicon.ico` file in the `public/` directory.

### Blog Content Issues

- **Content not rendering**: Check if content is a valid string or array
- **Styling issues**: Ensure Tailwind Typography is properly configured
- **RTL problems**: Verify Farsi content has proper RTL styling

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/docs/primitives/overview/introduction)
- [html-react-parser Documentation](https://github.com/remarkablemark/html-react-parser)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
