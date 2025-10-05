import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed "output": "export" to enable server-side features for CMS
  images: { unoptimized: true },
};

export default withNextIntl(nextConfig);
