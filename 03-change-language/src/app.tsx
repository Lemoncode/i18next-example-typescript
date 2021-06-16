import React from "react";
import { useTranslation } from "react-i18next";
import { namespaces } from "./i18n/i18n.constants";

export const App = () => {
  const { t, i18n } = useTranslation(namespaces.pages.hello);

  const changeLanguage = (language: string) => () => {
    i18n.changeLanguage(language);
  };

  return (
    <>
      <h1>{t("welcome")}</h1>
      <button>{t("buttons.ok", { ns: namespaces.common })}</button>
      <button onClick={changeLanguage("en")}>English</button>
      <button onClick={changeLanguage("es")}>Español</button>
    </>
  );
};
