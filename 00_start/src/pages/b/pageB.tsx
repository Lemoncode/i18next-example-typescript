import * as React from "react";
import { Link } from "react-router-dom";
import { SessionContext } from "../../common/";

interface Props {}

export const PageB = (props: Props) => {
  const loginContext = React.useContext(SessionContext);
  return (
    <>
      <h2>Hello from page B</h2>
      <br />
      <br />
      <h3>Login: {loginContext.login}</h3>

      <Link to="/">Navigate to Login</Link>
    </>
  );
};
