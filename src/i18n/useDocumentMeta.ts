import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export function useDocumentMeta() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = t("meta.title");
    document.documentElement.lang = i18n.resolvedLanguage ?? "en";

    const upsert = (selector: string, attr: string, value: string) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute(attr, value);
    };

    upsert('meta[name="description"]', "content", t("meta.description"));
    upsert('meta[property="og:title"]', "content", t("meta.ogTitle"));
    upsert('meta[property="og:description"]', "content", t("meta.ogDescription"));
    upsert('meta[name="twitter:title"]', "content", t("meta.ogTitle"));
    upsert('meta[name="twitter:description"]', "content", t("meta.ogDescription"));
  }, [t, i18n.resolvedLanguage]);
}
