import { socialLinks } from "@/lib/social-config";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata({ params: { locale } }: any) {
  const t = await getTranslations({ locale, namespace: "Links" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

interface LinkItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  color?: string;
}

const LinkItem = ({
  href,
  icon,
  label,
  color = "bg-gray-100 hover:bg-gray-200",
}: Readonly<LinkItemProps>) => (
  <Link
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`flex items-center gap-3 px-6 py-4 rounded-lg ${color} transition-all duration-300 hover:scale-105 w-full max-w-md`}
  >
    <span className="text-xl text-orange-400">{icon}</span>
    <span className="text-lg font-medium text-black">{label}</span>
  </Link>
);

const topNews = [
  {
    href: "https://example.com/news/1",
    title: "Latest Project: AI-Powered Web Application",
    date: "2024-01",
    color: "bg-purple-50 hover:bg-purple-100",
  },
  {
    href: "https://example.com/news/2",
    title: "New Blog Post: Modern Web Development",
    date: "2023-12",
    color: "bg-green-50 hover:bg-green-100",
  },
  {
    href: "https://example.com/news/3",
    title: "Featured: Tech Conference Speaker",
    date: "2023-11",
    color: "bg-yellow-50 hover:bg-yellow-100",
  },
];

const NewsItem = ({
  href,
  title,
  date,
  color = "bg-gray-100 hover:bg-gray-200",
}: any) => (
  <Link
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`flex flex-col gap-2 px-6 py-4 rounded-lg ${color} transition-all duration-300 hover:scale-105 w-full max-w-md`}
  >
    <span className="text-lg font-medium text-black">{title}</span>
    <span className="text-sm text-gray-600">{date}</span>
  </Link>
);

const socialColorMap = {
  LinkedIn: "bg-blue-50 hover:bg-blue-100",
  Instagram: "bg-pink-50 hover:bg-pink-100",
  "Dev.to": "bg-gray-50 hover:bg-gray-100",
  GitHub: "bg-gray-50 hover:bg-gray-100",
  YouTube: "bg-red-50 hover:bg-red-100",
  Kaggle: "bg-blue-50 hover:bg-blue-100",
  Devpost: "bg-cyan-50 hover:bg-cyan-100",
};

export default async function LinksPage() {
  const visibleSocialLinks = socialLinks.filter((link) => link.showInLinks);

  return (
    <main className="min-h-screen py-20 px-4">
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-8">
        <div className="text-center">
          <div className="relative w-32 h-32 rounded-full overflow-hidden mb-6 mx-auto border-4 border-gray-100">
            <Image
              src="/assets/user.jpg"
              alt="Profile"
              fill
              className="object-cover"
            />
          </div>
          <h1 className="text-2xl font-bold mb-2">Seyed Hossein Hosseini</h1>
          <p className="text-gray-600 mb-8">
            Full Stack Developer & AI Enthusiast
          </p>
        </div>

        <div className="flex flex-col gap-4 w-full items-center mt-8">
          <h2 className="text-xl font-semibold mb-2">Latest Updates</h2>
          {topNews.map((news, index) => (
            <NewsItem key={news.title} {...news} />
          ))}
        </div>

        <div className="flex flex-col gap-4 w-full items-center">
          <h2 className="text-xl font-semibold mb-2">Follow Me</h2>
          {visibleSocialLinks.map((link, index) => {
            const IconComponent = link.icon;
            return (
              <LinkItem
                key={link.name}
                href={link.link}
                icon={<IconComponent style={{ color: link.color }} />}
                label={link.name}
                color={socialColorMap[link.name as keyof typeof socialColorMap]}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}
