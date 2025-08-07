"use client";
import { useTranslations } from "next-intl";
import CountUp from "react-countup";

export default function Stats() {
  const t = useTranslations("stats");
  const status = [
    {
      num: new Date().getFullYear() - 2019,
      text: t("experience"),
    },
    {
      num: "10",
      text: t("project"),
    },
    {
      num: "4",
      text: t("awards"),
    },
    {
      num: "5",
      text: t("open-source"),
    },
  ];
  return (
    <section className="pt-4 pb-12 xl:pt-0 xl:pb-0">
      <div className="container mx-auto">
        <div className="flex flex-wrap gap-6 max-w-[80vw] mx-auto xl:max-w-none">
          {status.map((item) => (
            <div
              key={item.text}
              className="flex-1 flex gap-4 items-center justify-center xl:justify-start"
            >
              <CountUp
                end={+item.num}
                duration={5}
                delay={2}
                className="text-4xl xl:text-6xl font-extrabold"
              />
              <p
                className={`${
                  item.text.length < 15 ? "max-w-[100px]" : "max-w-[150px]"
                } leading-snug text-white/80`}
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
