import { createContext, useContext, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const ThemeContext = createContext();

function ThemeContextProvider({ children }) {
  const [theme, setTheme] = useLocalStorage("app-theme", null);

  function handleThemeSwitch() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  // Display user prefer theme. "For first time using the app, those who did NOT set a theme yet."
  useEffect(() => {
    if (!theme) {
      if (window.matchMedia("prefers-color-scheme: dark").matches) {
        setTheme("dark");
      } else {
        setTheme("light");
      }
    }
  }, [theme, setTheme]);

  // Add dark theme with tailwind
  useEffect(() => {
    theme === "dark"
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, handleThemeSwitch }}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const contextValue = useContext(ThemeContext);
  if (contextValue === undefined) {
    throw new Error("Theme context was used outside it's provider");
  }
  return contextValue;
}

export { useTheme, ThemeContextProvider };
