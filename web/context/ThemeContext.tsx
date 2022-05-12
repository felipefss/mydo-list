import { createContext, useEffect, useState } from "react";

interface IContext {
  theme: string;
  toggleDarkMode: (isDark: boolean) => void;
}

export const ThemeContext = createContext({} as IContext);

export const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState("light");

  // Get current theme from local storage
  useEffect(() => {
    localStorage.theme && setTheme(localStorage.theme);
  }, []);

  useEffect(() => {
    if (theme == 'dark') {
      document.body.className = 'dark-mode';
    } else {
      document.body.className = '';
    }


    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleDarkMode = (isDark: boolean) => {
    setTheme(isDark ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{
      theme,
      toggleDarkMode
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
