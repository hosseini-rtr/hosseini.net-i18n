"use client";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function StairTransition() {
  const pathName = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathName}
        className="h-screen w-screen fixed bg-background top-0 pointer-events-none z-40"
        initial={{ opacity: 1 }}
        animate={{
          opacity: 0,
          transition: { duration: 0.15, ease: "easeOut" }, // Faster transition
        }}
        exit={{
          opacity: 1,
          transition: { duration: 0.1, ease: "easeIn" },
        }}
      />
    </AnimatePresence>
  );
}
