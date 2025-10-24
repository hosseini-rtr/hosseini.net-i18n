"use client";
import BusinessGroups from "@/components/BusinessGroups";
import LatestPosts from "@/components/LatestPosts";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import AboutMe from "./about_me/page";
import Contact from "./contact/page";
import Projects from "./project/page";
import Resume from "./resume/page";
import Services from "./services/page";

export default function RootPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = useTranslations("Home");

  return (
    <>
      <motion.main
        className="flex flex-col m-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="min-h-screen snap-center" id="#about-me">
          <AboutMe />
        </div>

        <div className="min-h-screen snap-center">
          <h2 className="text-4xl text-center my-8">{t("Resume")}</h2>
          <Resume />
        </div>

        <div className="min-h-screen snap-center mt-32">
          <h2 className="text-4xl text-center">{t("cooperation")}</h2>
          <Services />
        </div>

        <div className="min-h-screen snap-center" id="#projects">
          <h2 className="text-4xl text-center my-8">{t("Projects")}</h2>
          <Projects />
        </div>

        <div className="min-h-screen snap-center">
          <h2 className="text-4xl text-center my-8">{t("Our Groups")}</h2>
          <BusinessGroups />
        </div>

        <div className="min-h-screen snap-center">
          <h2 className="text-4xl text-center my-8">
            {t("Latest Blog Posts")}
          </h2>
          <LatestPosts />
        </div>

        <div className="min-h-screen snap-center" id="#contact">
          <h2 className="text-4xl text-center my-8">{t("Contact")}</h2>
          <Contact />
        </div>
      </motion.main>
    </>
  );
}
