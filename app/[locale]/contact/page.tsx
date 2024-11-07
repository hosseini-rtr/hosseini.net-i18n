"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SelectLabel } from "@radix-ui/react-select";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { FaEnvelope, FaPhoneAlt, FaTelegram, FaWhatsapp } from "react-icons/fa";

export default function Contact() {
  const t = useTranslations("contact");

  const info = [
    {
      icon: <FaPhoneAlt />,
      title: t("Phone"),
      description: "(+98)930 860 6440",
      href: "tel:555-555-5555",
    },
    {
      icon: <FaEnvelope />,
      title: t("Email"),
      description: "h.hosseini.me@gmail.com",
    },
    { icon: <FaTelegram />, title: "Telegram", description: "@hosseinirtr" },
    {
      icon: <FaWhatsapp />,
      title: "WhatsApp Business",
      description: "(+98)930 860 6440",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 1.4, duration: 0.4, ease: "easeIn" },
      }}
      className="py-6 "
    >
      <div className="container mx-auto p-4 ">
        <div className="flex flex-col xl:flex-row gap-[30px] ">
          <div className="xl:w-1/2 order-2 xl:order-none">
            <form className="flex flex-col gap-6 p-10 bg-[#27272c] rounded-xl">
              <h3 className="text-4xl text-accent">
                Let&apos;s Work toghether
              </h3>
              <p className="text-white/60">{t("Description")}</p>
              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                id="form__input"
              >
                <Input
                  required
                  className=""
                  type="firstname"
                  placeholder={t("FirstName")}
                />
                <Input
                  required
                  className=""
                  type="lastname"
                  placeholder={t("LastName")}
                />
                <Input
                  required
                  className=""
                  type="email"
                  placeholder={t("Email")}
                />
                <Input
                  required
                  className=""
                  type="phone"
                  placeholder={t("Phone")}
                />
              </div>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t("SelectService")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>{t("SelectService")}</SelectLabel>
                    <SelectItem value="backend">
                      Mentoring To be a Developers
                    </SelectItem>
                    <SelectItem value="fullstack">
                      Full-Stack & Mobile Application Development
                    </SelectItem>
                    <SelectItem value="aisolutions">
                      AI-Powered Solutions
                    </SelectItem>
                    <SelectItem value="website">Website Development</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Textarea
                required
                className="h-52"
                placeholder={t("TextAreaPlaceholder")}
              />
              <Button size="lg" className="max-w-40 bg-accent">
                {t("Send")}
              </Button>
            </form>
          </div>
          <div className="flex-1 flex items-center xl:justify-end order-1 xl:order-none mb-8 xl:mb-0">
            <ul className="flex flex-col gap-10">
              {info.map((item, index) => (
                <li key={index} className="flex items-center gap-6">
                  <div className="w-14 h-14 xl:h-20 xl:w-20 bg-[#27272c] text-accent rounded-md flex items-center justify-center">
                    <div className="text-2xl">{item.icon}</div>
                  </div>
                  <div>
                    <p className="text-white/60">{item.title}</p>
                    {item.href ? (
                      <Link href={item.href}>
                        <h3
                          dir="ltr"
                          className="text-xl direction-alternate text-blue-200"
                        >
                          {item.description}
                        </h3>
                      </Link>
                    ) : (
                      <h3 dir="ltr" className="text-xl direction-alternate">
                        {item.description}
                      </h3>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
