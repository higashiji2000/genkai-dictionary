import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import CssBaseLine from "@mui/material/CssBaseline";

ReactDOM.render(
  <React.StrictMode>
    <CssBaseLine>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CssBaseLine>
  </React.StrictMode>,
  document.getElementById("root")
);
