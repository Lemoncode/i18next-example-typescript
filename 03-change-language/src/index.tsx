import React from "react";
import ReactDOM from "react-dom";
import { App } from "./app";
import "./i18n/i18n";

ReactDOM.render(
  <React.Suspense fallback={<>Loading...</>}>
    <App />
  </React.Suspense>,
  document.getElementById("root")
);
