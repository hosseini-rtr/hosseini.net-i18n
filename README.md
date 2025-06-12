# Next.js Internationalized Static Website

A modern, fully static internationalized website built with Next.js App Router, featuring multiple languages and static exports. This project combines the power of Next.js 14 with internationalization support through `next-intl`.

## ✨ Features

- 🌐 Full internationalization support with `next-intl`
- 📑 Static site generation with `output: "export"`
- 🎨 Modern UI with Tailwind CSS and Radix UI components
- 🔄 Smooth animations with Framer Motion
- 📱 Responsive design with mobile-first approach
- 🎯 SEO optimized with automatic sitemap generation
- 🚀 RTL language support
- ⚡ Performance optimized with Next.js best practices

## 🛠️ Tech Stack

- **Framework:** Next.js 14
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI
- **Animations:** Framer Motion
- **Icons:** React Icons
- **Internationalization:** next-intl
- **Type Safety:** TypeScript

## 📁 Project Structure

```text
app/
 ├── [locale]/           # Locale-specific pages
 │   ├── page.tsx       # Main page for each locale
 │   └── sub/           # Subpages
 │       └── page.tsx
 ├── components/        # Reusable UI components
 ├── lib/              # Utility functions and configurations
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
cd <project-directory>
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create `.env.development` and `.env.production` files based on your needs.

4. **Start development server**

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application.

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
- German (de)
- Japanese (ja)

Add more languages by:

1. Creating a new translation file in `messages/`
2. Adding the locale to the configuration in `i18n.ts`

## 🔍 SEO

The project includes automatic sitemap generation using `next-sitemap`. The configuration can be found in `next-sitemap.config.js`.

## ⚠️ Troubleshooting

### Missing Favicon Error

If you encounter the following error during development:

```
Error: Page "/[locale]/page" is missing param "/favicon.ico" in "generateStaticParams()", which is required with "output: export" config.
```

**Solution:** Place a `favicon.ico` file in the `public/` directory.

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/docs/primitives/overview/introduction)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
