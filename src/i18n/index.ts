import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import es from "./locales/es.json";
import ptBR from "./locales/pt-BR.json";
import fr from "./locales/fr.json";
import de from "./locales/de.json";

export const SUPPORTED_LANGS = ["en", "es", "pt-BR", "fr", "de"] as const;
export type SupportedLang = (typeof SUPPORTED_LANGS)[number];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
      "pt-BR": { translation: ptBR },
      // fr/de ship only the portfolio (`p.*`) keys + the shared chrome bits;
      // everything else falls back to EN (fallbackLng below).
      fr: { translation: fr },
      de: { translation: de },
    },
    fallbackLng: "en",
    supportedLngs: ["en", "es", "pt-BR", "fr", "de"],
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "mwdev-lang",
      convertDetectedLanguage: (lng) => {
        if (lng.toLowerCase().startsWith("pt")) return "pt-BR";
        if (lng.toLowerCase().startsWith("es")) return "es";
        if (lng.toLowerCase().startsWith("fr")) return "fr";
        if (lng.toLowerCase().startsWith("de")) return "de";
        return "en";
      },
    },
  });

i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng;
});

export default i18n;
