"use client";
import { motion } from "framer-motion";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLocale, useTranslations } from "next-intl"; // Assuming you use next-intl
import Link from "next/link";
import { BsFiletypeSql } from "react-icons/bs";
import {
  FaBuilding,
  FaCalendar,
  FaCertificate,
  FaCode,
  FaDocker,
  FaJs,
  FaPython,
  FaReact,
} from "react-icons/fa";
import {
  SiApachekafka,
  SiDjango,
  SiFastapi,
  SiFlask,
  SiGnubash,
  SiNginx,
  SiNodedotjs,
  SiOpentelemetry,
  SiPytorch,
  SiScikitlearn,
  SiTypescript,
} from "react-icons/si";
import { getLangDir } from "rtl-detect";

export default function Resume() {
  const t = useTranslations("Resume");
  const locale = useLocale();
  const direction = getLangDir(locale);

  const about = {
    title: t("about.title"),
    description: t("about.description"),
    info: [
      {
        fieldName: t("about.info.experience"),
        fieldValue: `${+new Date().getFullYear() - 2019} ${t("years")}`,
      },
      {
        fieldName: "Telegram",
        fieldValue: "@hosseini-rtr",
        link: true,
      },
      {
        fieldName: t("about.info.email"),
        fieldValue: "h.hosseini@gmail.com",
        link: true,
      },
      {
        fieldName: t("about.info.freelance"),
        fieldValue: t("about.info.freelance_value"),
      },
      {
        fieldName: t("about.info.language"),
        fieldValue: t("about.info.languages"),
      },
    ],
  };

  const experiences = {
    icon: "/assets/work.svg",
    title: t("experience.title"),
    description: t("experience.description"),
    items: [
      {
        company: "Farabi Financial Group.",
        position: "FullStack Developer",
        duration: "Dec 2023 - Sep 2024 · 10 mos",
      },
      {
        company: "Sadad Informatics co.",
        position: "FrontEnd developer",
        duration: "Apr 2021 - Jul 2023 · 2 yrs 4 mos",
      },
      {
        company: "Makeen Inc.",
        position: "FullStack Developer",
        duration: "Jun 2020 - Jan 2021 · 8 mos",
      },
    ],
  };

  const educations = {
    icon: "/assets/cap.svg",
    title: t("education.title"),
    description: t("education.description"),
    items: [
      {
        institution: "IAU - Islamic Azad University",
        degree: t("education.degree1"),
        duration: t("education.duration1"),
      },
      {
        institution: "Amirkabir University of Technology",
        degree: t("education.degree2"),
        duration: t("education.duration2"),
      },
    ],
  };

  const certificates = {
    icon: "/assets/cert.svg",
    title: t("certificates.title"),
    description: t("certificates.description"),
    items: [
      {
        institution:
          "MITx - (MOOC) program at Massachusetts Institute of Technology",
        field:
          "6.86x: Machine Learning with Python-From Linear Models to Deep Learning",
        link: "https://courses.edx.org/certificates/fb42b262d2fb44cd860f0bb72840140f",
      },
      {
        institution: "IBM - Coursera",
        field: "AI Engineering Professional Certificate",
      },
      {
        institution: "IBM - Coursera",
        field: "Introduction to Cloud Computing",
      },
      {
        institution: "Harvard - CS50x",
        field: "Programming with Python",
      },
      {
        institution: "Harvard - CS50x",
        field: "Web Programming with Python and JavaScript",
      },
      {
        institution: "Harvard - CS50sql",
        field: "Introduction to Databases with SQL",
      },
    ],
  };

  const skills = {
    title: t("skills.title"),
    description: t("skills.description"),
    skillsList: [
      { icon: <FaPython />, name: "Python Language" },
      { icon: <FaJs />, name: "JavaScript Language" },
      { icon: <SiTypescript />, name: "TypeScript Language" },
      { icon: <SiGnubash />, name: "Bash Language" },
      // { icon: <FaRust />, name: "Rust Language" },
      { icon: <SiDjango />, name: "Django" },
      { icon: <SiFastapi />, name: "FastAPI" },
      { icon: <SiFlask />, name: "Flask" },
      { icon: <SiNodedotjs />, name: "Node.js / tsx" },
      { icon: <FaReact />, name: "React.js / tsx" },
      { icon: <SiScikitlearn />, name: "Scikitlearn" },
      { icon: <SiPytorch />, name: "Pytorch" },
      { icon: <BsFiletypeSql />, name: "Database - sql" },
      { icon: <FaDocker />, name: "Docker" },
      { icon: <SiNginx />, name: "Nginx" },
      { icon: <SiApachekafka />, name: "Apache Kafka" },
      { icon: <SiOpentelemetry />, name: "Opentelemetry" },
    ],
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      dir={direction}
      animate={{
        opacity: 1,
        transition: { delay: 2, duration: 0.4, ease: "easeIn" },
      }}
      className={` min-h-[80vh] flex items-center justify-center py-12 xl:py-0`}
    >
      <div className="container mx-auto" dir={direction}>
        <Tabs
          defaultValue="about_me"
          className={`${
            direction == "rtl" ? "md:flex-row-reverse" : "md:flex-row"
          } flex flex-col  gap-[60px]`}
        >
          <TabsList
            dir={direction}
            className="flex flex-col w-full max-w-[380px] min-w-[300px] mx-auto xl:mx-0 gap-6 "
          >
            <TabsTrigger value="about_me">{about.title}</TabsTrigger>
            <TabsTrigger value="experience"> {experiences.title}</TabsTrigger>
            <TabsTrigger value="education">{educations.title}</TabsTrigger>
            <TabsTrigger value="certificates">{certificates.title}</TabsTrigger>
            <TabsTrigger value="skills"> {skills.title}</TabsTrigger>
          </TabsList>

          {/* about */}
          <div className="min-h-[70vh] w-5/6 mx-auto" dir={direction}>
            <TabsContent
              value="about_me"
              className="w-full text-center md:text-left"
            >
              <h3
                className={`text-4xl font-bold ${
                  direction == "rtl" ? "text-right" : ""
                }`}
              >
                {about.title}
              </h3>
              <p
                className={`max-w-xl text-white/60 mx-auto xl:mx-0 my-5 ${
                  direction == "rtl" ? "text-right" : ""
                }`}
              >
                {about.description}
              </p>
              <ul className="grid grid-cols-1 xl:grid-cols-2 gap-y-4 gap-x-12 max-w-[620px] mt-5">
                {about.info.map((item, index) => (
                  <li key={index} className="flex items-center gap-4 ">
                    <span className="text-white/60">{item.fieldName}</span>
                    <span className="text-xl">{item.fieldValue}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>

            {/* experience */}
            <TabsContent value="experience" className="w-full">
              <div className="flex flex-col gap-8 text-center md:text-left">
                <h3 className="text-4xl text-start font-bold">
                  {experiences.title}
                </h3>
                {/* <p className="max-w-xl text-start text-white/60 mx-auto md:mx-0">
                  {experiences.description}
                </p> */}
                <ScrollArea className="h-96">
                  <ul
                    dir={direction}
                    className="grid grid-cols-1 xl:grid-cols-2 gap-8 m-auto "
                  >
                    {experiences.items.map((experience, index) => (
                      <li
                        key={index}
                        className="bg-gray-900 h-44 py-6 px-6 rounded-xl flex flex-col justify-center items-center md:items-start gap-1"
                      >
                        <span className="text-accent/60 text-sm flex flex-row gap-2 justify-center items-center">
                          <FaCalendar size={12} />
                          <p>{experience.duration}</p>
                        </span>
                        <h3 className="flex flex-row gap-2 items-center text-lg text-nowrap whitespace-nowrap max-w-17 min-h-16 text-center">
                          <FaCode size={12} /> {experience.position}
                        </h3>
                        <div className="flex items-center gap-3">
                          <p className="flex flex-row gap-2 items-center text-white/60">
                            <FaBuilding size={12} />
                            {experience.company}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>

            {/* education */}
            <TabsContent value="education" className="w-full">
              <div className="flex flex-col gap-8 text-center md:text-left">
                <h3 className="text-4xl  text-start font-bold">
                  {educations.title}
                </h3>
                {/* <p className="max-w-xl text-start text-white/60 mx-auto md:mx-0">
                  {educations.description}
                </p> */}
                <ScrollArea className="h-96">
                  <ul
                    dir={direction}
                    className="grid grid-cols-1 xl:grid-cols-2 gap-8 m-auto "
                  >
                    {educations.items.map((education, index) => (
                      <li
                        key={index}
                        className="bg-gray-900 h-44 py-6 px-6 rounded-xl flex flex-col justify-center items-center md:items-start gap-1"
                      >
                        <span className="text-accent/60 text-sm flex gap-2 flex-row justify-center items-center">
                          <FaCalendar size={12} />
                          <p>{education.duration}</p>
                        </span>
                        <h3 className="flex flex-row gap-2 items-center text-lg text-nowrap whitespace-nowrap max-w-17 min-h-16 text-center">
                          <FaCode size={12} /> {education.degree}
                        </h3>
                        <div className="flex items-center gap-3">
                          <p className="flex flex-row gap-2 items-center text-white/60">
                            <FaBuilding size={12} />
                            {education.institution}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>

            {/* certificates */}
            <TabsContent value="certificates" className="w-full">
              <div className="flex flex-col gap-8 text-center md:text-left">
                <h3 className="text-4xl text-start font-bold">
                  {certificates.title}
                </h3>
                {/* <p className="max-w-xl text-start text-white/60 mx-auto md:mx-0">
                  {certificates.description}
                </p> */}
                <ScrollArea className="h-[600px]">
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    {certificates.items.map((certificate, index) => (
                      <Link
                        href={certificate.link || "#"}
                        key={index}
                        className="bg-gray-900 p-6 rounded-xl flex flex-col gap-4 hover:bg-gray-800 transition-colors"
                      >
                        <div className="flex items-center gap-3 text-accent">
                          <FaCertificate className="w-6 h-6" />
                          <h4 className="font-medium text-lg line-clamp-2">
                            {certificate.field}
                          </h4>
                        </div>
                        <div className="flex flex-col gap-2">
                          <p className="text-white/60 text-sm line-clamp-2">
                            {certificate.institution}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </TabsContent>

            {/* skills */}
            <TabsContent value="skills" className="w-full h-full">
              <div className="flex flex-col gap-7">
                <div
                  dir={direction}
                  className="flex flex-col gap-7 text-center md:text-left "
                >
                  <h3 className="text-4xl text-start font-bold">
                    {skills.title}
                  </h3>
                  {/* <p className="max-w-xl text-start text-white/60 mx-auto md:mx-0">
                    {skills.description}
                  </p> */}
                </div>
                <ul
                  dir={direction}
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:gap-8 gap-4"
                >
                  {skills.skillsList.map((skill, index) => (
                    <li key={index}>
                      <TooltipProvider delayDuration={100}>
                        <Tooltip>
                          <TooltipTrigger className="w-full h-[150px] bg-slate-600  flex justify-center items-center group">
                            <div className="text-5xl group-hover:text-accent transition-all duration-300">
                              {skill.icon}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="bg-slate-50 rounded-sm text-background p-2 capitalize">
                              {skill.name}
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </motion.div>
  );
}
