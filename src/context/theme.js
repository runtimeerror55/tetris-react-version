import { createContext, Context, useState } from "react";
export const themeContext = createContext("red");

export const ThemeProvider = ({ children }) => {
      const [theme, setTheme] = useState("theme-4");

      return (
            <themeContext.Provider value={{ theme, setTheme }}>
                  {children}
            </themeContext.Provider>
      );
};
