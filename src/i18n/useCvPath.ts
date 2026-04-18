import { useTranslation } from "react-i18next";
import type { SupportedLang } from "./index";

const CV_BY_LANG: Record<SupportedLang, string> = {
  en: "/cv.pdf",
  es: "/cv-es.pdf",
  "pt-BR": "/cv-pt.pdf",
};

export function useCvPath(): string {
  const { i18n } = useTranslation();
  const lang = (i18n.resolvedLanguage ?? "en") as SupportedLang;
  return CV_BY_LANG[lang] ?? CV_BY_LANG.en;
}
