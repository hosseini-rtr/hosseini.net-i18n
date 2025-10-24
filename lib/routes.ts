import { useLocale, useTranslations } from "next-intl";

export type Route = {
  name: string;
  path: string;
  showInNav?: boolean;
  showInMobile?: boolean;
};

export const useRoutes = () => {
  const t = useTranslations("Nav");
  const locale = useLocale();

  const routes: Route[] = [
    {
      name: t("home"),
      path: `/${locale}`,
      showInNav: true,
      showInMobile: true,
    },
    {
      name: t("blog"),
      path: `/${locale}/blog`,
      showInNav: true,
      showInMobile: true,
    },
    {
      name: t("links"),
      path: `/${locale}/links`,
      showInNav: false,
      showInMobile: true,
    },
    {
      name: t("resume"),
      path: `/${locale}/resume`,
      showInNav: true,
      showInMobile: true,
    },
    // {
    //   name: t("cooperation"),
    //   path: `/${locale}/services`,
    //   showInNav: true,
    //   showInMobile: true
    // },
    // {
    //   name: t("projects"),
    //   path: `/${locale}/project`,
    //   showInNav: true,
    //   showInMobile: true
    // },

    {
      name: t("contact"),
      path: `/${locale}/contact`,
      showInNav: true,
      showInMobile: true,
    },
  ];

  return routes;
};
