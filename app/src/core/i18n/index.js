import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetetctor from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

const initializeTranslations = () => {
  i18n
    //  use backend (will fetch translations)
    .use(Backend)
    //  detect user language
    .use(LanguageDetetctor)
    //  pass the i18n instance to react-i18next
    .use(initReactI18next)
    //  init i18next
    .init({
      backend: {
        loadPath: "/locales/{{lng}}/translations.json",
      },
      load: "languageOnly", //    just use "en" instead of "en_US"
      debug: process.env.ENV === "development",
      fallbackLng: "en",
      interpolation: {
        escapeValue: false, //  not needed for react as it escapes by default
      },
    });
};

export { initializeTranslations };
