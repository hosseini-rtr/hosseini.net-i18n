"use client";
import { vazirmatn } from "@/app/fonts";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

export default function BlogPage() {
  const locale = useLocale();
  const t = useTranslations("Blog");
  const isFarsi = locale === "fa";

  return (
    <section className="min-h-[80vh] py-12 xl:py-24">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 0.2, duration: 0.4, ease: "easeIn" },
          }}
          className="text-center"
        >
          <h1
            className={`text-4xl font-bold mb-8 ${
              isFarsi ? vazirmatn.className : ""
            }`}
          >
            {t("title")}
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto">
            Blog posts coming soon...
          </p>
        </motion.div>
      </div>
    </section>
  );
}
