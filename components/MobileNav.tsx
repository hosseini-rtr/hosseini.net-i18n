"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useRoutes } from "@/lib/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CiMenuFries } from "react-icons/ci";

export default function MobileNav() {
  const pathName = usePathname();
  const routes = useRoutes();

  const mobileLinks = routes;

  return (
    <Sheet>
      <SheetTrigger className="flex justify-center items-center">
        <CiMenuFries className="text-[32px] mr-6 text-accent" />
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        {/* <div>Hossein</div> Replace With Logo! */}
        <nav className="flex flex-col justify-center items-center gap-8 mt-3">
          {mobileLinks.map((item) => (
            <SheetClose asChild key={item.path}>
              <Link
                href={item.path}
                className={`${
                  pathName === item.path && "text-accent border-b-2"
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
