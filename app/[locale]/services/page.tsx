"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { BsArrowDownRight } from "react-icons/bs";

export default function Services() {
  const t = useTranslations("cooperation");

  const services = [
    {
      num: "01",
      title: t("WebDev"),
      description: t("WebDevDec"),
      href: "",
    },
    {
      num: "02",
      title: t("fullstack"),
      description: t("FullstackDec"),
      href: "",
    },
    {
      num: "03",
      title: t("ai"),
      description: t("AIDec"),
      href: "",
    },
    {
      num: "04",
      title: t("mentoring"),
      description: t("mentoringDec"),
      href: "",
    },
  ];
  return (
    <section className="min-h-[80h] flex flex-col justify-center py-12 xl:py-0 my-5">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-[60px]"
        >
          {services.map((item, index) => (
            <div key={index} className="flex flex-1 flex-col gap-6 group mx-5">
              <div className="w-full flex justify-between items-center">
                <div className="text-4xl font-extrabold text-outline text-transparent group-hover:text-outline-hover transition-all duration-500">
                  {item.num}
                </div>
                <Link
                  href={item.href}
                  className="w-[50px] h-[50px] rounded-full bg-white group-hover:bg-accent transition-all duration-500 flex justify-center items-center group-hover:-rotate-45"
                >
                  <BsArrowDownRight className="text-primary text-3xl" />
                </Link>
              </div>
              <Link href={item.href}>
                <h2 className="text-[24px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500 ">
                  {item.title}
                </h2>
              </Link>
              <p className="text-white/60">{item.description}</p>
              <div className="border-b border-white/20 w-full"></div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
