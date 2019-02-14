# Namespaces

From the offical [docs](https://www.i18next.com/principles/namespaces): Namespaces are a feature in i18next internationalization framework which allows you to separate translations that get loaded into multiple files.

While in a smaller project it might be reasonable to just put everything in one file you might get at a point where you want to break translations into multiple files. Reasons might be:
You start losing the overview having more than 300 segments in a file
Not every translation needs to be loaded on the first page, speed up load time

In this case we are going to use namespaces to encasupalte all the validation
messages.

# Steps

- Let's take as starting point sample 02 namespaces

```
npm install
```

- Let's refactor locales folder:

  - Create a subfolder called _en_ move _en.json_ into that folder,
    and rename it to _translation.json_.
  - Create a subfolder called _es_ move _es.json_ into that folder
    and rename it to _translation.json_.

- Now let's create a file called _val.json_ (we will place it under the
  _en_ subfolder that we have just created)

_./src/locales/en/val.json_

```json
{
  "REQUIRED": "Mandatory field"
}
```

- And a file called _val.json_ (we will place it under the
  _es_ subfolder that we have just created)

_./src/locales/es/val.json_

```json
{
  "REQUIRED": "Campo obligatorio"
}
```

- And let's remove these entries form the _translation.json_
  files.

_./src/locales/es/translation.json_

```diff
{
  "login": "Login",
  "Invalid login or password, please type again": "Invalid login or password, please type again",
  "error, review the fields": "error, review the fields rrr",
-  "login plus username": "Usuario: {{username}}",
+ "login plus username": "Usuario: {{username}}"
-  "REQUIRED": "Mandatory field"
}
```

_./src/locales/en/translation.json_

```diff
{
  "login": "Introduzca credenciales",
  "Invalid login or password, please type again": "Usuario o clave no validos, porfavor intentelo de nuevo",
  "error, review the fields": "Error, revise los campos por favor",
-  "login plus username": "Usuario: {{username}}",
+ "login plus username": "Usuario: {{username}}"
-  "REQUIRED": "Campo obligatorio"
}
```

- Now let's jump into the _i18n_ configuration file and

- Add the new space:

_./src/i18n.ts_

```diff
  .init({
    lng: "es",
+    ns: ["val"],
    keySeparator: false, // we do not use keys in form messages.welcome
```

- Update the loadpath

_./src/i18n.ts_

```diff
    backend: {
-      loadPath: '/locales/{{lng}}.json',
+      loadPath: '/locales/{{lng}}/{{ns}}.json',
    }
```

- And let's add the namespace preffix to the entries that we want
  to translate.

_./src/pages/login/loginForm.tsx_

```diff
      <TextFieldForm
        label="Name"
        name="login"
        value={loginInfo.login}
        onChange={onUpdateField}
        error={
-          loginFormErrors.login.succeeded ? "" : t(loginFormErrors.login.type)
+          loginFormErrors.login.succeeded ? "" : t(`val:${loginFormErrors.login.type}`)

        }
      />
      <TextFieldForm
        label="Password"
        name="password"
        value={loginInfo.password}
        onChange={onUpdateField}
        error={
          loginFormErrors.password.succeeded
            ? ""
-            : t(loginFormErrors.password.type)
+            : t(`val:${loginFormErrors.password.type}`)

        }
      />
```

- Let's give a try:

```bash
npm start
```

# Other resources

Official docs: https://www.i18next.com/principles/namespaces
