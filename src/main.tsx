import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "@/provider/ThemeProvider";
import { LoginProvider } from "./provider/LoginProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <LoginProvider>
          <App />
        </LoginProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
