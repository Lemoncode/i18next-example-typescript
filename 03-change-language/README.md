# 01 Translation Resources

## Resumen

Este ejemplo toma como punto de partida el código de _02-translation-resources_.

Vamos a ver cómo podemos cambiar el idioma seleccionado.

## Paso a Paso

- Primero copiamos el ejemplo anterior, y hacemos `npm install`

```bash
npm install
```

Para cambiar el idioma, recuperaremos la instancia de _i18n_ con el _hook_ `useTranslation`, invocando al método `changeLanguage` con el idioma que queremos seleccionar:

_src/app.tsx_

```diff
import React from "react";
import { useTranslation } from "react-i18next";
import { namespaces } from "./i18n/i18n.constants";

export const App = () => {
-  const { t } = useTranslation(namespaces.pages.hello);
+  const { t, i18n } = useTranslation(namespaces.pages.hello);

+  const changeLanguage = (language: string) => () => {
+    i18n.changeLanguage(language);
+  };

  return (
    <>
      <h1>{t("welcome")}</h1>
      <button>{t("buttons.ok", { ns: namespaces.common })}</button>
+      <button onClick={changeLanguage("en")}>English</button>
+      <button onClick={changeLanguage("es")}>Español</button>
    </>
  );
};

```

- Podemos comprobar que todo ha ido bien arrancando el proyecto con `npm start`
