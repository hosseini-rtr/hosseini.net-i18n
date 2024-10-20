import Header from "@/components/Header";
import PageTransition from "@/components/pageTransition";
import StairTransition from "@/components/StairTransition";
import { locales } from "@/i18n";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { getLangDir } from "rtl-detect";
import "../globals.css";

// Fetch translations without using hooks
export async function generateMetadata({ params: { locale } }: any) {
  const t = await getTranslations({ locale, namespace: "SEO" });
  const canonicalUrl = `https://hosseinhosseini.net/${locale}`;

  // JSON-LD structured data (BreadcrumbList and Person)
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: t("breadcrumbHome"),
        item: "https://hosseinhosseini.net/",
      },
    ],
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Seyed Hossein Hosseini",
    url: "https://hosseinhosseini.net/",
    sameAs: [
      "https://www.linkedin.com/in/seyed-hossein-hosseini-rtr/",
      "https://instagram.com/hosseinhosseini_net",
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
    "Full Stack Developer",
    "Software Developer",
    "Web Developer",
    "Mobile App Developer",
    "React Developer",
    "Python Developer",
    "Next.js",
    "Freelance Developer",
    "Hossein Hosseini Portfolio",
    "AI Solutions",
    "Business Solutions",
  ];

  return {
    metadataBase: new URL("https://hosseinhosseini.net"), // Set metadataBase
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
      canonical: canonicalUrl, // Include the canonical URL here
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
