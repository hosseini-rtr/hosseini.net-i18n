"use client";
import ProjectSliderBtns from "@/components/ProjectSliderBtns";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  BsArrowUpRight,
  BsFillMenuButtonWideFill,
  BsGithub,
} from "react-icons/bs";
import { FcScatterPlot } from "react-icons/fc";
import {
  SiDjango,
  SiKeras,
  SiOpencv,
  SiPythonanywhere,
  SiReact,
  SiSocketdotio,
  SiTensorflow,
} from "react-icons/si";
import { TbMathFunctionY } from "react-icons/tb";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Projects() {
  const projects = [
    {
      num: "01",
      category: "FullStack",
      title: "Hober Chat",
      description:
        "Consequat id occaecat occaecat magna ullamco deserunt nulla amet mollit qui et.",
      stacks: [
        { num: 1, name: "Socket IO", icon: <SiSocketdotio /> },
        { num: 2, name: "Django Rest API", icon: <SiDjango /> },
        { num: 3, name: "ReactNative", icon: <SiReact /> },
      ],
      image: "/assets/work/hober.png",
      github: "https://github.com/hosseinirtr/hober-chat-fullstack",
      liveUrl: "Hober",
    },
    {
      num: "02",
      category: "FullStack",
      title: "Cyan-Todo, AI manage your Tasks",
      description:
        "Consequat id occaecat occaecat magna ullamco deserunt nulla amet mollit qui et.",
      stacks: [
        { num: 1, name: "Django Rest API", icon: <SiDjango /> },
        { num: 2, name: "React & ReactNative", icon: <SiReact /> },
        {
          num: 3,
          name: "Large Language Model LLM",
          icon: <BsFillMenuButtonWideFill />,
        },
      ],
      image: "/assets/work/hober.png",
      github: "https://github.com/hosseinirtr/Cyan-Todo",
      liveUrl: "",
    },
    {
      num: "03",
      category: "Data analyst",
      title: " Green Space Design Company Team Assignment",
      description:
        "Consequat id occaecat occaecat magna ullamco deserunt nulla amet mollit qui et.",
      stacks: [
        { num: 1, name: "Python", icon: <SiPythonanywhere /> },
        { num: 2, name: "Matplotlib", icon: <FcScatterPlot /> },
        { num: 3, name: "Math and Algorithm", icon: <TbMathFunctionY /> },
      ],
      image: "/assets/work/hober.png",
      github: "https://github.com/hosseinirtr/hober-chat-fullstack",
      liveUrl: "Hober",
    },
    {
      num: "04",
      category: "FullStack",
      title: "Image Classifier",
      description:
        "Consequat id occaecat occaecat magna ullamco deserunt nulla amet mollit qui et.",
      stacks: [
        { name: "React ", icon: <SiReact /> },
        { name: "Python", icon: <SiPythonanywhere /> },
        { name: "Django Rest API", icon: <SiDjango /> },
        { name: "Keras", icon: <SiKeras /> },
        { name: "Tensorflow", icon: <SiTensorflow /> },
        { name: "OpenCV", icon: <SiOpencv /> },
        { name: "Math and Algorithm", icon: <TbMathFunctionY /> },
      ],
      image: "/assets/work/hober.png",
      github: "https://github.com/hosseinirtr/hober-chat-fullstack",
      liveUrl: "04",
    },
  ];
  const [project, setProject] = useState(projects[0]);
  const handleSlideChange = (sw: { activeIndex: any }) => {
    const currentIndex = sw.activeIndex;
    setProject(projects[currentIndex]);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 1.4, duration: 0.4, ease: "easeIn" },
      }}
      className="min-h-[80vh] flex flex-col xl:flex-row xl:gap-[30px]"
    >
      <div className="container mx-auto" dir="ltr">
        <div className="flex flex-col-reverse xl:flex-row xl:gap-[30px]">
          <div className="w-full xl:w-[50%] xl:h-[460px] flex flex-col xl:justify-between order-2 xl:order-none">
            <div className="flex flex-col gap-[30px] h-1/2 ">
              {/* outline num */}
              <p className="text-8xl leading-none font-extrabold text-transparent text-outline">
                {project.num}
              </p>
              <p className="text-2xl leading-none font-extrabold">
                {project.category} project
              </p>
              <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500 capitalize">
                {project.title}
              </h2>
              <br />
              {/* Stacks */}
              <ul className="flex gap-4">
                {project.stacks.map((item, index) => (
                  <li key={item.name} className="text-xl text-accent my-2">
                    <TooltipProvider delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger className="m-1">
                          {item.icon}
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="bg-slate-50 rounded-sm text-background p-2 capitalize">
                            {item.name}
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </li>
                ))}
              </ul>
              {/* border */}
              <Separator />
              {/* buttons */}
              <div className="flex gap-5 m-2">
                <div className={`${project.liveUrl !== "" ? "" : "hidden"} `}>
                  <Link href={project.liveUrl}>
                    <TooltipProvider delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger className="flex w-[50px] h-[50px] rounded-full bg-white/5 justify-center items-center group">
                          <BsArrowUpRight className="text-white text-2xl group-hover:text-accent" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="bg-slate-50 rounded-sm text-background p-2 capitalize">
                            <p>Live Project</p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Link>
                </div>
                <div className={`${project.github !== "" ? "" : "hidden"} `}>
                  <Link href={project.liveUrl}>
                    <TooltipProvider delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger className="flex w-[50px] h-[50px] rounded-full bg-white/5 justify-center items-center group">
                          <BsGithub className="text-white text-2xl group-hover:text-accent" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="bg-slate-50 rounded-sm text-background p-2 capitalize">
                            <p>GitHub Repo</p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full xl:w-[50%]">
            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              className="xl:h-[520px] mb-12"
              loop={true}
              onSlideChange={handleSlideChange}
            >
              {projects.map((item, index) => (
                <SwiperSlide key={index} className="w-full">
                  <div className="h-[460px] relative group flex justify-center items-center ">
                    {/* overlay */}
                    <div className="absolute top-0 bottom-0 w-full h-full bg-black/10 z-10"></div>
                    {/* Image */}
                    <div className="relative w-full h-full">
                      <Image
                        alt={item.title}
                        src={item.image}
                        fill
                        className="object-cover mix-blend-lighten"
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
              <div className="bg-red-600">
                <ProjectSliderBtns
                  containerStyles="flex gap-2 absolute right-0 bottom-[calc(50%_-_22px)] xl:bottom-0 z-20 w-full justify-between xl:w-max xl:justify-none"
                  iconStyles=""
                  btnStyles="bg-accent hover:bg-accent-hover text-primary text-[22px] w-[44px] h-[44px] flex justify-center items-center transition-all"
                />
              </div>
            </Swiper>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
