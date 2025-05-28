"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useRoutes } from "@/lib/routes";

export default function Nav() {
  const pathName = usePathname();
  const routes = useRoutes();
  
  const navLinks = routes;

  return (
    <nav className="flex items-center gap-12">
      {navLinks.map((item, index) => (
        <Link
          key={index}
          href={item.path}
          className={`${pathName === item.path && "text-accent"} capitalize hover:text-accent transition-all`}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
