"use client";

import Link from "next/link";

// Component
import LocaleSwitcherSelect from "./LocaleSwitcher";
import MobileNav from "./MobileNav";
import Nav from "./Nav";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="py-8 xl:py-12 ">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href={"/"}>
          <h1 className="text-4xl font-semibold">
            Hossein<span className="text-accent">.</span>i
          </h1>
        </Link>

        <div className="flex flex-row">
          <LocaleSwitcherSelect />
          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            <Nav />
            <Link className="hidden" href="/contact">
              <Button className="bg-foreground">Connect to me</Button>
            </Link>
          </div>

          {/* mobile nav */}
          <div className="lg:hidden items-center justify-center flex">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
