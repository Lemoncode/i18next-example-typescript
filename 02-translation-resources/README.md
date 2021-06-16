# 01 Translation Resources

## Resumen

Este ejemplo toma como punto de partida el código de _00-boilerplate_.

Vamos a ver cómo llevar las traducciones que hemos añadido en el ejemplo anterior, a ficheros de resources que se descargan a petición según son necesarios para nuestra aplicación.

## Paso a Paso

- Primero copiamos el ejemplo anterior, y hacemos `npm install`

```bash
npm install
```

- Vamos a crear una carpeta (en el root de nuestro proyecto) llamada _locales_. Dentro tendremos una carpeta por idioma, y en cada una, diferentes ficheros _.json_ por cada _namespace_ configurado anteriormente con las traducciones. Por ejemplo, en la carpeta para el idioma _es_ tendríamos _common.json_ y _pages.hello.json_:

_locales/es/common.json_

```json
{
  "buttons": {
    "ok": "Aceptar"
  }
}
```

_locales/es/pages.hello.json_

```json
{
  "welcome": "Bienvenido"
}
```

- Para recuperar los resources que acabamos de crear necesitamos instalar la librería `i18next-http-backend`:

```bash
npm install i18next-http-backend
```

- Configurar i18next-http-backend:

```diff
import i18next, { i18n as i18nInstance } from "i18next";
import { initReactI18next } from "react-i18next";
import { languages, namespaces } from "./i18n.constants";
- import { es, en } from "./i18n.translations";
+ import HttpApi from "i18next-http-backend";

const createI18n = (language: string): i18nInstance => {
  const i18n = i18next.createInstance().use(initReactI18next);

  i18n
    .use(HttpApi) // Use backend plugin for translation file download.
    .init({
+      backend: {
+        loadPath: "./locales/{{lng}}/{{ns}}.json",
+      },
      lng: language,
      fallbackLng: language,
+      ns: namespaces.common,
-      resources: {
-        [languages.es]: es,
-        [languages.en]: en,
-      },
    });

  return i18n;
};

export const i18n = createI18n(languages.es);
```

Ahora podemos eliminar el fichero _i18n.translations.ts_.

- Debemos añadir _React Suspense_ en el root de nuestra aplicación:

```diff
import React from "react";
import ReactDOM from "react-dom";
import { App } from "./app";
import "./i18n/i18n";

ReactDOM.render(
-  <div>
+  <React.Suspense fallback={<>Loading...</>}>
    <App />
-  </div>
+  </React.Suspense>,
  document.getElementById("root")
);
```

- Para crear nuestro _bundle_ necesitaremos copiar los ficheros de resources a la carpeta de build (en este ejemplo, _dist_):

```bash
npm install copy-webpack-plugin --save-dev
```

Y lo utilizamos en _webpack.config.js_:

```diff
const HtmlWebpackPlugin = require("html-webpack-plugin");
+ const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");
const basePath = __dirname;

module.exports = {
  context: path.resolve(basePath, "src"),
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
  },
  entry: {
    app: ["./index.tsx"],
  },
  devtool: "eval-source-map",
  stats: "errors-only",
  output: {
    filename: "[name].[chunkhash].js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "index.html",
      scriptLoading: "blocking",
    }),
+    new CopyWebpackPlugin({
+      patterns: [
+        {
+          from: path.resolve(__dirname, "locales"),
+          to: path.resolve(__dirname, "dist/locales"),
+        },
+      ],
+    }),
  ],
};
```

- Podemos comprobar que todo ha ido bien arrancando el proyecto con `npm start` y observando las traducciones y cómo se descargan los ficheros _.json_ en la pestaña de _Network_ de las _dev tools_ de nuestro navegador.
