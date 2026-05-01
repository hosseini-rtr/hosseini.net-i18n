import createMiddleware from 'next-intl/middleware';

const locales = ['en', 'fa', 'it'];

export default createMiddleware({
  locales: locales,
  
  defaultLocale: 'en',
  
  localeDetection: true
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
