# Change Language


# Steps

- Let's taking as starting point sample 01

```
npm install
```

- Let's add a helper mehtod to update the language on _loginPage_

_./src/pages/login/loginPage.tsx_

```diff
const LoginPageInner = (props: Props) => {
  const { t, i18n } = useTranslation();
+   const changeLanguage = (language : string) => i18n.changeLanguage(language);


  const { loginInfo, setLoginInfo } = useLogin();
```

- Let's add links to change the language:

```diff
  return (
    <>
+      <Button onClick={e => changeLanguage("en")}>English</Button>
+      <Button onClick={e => changeLanguage("es")}>Spanish</Button>
      <Card className={classes.card}>
```

- That's that now we can run the sample and change the language on the fly.