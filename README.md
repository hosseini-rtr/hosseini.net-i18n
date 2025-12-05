# Hosseini.net - Internationalized Next.js Website

A modern, high-performance internationalized website built with **Next.js 14** and **App Router**, featuring multiple languages, static export capability, and a comprehensive blog system.

---

## ✨ Key Features

- 🌐 **Multi-language support** - English, Farsi (Persian), and Italian with `next-intl`
- 🎨 **Modern UI** - Built with Tailwind CSS and Radix UI components
- 🎭 **Smooth animations** - Framer Motion for polished page transitions
- 📱 **Fully responsive** - Mobile-first design approach
- 🔐 **Authentication** - User login system with JWT tokens
- 📝 **Blog system** - Rich content with EditorJS support
- 🗺️ **Auto sitemap** - SEO-optimized sitemap generation
- 🌍 **RTL support** - Right-to-left layout for Persian
- ⚡ **Performance** - Static export ready with optimizations
- � **Type safe** - Full TypeScript support

---

## 🛠️ Tech Stack

| Category        | Technologies                    |
| --------------- | ------------------------------- |
| **Framework**   | Next.js 14 with App Router      |
| **Styling**     | Tailwind CSS + Radix UI         |
| **Animation**   | Framer Motion                   |
| **i18n**        | next-intl                       |
| **Language**    | TypeScript                      |
| **Content**     | EditorJS with html-react-parser |
| **Icons**       | React Icons, Lucide React       |
| **Database**    | SQLite (better-sqlite3)         |
| **Auth**        | JWT (jose), bcrypt              |
| **Testing**     | Jest + React Testing Library    |
| **HTTP Client** | Axios                           |

---

## 📁 Project Structure

```
hosseini.net-i18n/
├── app/                          # Next.js App Router
│   ├── [locale]/                # Localized routes (en, fa, it)
│   │   ├── page.tsx             # Main homepage
│   │   ├── layout.tsx           # Locale layout
│   │   ├── not-found.tsx        # 404 page
│   │   ├── about_me/            # About page
│   │   ├── blog/                # Blog listing & posts
│   │   ├── admin/               # Admin dashboard
│   │   ├── contact/             # Contact form
│   │   ├── login/               # Authentication
│   │   └── [other routes]/      # Additional pages
│   ├── (root)/                  # Root layout routes
│   ├── api/                     # API routes
│   │   ├── auth/                # Authentication endpoints
│   │   ├── posts/               # Blog post endpoints
│   │   ├── health/              # Health check
│   │   └── swagger/             # API documentation
│   └── lib/                     # App utilities
│
├── components/                  # Reusable React components
│   ├── layout/                  # Header, Footer, Navigation
│   ├── ui/                      # Radix UI components
│   ├── BlogContent.tsx          # Safe HTML rendering
│   ├── EditorJSRenderer.tsx     # EditorJS content display
│   ├── AuthGuard.tsx            # Authentication wrapper
│   └── [other components]/      # Feature components
│
├── config/                      # Configuration files
│   └── components.json          # shadcn/ui configuration
│
├── data/                        # Static data
│   └── posts.json               # Blog posts data
│
├── deployment/                  # Deployment & DevOps
│   ├── Dockerfile               # Container configuration
│   ├── docker-compose.yml       # Multi-container setup
│   ├── nginx/                   # Nginx configuration
│   ├── *.sh                     # Deployment scripts
│   ├── ecosystem.config.js      # PM2 configuration
│   └── DEPLOYMENT_GUIDE.md      # Deployment instructions
│
├── lib/                         # Shared utilities
│   ├── api-client.ts            # HTTP client setup
│   ├── auth.ts                  # Authentication utilities
│   ├── content-parser.ts        # Content parsing
│   ├── utils.ts                 # General utilities
│   └── services/                # API service classes
│
├── messages/                    # i18n translation files
│   ├── en.json                  # English translations
│   ├── fa.json                  # Farsi translations
│   └── it.json                  # Italian translations
│
├── public/                      # Static assets
│   ├── assets/                  # Images, fonts, media
│   ├── static/                  # Static files
│   └── locales/                 # Locale-specific assets
│
├── scripts/                     # Utility scripts
│   └── *.sh                     # Build & helper scripts
│
├── types/                       # TypeScript definitions
│   ├── editorjs.d.ts            # EditorJS types
│   └── TPost.tsx                # Post type definitions
│
├── .env.example                 # Environment variables template
├── .eslintrc.json               # ESLint configuration
├── .gitignore                   # Git ignore rules
├── global.d.ts                  # Global TypeScript declarations
├── i18n.ts                      # i18n configuration
├── jest.config.js               # Jest testing configuration
├── middleware.ts                # Next.js middleware
├── next.config.mjs              # Next.js configuration
├── next-sitemap.config.js       # Sitemap generation config
├── package.json                 # Dependencies & scripts
├── postcss.config.js            # PostCSS configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
└── README.md                    # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+
- **npm** or **yarn**

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd hosseini.net-i18n
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   ```bash
   cp .env.example .env.local
   # Edit .env.local with your settings
   ```

4. **Start development server**

   ```bash
   npm run dev
   ```

5. **Open in browser**
   - Navigate to [http://localhost:3000](http://localhost:3000)
   - Available locales: `/en`, `/fa`, `/it`

---

## 📝 Available Scripts

| Script              | Purpose                                  |
| ------------------- | ---------------------------------------- |
| `npm run dev`       | Start development server with hot reload |
| `npm run build`     | Production build with sitemap generation |
| `npm run build:dev` | Development build                        |
| `npm run start`     | Start production server                  |
| `npm run lint`      | Run ESLint for code quality              |

---

## 🌐 Internationalization

The project supports **3 languages** with full i18n implementation:

- **English** (`en`) - Default language
- **Farsi/Persian** (`fa`) - Right-to-left support
- **Italian** (`it`)

### Translation Files

Located in `/messages`:

- `en.json` - English strings
- `fa.json` - Persian strings
- `it.json` - Italian strings

### Adding New Translations

1. Add keys to all three JSON files in `/messages`
2. Use `useTranslations()` hook in components
3. Translations update automatically

---

## 📚 Blog System

The blog system supports rich content with **EditorJS**:

### Features

- **Editor support**: Headers, images, lists, code blocks, quotes, tables, etc.
- **Safe rendering**: HTML sanitization with `html-react-parser`
- **Dynamic routes**: `/[locale]/blog/[id]` for individual posts
- **Static data**: Posts stored in `/data/posts.json`

### Adding Blog Posts

1. Add post to `/data/posts.json` with EditorJS format
2. Generate translations in `/messages/*.json`
3. Rebuild or restart dev server

### Blog Components

- `BlogContent.tsx` - Renders safe HTML content
- `EditorJSRenderer.tsx` - Renders EditorJS blocks
- `LatestPosts.tsx` - Displays recent posts

---

## 🔐 Authentication

JWT-based authentication system with the following features:

### Endpoints

- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/verify` - Verify token
- `GET /api/auth/profile` - Get user profile

### Protected Routes

Admin pages and authenticated content use `AuthGuard.tsx` component:

```tsx
<AuthGuard>
  <AdminDashboard />
</AuthGuard>
```

---

## 🎨 UI Components

Built with **Radix UI** and **Tailwind CSS** for accessibility and consistency:

### Location: `/components/ui/`

- Button
- Card
- Input
- Select
- Dialog
- Tabs
- Separator
- Alert
- Badge
- Scroll Area
- And more...

---

## 🚢 Deployment

### Docker Deployment

```bash
cd deployment
docker-compose up -d
```

### PM2 (Production Server)

```bash
cd deployment
chmod +x deploy.sh
./deploy.sh
```

### Static Export

Configure in `next.config.mjs` for completely static deployment.

### Nginx Reverse Proxy

Nginx configuration available in `/deployment/nginx/`

See `/deployment/DEPLOYMENT_GUIDE.md` for detailed instructions.

---

## 📊 API Documentation

### Health Check

```bash
GET /api/health
```

### Blog Posts

```bash
GET /api/posts              # Get all posts
GET /api/posts/[id]         # Get specific post
POST /api/posts             # Create post (admin)
PUT /api/posts/[id]         # Update post (admin)
DELETE /api/posts/[id]      # Delete post (admin)
```

### Swagger/OpenAPI

Available at `/api/swagger` for interactive API documentation.

---

## 🧪 Testing

Run tests with Jest:

```bash
npm test
```

Tests are configured for:

- Unit tests
- Component tests
- Integration tests

---

## 🔧 Configuration Files

| File                 | Purpose                            |
| -------------------- | ---------------------------------- |
| `next.config.mjs`    | Next.js build & export settings    |
| `tsconfig.json`      | TypeScript compilation options     |
| `tailwind.config.ts` | Tailwind CSS customization         |
| `postcss.config.js`  | CSS processing pipeline            |
| `.eslintrc.json`     | Code linting rules                 |
| `jest.config.js`     | Testing framework setup            |
| `i18n.ts`            | Internationalization configuration |
| `middleware.ts`      | Next.js request middleware         |

---

## 🌍 Environment Variables

Create `.env.local` from `.env.example`:

```env
# Database
DATABASE_URL=file:./data.db

# API
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Authentication
JWT_SECRET=your-secret-key-here

# External Services
NEXT_PUBLIC_ANALYTICS_ID=

# Feature Flags
NEXT_PUBLIC_ENABLE_ADMIN=true
```

---

## 🤝 Contributing

1. Create a new branch for features: `git checkout -b feature/feature-name`
2. Commit changes: `git commit -m "feat: add feature"`
3. Push to branch: `git push origin feature/feature-name`
4. Open a Pull Request

---

## 📄 License

[Specify your license here]

---

## 💬 Support

For issues and questions:

- Check `/deployment/DEPLOYMENT_GUIDE.md` for deployment help
- Review configuration in respective config files
- Check API responses for error details

---

## 📈 Performance

- ⚡ Next.js static optimization
- 🎯 Code splitting and lazy loading
- 🖼️ Image optimization with Next.js Image
- 🗺️ Automatic sitemap for SEO
- ♿ Built with accessibility in mind

---

**Last Updated**: October 2025
