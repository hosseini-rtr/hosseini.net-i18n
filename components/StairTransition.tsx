"use client";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Stairs from "./Stairs";

export default function StairTransition() {
  const pathName = usePathname();

  return (
    <AnimatePresence mode="wait">
      <div key={pathName}>
        <div className="h-screen w-screen fixed top-0 left-0 right-0 pointer-events-none z-40 flex">
          <Stairs />
        </div>

        <motion.div
          className="h-screen w-screen fixed bg-background top-0 pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{
            opacity: 0,
            transition: { duration: 0.3, ease: "easeInOut" },
          }}
          exit={{ opacity: 0 }}
        />
      </div>
    </AnimatePresence>
  );
}
