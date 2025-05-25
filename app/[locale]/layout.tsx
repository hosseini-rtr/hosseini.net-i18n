import Header from "@/components/Header";
import PageTransition from "@/components/pageTransition";
import StairTransition from "@/components/StairTransition";
import { locales } from "@/i18n";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { getLangDir } from "rtl-detect";
import "../globals.css";

export async function generateMetadata({ params: { locale } }: any) {
  const t = await getTranslations({ locale, namespace: "SEO" });
  const canonicalUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: t("breadcrumbHome"),
        item: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
      },
    ],
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Seyed Hossein Hosseini",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
    sameAs: [
      "https://www.linkedin.com/in/seyed-hossein-hosseini-rtr/",
      "https://instagram.com/hosseinhosseini_net",
      // Add more social media profiles here:
      "https://github.com/hosseinirtr",           // Add your GitHub
      "https://twitter.com/hosseini_rtr",         // Add your Twitter
      "https://medium.com/@hosseini_rtr",          // If you blog on Medium
      "https://stackoverflow.com/users/hosseini_rtr",   // If you're active on Stack Overflow
      "https://dev.to/hosseini_rtr",                  // If you post on Dev.to
    ],
    jobTitle: t("jobTitle"),
    worksFor: {
      "@type": "Organization",
      name: t("worksFor"),
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "IAU - Islamic Azad University",
    },
  };

  const keywords = [
    "Python Developer",
    "Full Stack Developer",
    "Software Developer",
    "Web Developer",
    "Mobile App Developer",
    "React Developer",
    "Next.js",
    "Freelance Developer",
    "Hossein Hosseini Portfolio",
    "AI Solutions",
    "Business Solutions",
    "JavaScript Developer",
    "TypeScript Expert",
    "Node.js Developer",
    "Frontend Development",
    "Backend Development",
    "API Development",
    "Database Design",
    "Cloud Solutions",
    locale === 'fa' ? 'توسعه دهنده نرم افزار' : '',
    locale === 'it' ? 'Sviluppatore Software' : ''
  ].filter(Boolean);

  return {
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}`),
    title: t("title"),
    description: t("description"),
    keywords: keywords.join(", "),
    author: "Seyed Hossein Hosseini",
    publisher: t("author"),
    openGraph: {
      title: t("twitter.title"),
      description: t("twitter.description"),
      images: "/social-image.png",
      url: canonicalUrl,
      type: "website",
      site_name: t("siteName"),
    },
    twitter: {
      card: "summary_large_image",
      title: t("twitter.title"),
      description: t("twitter.description"),
      image: "/social-image.png",
    },
    robots: "index, follow",
    icons: {
      shortcut: "/favicon.svg",
      appleTouchIcon: "/icon-256.png",
      icon: "/favicon.svg",
    },
    manifest: "/manifest.json",
    other: {
      scripts: [
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify(breadcrumbSchema),
        },
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify(personSchema),
        },
      ],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const messages = useMessages();
  const direction = getLangDir(locale);

  return (
    <html lang={locale} dir={direction}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <StairTransition />
          <PageTransition>{children}</PageTransition>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
