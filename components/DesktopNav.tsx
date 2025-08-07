"use client";
import { useRoutes } from "@/lib/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathName = usePathname();
  const routes = useRoutes();

  const navLinks = routes;

  return (
    <nav className="flex items-center gap-12">
      {navLinks.map((item) => (
        <Link
          key={item.path}
          href={item.path}
          className={`${
            pathName === item.path && "text-accent"
          } capitalize hover:text-accent transition-all`}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
