import localFont from "next/font/local";

export const vazirmatn = localFont({
  src: [
    {
      path: "../public/static/fonts/Vazirmatn-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/static/fonts/Vazirmatn-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-vazirmatn",
  display: "swap",
});
