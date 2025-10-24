// Debug version of the main page to test content rendering
"use client";
import { useTranslations } from "next-intl";

export default function DebugPage() {
  const t = useTranslations("Home");

  return (
    <main className="flex flex-col m-4 min-h-screen">
      <div className="p-8 bg-red-500 text-white">
        <h1>DEBUG: Main content should be visible</h1>
        <p>If you can see this, the content is rendering properly.</p>
        <p>Current time: {new Date().toLocaleString()}</p>
      </div>

      <div className="p-8 bg-blue-500 text-white">
        <h2>{t("Resume")}</h2>
        <p>Resume section content...</p>
      </div>

      <div className="p-8 bg-green-500 text-white">
        <h2>{t("cooperation")}</h2>
        <p>Services section content...</p>
      </div>

      <div className="p-8 bg-yellow-500 text-black">
        <h2>{t("Projects")}</h2>
        <p>Projects section content...</p>
      </div>
    </main>
  );
}
