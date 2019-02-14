# Split json

Embedding all the translations in a js file and loading all at application startup may not
be ideal for medium and big sized applications.

In this sample we will split the translations files in separted json files, and we will
load them on deman.

# Steps

- Let's taking as starting point sample 02

```
npm install
```

- Let's create a subfolder called _locales_.

* Inside that subfolder let's create two subfolders more, one
  called _en_ and another called _es_

* We are going to split the translation files into two json files.

_./src/locales/en/en.json_

```json
{
  "login": "Login",
  "Invalid login or password, please type again": "Invalid login or password, please type again",
  "error, review the fields": "error, review the fields rrr",
  "login plus username": "Usuario: {{username}}",
  "REQUIRED": "Mandatory field"
}
```

_./src/locale/es/es.json_

```json
{
  "login": "Introduzca credenciales",
  "Invalid login or password, please type again": "Usuario o clave no validos, porfavor intentelo de nuevo",
  "error, review the fields": "Error, revise los campos por favor",
  "login plus username": "Usuario: {{username}}",
  "REQUIRED": "Campo obligatorio"
}
```

- We need to copy this files to the dist folder when generating the bundle
  with webpack (another option could be to server this from a CDN or from a
  database).

- First let's install a plugin that will let us copy files.

```bash
npm i -D copy-webpack-plugin
```

- Now let's configure it on webpack.

_./webpack.config.json_

Require the plugin on top of the file.

```javascript
const CopyWebpackPlugin = require("copy-webpack-plugin");
```

```diff
  plugins: [
+   new CopyWebpackPlugin([{ from: "locales/**/*" }]),
    //Generate index.html in /dist => https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html', //Name of file in ./dist/
      template: 'index.html', //Name of template in ./src
      hash: true,
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
  ],
```

- Let's give a try and check that files are copied into the right
  destination folder.

```bash
npm run build
```

- Now it's time to install an i18next plugin that will allow us
  request remote language files.

```bash
npm install i18next-xhr-backend --save
```

- Let's configure it.

_./src/i18n.ts_

```diff
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
+ import XHR from 'i18next-xhr-backend';

- // the translations
- // (tip move them in a JSON file and import them)
- const resources = {
-   en: {
-     translation: {
-       login: "Login",
-       "Invalid login or password, please type again":
-         "Invalid login or password, please type again",
-       "error, review the fields": "error, review the fields rrr",
-       "login plus username": "Usuario: {{username}}",
-       REQUIRED: "Mandatory field"
-     }
-   },
-   es: {
-     translation: {
-       login: "Introduzca credenciales",
-       "Invalid login or password, please type again":
-         "Usuario o clave no validos, porfavor intentelo de nuevo",
-       "error, review the fields": "Error, revise los campos por favor",
-       "login plus username": "Usuario: {{username}}",
-       REQUIRED: "Campo obligatorio"
-     }
-   }
- };

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
+ .use(XHR)
  .init({
-    resources,
    lng: "es",

    keySeparator: false, // we do not use keys in form messages.welcome
+    fallbackLng: 'es' || 'en',
+    load: 'currentOnly',
+    react: {
+      wait: true,
+    },
    interpolation: {
      escapeValue: false // react already safes from xss
    },
+    backend: {
+      loadPath: '/locales/{{lng}}.json',
+    }
  });

export default i18n;
```

> If something break, you can consider adding _debug: true_ to your
> _init_ section.

- Before giving a try let's suspend our react app meanwhile the
  resource json is being loaded and display a _loading..._ message.

_./src/main.tsx_

```diff
+ import { Suspense } from "react";

// (...)

ReactDOM.render(
+  <Suspense fallback={<div>Loading...</div>}>
    <MuiThemeProvider theme={theme}>
      <SessionProvider>
        <HashRouter>
          <Switch>
            <Route exact={true} path="/" component={LoginPage} />
            <Route path="/pageB" component={PageB} />
          </Switch>
        </HashRouter>
      </SessionProvider>
    </MuiThemeProvider>
+  </Suspense>,
  document.getElementById("root")
);
```

- Let's give a try.

```bash
npm start
```