"use client";

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathName = usePathname();
  const t = useTranslations("Nav");
  const locale = useLocale();
  const links = [
    { name: t("home"), path: `/${locale}` },
    { name: t("aboutme"), path: `/${locale}/about_me` },
    { name: t("services"), path: `/${locale}/services` },
    { name: t("projects"), path: `/${locale}/project` },
    { name: t("blog"), path: `/${locale}/blog` },
    { name: t("contact"), path: `/${locale}/contact` },
  ];

  return (
    <nav className={`flex gap-8 ${locale}`}>
      {links.map((item, index) => (
        <Link
          key={index}
          href={item.path}
          className={`${
            pathName === item.path && "text-accent border-b-2 border-accent "
          } capitalize font-medium hover:text-foreground transition-all`}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
