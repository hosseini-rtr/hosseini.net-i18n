import { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Seyed Hossein Hosseini | Full Stack Developer & Software Engineer",
  description: "Full Stack Developer with over 5 years of experience, passionate about creating impactful technology solutions using Django, React.js, Flask, and Node.js.",
  openGraph: {
    title: "Seyed Hossein Hosseini | Full Stack Developer & Software Engineer",
    description: "Full Stack Developer with over 5 years of experience, passionate about creating impactful technology solutions.",
    url: "https://hosseini-rtr.ir",
    siteName: "Seyed Hossein Hosseini",
    images: [
      {
        url: "https://hosseini-rtr.ir/social-image.png",
        width: 1200,
        height: 630,
        alt: "Seyed Hossein Hosseini"
      }
    ],
    locale: "en",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Seyed Hossein Hosseini | Full Stack Developer & Software Engineer",
    description: "Full Stack Developer with over 5 years of experience, passionate about creating impactful technology solutions.",
    images: ["https://hosseini-rtr.ir/social-image.png"],
  },
  alternates: {
    canonical: "https://hosseini-rtr.ir",
    languages: {
      'en': 'https://hosseini-rtr.ir/en',
      'fa': 'https://hosseini-rtr.ir/fa',
      'it': 'https://hosseini-rtr.ir/it'
    }
  }
};

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
