import React from "react";
import { useTranslation } from "react-i18next";
import { namespaces } from "./i18n/i18n.constants";

export const App = () => {
  const { t } = useTranslation(namespaces.pages.hello);

  return (
    <>
      <h1>{t("welcome")}</h1>
      <button>{t("buttons.ok", { ns: namespaces.common })}</button>
    </>
  );
};
