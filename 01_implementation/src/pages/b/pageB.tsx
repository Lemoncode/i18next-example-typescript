import * as React from "react"
import { Link } from 'react-router-dom';
import { SessionContext, withSessionContext } from '../../common/'
import { useTranslation } from 'react-i18next';

interface Props {
  login : string;
}

const PageBInner = (props : Props) => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <h2>Hello from page B</h2>
      <br />
      <br />
      <h3>{t("login plus username", {username: props.login})}</h3>

      <Link to="/">Navigate to Login</Link>
    </>
  )
}

export const PageB = withSessionContext(PageBInner);