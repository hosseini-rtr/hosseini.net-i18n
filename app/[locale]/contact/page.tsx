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
import { useState } from "react";
import { FaEnvelope, FaPhoneAlt, FaTelegram, FaWhatsapp } from "react-icons/fa";

export default function Contact() {
  const t = useTranslations("contact");
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (value: string) => {
    setFormData((prev) => ({ ...prev, service: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => form.append(key, value));
    form.append("_captcha", "false");

    const res = await fetch(
      "https://formsubmit.co/ajax/h.hosseini.me@gmail.com",
      {
        method: "POST",
        body: form,
      }
    );

    if (res.ok) {
      setSubmitted(true);
    } else {
      alert("Submission failed. Please try again.");
    }
  };

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
      className="py-6"
    >
      <div className="container mx-auto p-4">
        <div className="flex flex-col xl:flex-row gap-[30px]">
          <div className="xl:w-1/2 order-2 xl:order-none">
            {!submitted ? (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-6 p-10 bg-[#27272c] rounded-xl"
              >
                <h3 className="text-4xl text-accent">
                  Let&apos;s Work together
                </h3>
                <p className="text-white/60">{t("Description")}</p>
                <div
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  id="form__input"
                >
                  <Input
                    required
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    placeholder={t("FirstName")}
                  />
                  <Input
                    required
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    placeholder={t("LastName")}
                  />
                  <Input
                    required
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t("Email")}
                  />
                  <Input
                    required
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t("Phone")}
                  />
                </div>
                <Select onValueChange={handleServiceChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t("SelectService")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>{t("SelectService")}</SelectLabel>
                      <SelectItem value="mentoring">
                        Mentoring To be a Developer
                      </SelectItem>
                      <SelectItem value="fullstack">
                        Full-Stack & Mobile App Development
                      </SelectItem>
                      <SelectItem value="aisolutions">
                        AI-Powered Solutions
                      </SelectItem>
                      <SelectItem value="website">
                        Website Development
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Textarea
                  required
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="h-52"
                  placeholder={t("TextAreaPlaceholder")}
                />
                <Button type="submit" size="lg" className="max-w-40 bg-accent">
                  {t("Send")}
                </Button>
              </form>
            ) : (
              <div className="p-10 bg-[#27272c] rounded-xl text-white text-center">
                <h3 className="text-4xl text-accent mb-4">{t("thank-msg")}</h3>
                <p>{t("reach-you-msg")}</p>
              </div>
            )}
          </div>
          <div className="flex-1 flex items-center xl:justify-end order-1 xl:order-none mb-8 xl:mb-0">
            <ul className="flex flex-col gap-10">
              {info.map((item, index) => (
                <li key={item.title} className="flex items-center gap-6">
                  <div className="w-14 h-14 xl:h-20 xl:w-20 bg-[#27272c] text-accent rounded-md flex items-center justify-center">
                    <div className="text-2xl">{item.icon}</div>
                  </div>
                  <div>
                    <p className="text-white/60">{item.title}</p>
                    {item.href ? (
                      <Link href={item.href}>
                        <h3 dir="ltr" className="text-xl text-blue-200">
                          {item.description}
                        </h3>
                      </Link>
                    ) : (
                      <h3 dir="ltr" className="text-xl">
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
