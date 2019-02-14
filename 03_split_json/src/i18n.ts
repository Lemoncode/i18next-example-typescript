import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import XHR from "i18next-xhr-backend";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(XHR)
  .init({
    lng: "es",
    keySeparator: false, // we do not use keys in form messages.welcome
    fallbackLng: 'es' || 'en',
    load: 'currentOnly',
    react: {
      wait: true,
    },
    interpolation: {
      escapeValue: false // react already safes from xss
    },
    backend: {
      loadPath: '/locales/{{lng}}.json',
    }
  });

export default i18n;
