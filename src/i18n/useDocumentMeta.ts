import { useEffect } from "react";
import { useTranslation } from "react-i18next";

/**
 * Home document meta. Prefers the portfolio keys (`p.meta.*`, redesign
 * 2026-07) and falls back to the legacy `meta.*` behavior when a locale
 * doesn't ship them yet.
 */
export function useDocumentMeta() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const hasPortfolioMeta =
      i18n.exists("p.meta.title") && i18n.exists("p.meta.description");

    const title = hasPortfolioMeta ? t("p.meta.title") : t("meta.title");
    const description = hasPortfolioMeta
      ? t("p.meta.description")
      : t("meta.description");
    const ogTitle = hasPortfolioMeta ? title : t("meta.ogTitle");
    const ogDescription = hasPortfolioMeta
      ? description
      : t("meta.ogDescription");

    document.title = title;
    document.documentElement.lang = i18n.resolvedLanguage ?? "en";

    const upsert = (selector: string, attr: string, value: string) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute(attr, value);
    };

    upsert('meta[name="description"]', "content", description);
    upsert('meta[property="og:title"]', "content", ogTitle);
    upsert('meta[property="og:description"]', "content", ogDescription);
    upsert('meta[name="twitter:title"]', "content", ogTitle);
    upsert('meta[name="twitter:description"]', "content", ogDescription);
  }, [t, i18n, i18n.resolvedLanguage]);
}
