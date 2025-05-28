"use client";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import AboutMe from "./about_me/page";
import Contact from "./contact/page";
import Projects from "./project/page";
import Resume from "./resume/page";
import Services from "./services/page";
import LatestPosts from "@/components/LatestPosts";
import BusinessGroups from "@/components/BusinessGroups";

export default function RootPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = useTranslations("Home");

  return (
    <>
      <main className="flex flex-col m-4">
        <motion.div
          className="min-h-screen snap-center"
          id="#about-me"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <AboutMe />
        </motion.div>

        <motion.div
          className="min-h-screen snap-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl text-center my-8"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t("Our Groups")}
          </motion.h2>
          <BusinessGroups />
        </motion.div>

        <motion.div
          className="min-h-screen snap-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl text-center my-8"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t("Resume")}
          </motion.h2>
          <Resume />
        </motion.div>

        <motion.div
          className="min-h-screen snap-center mt-32"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl text-center"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t("Services")}
          </motion.h2>
          <Services />
        </motion.div>

        <motion.div
          className="min-h-screen snap-center"
          id="#projects"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl text-center my-8"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t("Projects")}
          </motion.h2>
          <Projects />
        </motion.div>

        <motion.div
          className="min-h-screen snap-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl text-center my-8"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t("Latest Blog Posts")}
          </motion.h2>
          <LatestPosts />
        </motion.div>

        <motion.div
          className="min-h-screen snap-center"
          id="#contact"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl text-center my-8"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t("Contact")}
          </motion.h2>
          <Contact />
        </motion.div>
      </main>
    </>
  );
}