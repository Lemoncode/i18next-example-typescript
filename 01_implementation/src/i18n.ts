import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: {
      login: "Login",
      "Invalid login or password, please type again":
        "Invalid login or password, please type again",
      "error, review the fields": "error, review the fields rrr",
      "login plus username": "Usuario: {{username}}"
    }
  },
  es: {
    translation: {
      login: "Introduzca credenciales",
      "Invalid login or password, please type again":
        "Usuario o clave no validos, porfavor intentelo de nuevo",
      "error, review the fields": "Error, revise los campos por favor",
      "login plus username": "Usuario: {{username}}"
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "es",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
