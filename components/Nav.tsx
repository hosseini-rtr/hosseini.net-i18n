"use client";

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const t = useTranslations("Nav");
  const links = [
    { name: t("home"), path: "" },
    { name: t("aboutme"), path: "about_me" },
    { name: t("services"), path: "services" },
    { name: t("projects"), path: "project" },
    { name: t("contact"), path: "contact" },
  ];
  const pathName = usePathname();
  const locale = useLocale();

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
