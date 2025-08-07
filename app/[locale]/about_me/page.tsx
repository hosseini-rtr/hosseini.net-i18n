"use client";
import BlogContent from "@/components/BlogContent";
import Photo from "@/components/Photo";
import Socials from "@/components/Socials";
import Stats from "@/components/Stats";
import { useTranslations } from "next-intl";

export default function AboutMe() {
  const t = useTranslations("AboutMe");

  return (
    <section className="h-full">
      <div className="container mx-auto h-full">
        <div className="flex flex-col md:flex-row items-center justify-between md:pt-0 md:pb-24">
          {/* text */}
          <div className=" order-2 md:order-none">
            <span className="mb-3 text-white/60">{t("jobTitle")}</span>
            <h2 className="mb-6">
              <BlogContent content={t.raw("introduction")} />
            </h2>
            <p className="max-w-[500px] mb-9 text-white/80 ">
              {t("des_about_me")}
            </p>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="mb-5 md:mb-0 items-center flex justify-center">
                <Socials
                  location="header"
                  containerStyles={"flex gap-6"}
                  iconStyles={
                    "w-9 h-9 border border-secondary rounded-full flex justify-center items-center text-secondary text-base hover:bg-secondary hover:text-background hover:transition-all duration-500"
                  }
                />
              </div>
            </div>
          </div>
          <div className="order-1 md:order-none mb-8 md:m-0">
            <Photo />
          </div>
        </div>
      </div>
      <Stats />
    </section>
  );
}
