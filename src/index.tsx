import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import CssBaseLine from "@mui/material/CssBaseline";
import { theme } from "./theme";
import { ThemeProvider } from "@mui/material/styles";

ReactDOM.render(
  <React.StrictMode>
    <CssBaseLine>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </CssBaseLine>
  </React.StrictMode>,
  document.getElementById("root")
);
