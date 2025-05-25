import { getTranslations } from "next-intl/server";
import { FaGithub, FaInstagram, FaLinkedinIn, FaDev, FaYoutube, FaKaggle } from "react-icons/fa";
import { SiDevpost } from "react-icons/si";
import Link from "next/link";
import Image from "next/image";

export async function generateMetadata({ params: { locale } }: any) {
  const t = await getTranslations({ locale, namespace: "Links" });
  return {
    title: t("title"),
    description: t("description")
  };
}

interface LinkItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  color?: string;
}

const LinkItem = ({ href, icon, label, color = "bg-gray-100 hover:bg-gray-200" }: LinkItemProps) => (
  <Link 
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`flex items-center gap-3 px-6 py-4 rounded-lg ${color} transition-all duration-300 hover:scale-105 w-full max-w-md`}
  >
    <span className="text-xl">{icon}</span>
    <span className="text-lg font-medium text-black">{label}</span>
  </Link>
);

export default async function LinksPage() {
  const links = [
    {
      href: "https://www.linkedin.com/in/seyed-hossein-hosseini-rtr/",
      icon: <FaLinkedinIn className="text-[#0077B5]" />,
      label: "LinkedIn",
      color: "bg-blue-50 hover:bg-blue-100"
    },
    {
      href: "https://instagram.com/hosseinhosseini_net",
      icon: <FaInstagram className="text-[#E4405F]" />,
      label: "Instagram",
      color: "bg-pink-50 hover:bg-pink-100"
    },
    {
      href: "https://dev.to/hosseini_rtr",
      icon: <FaDev className="text-black" />,
      label: "Dev.to",
      color: "bg-gray-50 hover:bg-gray-100"
    },
    {
      href: "https://github.com/YOUR_GITHUB", // Add your GitHub URL
      icon: <FaGithub className="text-[#333]" />,
      label: "GitHub",
      color: "bg-gray-50 hover:bg-gray-100"
    },
    {
      href: "https://www.kaggle.com/YOUR_KAGGLE", // Add your Kaggle URL
      icon: <FaKaggle className="text-[#20BEFF]" />,
      label: "Kaggle",
      color: "bg-blue-50 hover:bg-blue-100"
    },
    {
      href: "https://devpost.com/YOUR_DEVPOST", // Add your Devpost URL
      icon: <SiDevpost className="text-[#003E54]" />,
      label: "Devpost",
      color: "bg-cyan-50 hover:bg-cyan-100"
    }
  ];

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
          <p className="text-gray-600 mb-8">Full Stack Developer & AI Enthusiast</p>
        </div>
        
        <div className="flex flex-col gap-4 w-full items-center">
          {links.map((link, index) => (
            <LinkItem key={index} {...link} />
          ))}
        </div>
      </div>
    </main>
  );
}