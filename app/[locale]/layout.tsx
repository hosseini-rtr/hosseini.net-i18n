import Header from "@/components/Header";
import PageTransition from "@/components/pageTransition";
import StairTransition from "@/components/StairTransition";
import { locales } from "@/i18n";
import {
  NextIntlClientProvider,
  useMessages,
  useTranslations,
} from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import Head from "next/head";
import { getLangDir } from "rtl-detect";
import "../globals.css";

// Note: How to prevent "Error: Page "/[locale]/page" is missing param "/favicon.ico" in "generateStaticParams()", which is required with "output: export" config." error?
// -> put favicon.ico in public folder

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
  const t = useTranslations("SEO");

  return (
    <html lang={locale} dir={direction}>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover"
        />
        <meta name="theme-color" content="#111111" />
        <meta name="author" content={t("author")} />

        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <link rel="icon" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/icon-256.png" />
        <link type="text/plain" rel="author" href="/humans.txt" />

        <meta property="og:image" content="/social-image.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="549" />

        <meta property="og:title" content={t("ogTitle")} />
        <meta property="og:site_name" content={t("siteName")} />
        <meta property="og:url" content="https://hosseinhosseini.net" />
        <meta property="og:type" content="website" />
        <meta property="twitter:card" content={t("twitterCard")} />
        <meta name="twitter:description" content={t("twitterDescription")} />
        <meta name="twitter:title" content={t("twitterTitle")} />
        <meta name="twitter:image" content="/social-image.png" />
        <meta name="robots" content="index, follow" />
        <link
          rel="sitemap"
          type="application/xml"
          title="Sitemap"
          href="https://hosseinhosseini.net/sitemap.xml"
        />

        {/* JSON-LD for BreadcrumbList */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://hosseinhosseini.net/",
              },
            ],
          })}
        </script>

        {/* JSON-LD for Person */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Seyed Hossein Hosseini",
            url: "https://hosseinhosseini.net/",
            sameAs: [
              "https://www.linkedin.com/in/seyed-hossein-hosseini-rtr/",
              "https://instagram.com/hosseinhosseini_net",
            ],
            jobTitle: "Software Developer - Full Stack Developer",
            worksFor: {
              "@type": "Organization",
              name: "Farabi Financial Group",
            },
            alumniOf: {
              "@type": "EducationalOrganization",
              name: "IAU - Islamic Azad University",
            },
          })}
        </script>
      </Head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <StairTransition />
          <PageTransition>{children}</PageTransition>{" "}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
