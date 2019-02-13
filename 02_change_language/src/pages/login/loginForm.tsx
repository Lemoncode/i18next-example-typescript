import * as React from "react";
import { useTranslation } from "react-i18next";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { LoginEntity } from "../../model/login";
import { LoginFormErrors } from "./viewmodel";
import { TextFieldForm } from "../../common/forms/textFieldForm";

interface Props {
  onLogin: () => void;
  onUpdateField: (string, any) => void;
  loginInfo: LoginEntity;
  loginFormErrors: LoginFormErrors;
}

export const LoginForm = (props: Props) => {
  const { t, i18n } = useTranslation();
  const { onLogin, onUpdateField, loginInfo, loginFormErrors } = props;

  const onTexFieldChange = fieldId => e => {
    onUpdateField(fieldId, e.target.value);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }}
    >
      <TextFieldForm
        label="Name"
        name="login"
        value={loginInfo.login}
        onChange={onUpdateField}
        error={
          loginFormErrors.login.succeeded ? "" : t(loginFormErrors.login.type)
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
            : t(loginFormErrors.password.type)
        }
      />
      <Button variant="contained" color="primary" onClick={onLogin}>
        Login
      </Button>
    </div>
  );
};
