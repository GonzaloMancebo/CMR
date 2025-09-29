import { createContext } from "react";

type Theme = "dark" | "light" | "system";

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: "system",
  setTheme: () => null,
});
