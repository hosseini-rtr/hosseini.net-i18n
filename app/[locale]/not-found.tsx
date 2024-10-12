import { useTranslations } from "next-intl";

export default function NotFoundPage() {
  const t = useTranslations("NotFoundPage");

  return (
    <div
      dir="ltr"
      className="flex flex-col md:flex-row w-full h-full justify-evenly items-center"
    >
      <div className="w-1/2 h-full" id="video">
        <video autoPlay muted loop playsInline className="mix-blend-screen">
          <source src="/assets/notfound.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div id="text" className="w-2/5 items-center justify-center h-full">
        <h1 className="my-5">404</h1>
        <h3 className="text-white/60 ">{t("title")}</h3>
        <p dir="rtl" className="my-5 font-light text-xs text-left">
          {t("Description")}
        </p>
      </div>
    </div>
  );
}
