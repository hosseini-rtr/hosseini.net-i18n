"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CiMenuFries } from "react-icons/ci";

const links = [
  { name: "home", path: "/" },
  { name: "about me", path: "/about_me" },
  { name: "services", path: "/services" },
  { name: "work", path: "/project" },
  { name: "contact", path: "/contact" },
];
export default function MobileNav() {
  const pathName = usePathname();

  return (
    <Sheet>
      <SheetTrigger className="flex justify-center items-center">
        <CiMenuFries className="text-[32px] mr-6 text-accent" />
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <div>Hossein - logo</div>
        <nav className="flex flex-col justify-center items-center gap-8 mt-3">
          {links.map((item, index) => (
            <SheetClose asChild key={index}>
              <Link
                href={item.path}
                className={`${
                  pathName == item.path && "text-accent border-b-2"
                } text-4xl capitalize hover:line-through hover:text-foreground transition-all border-white`}
              >
                {item.name}
              </Link>
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
