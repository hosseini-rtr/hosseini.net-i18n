"use client";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({
  children,
}: Readonly<PageTransitionProps>) {
  const pathName = usePathname();

  return (
    <motion.div
      key={pathName}
      className="relative"
      initial={{ opacity: 0, y: 10 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
    >
      {children}
    </motion.div>
  );
}
