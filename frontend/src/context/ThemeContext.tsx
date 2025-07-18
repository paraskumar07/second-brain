// // ThemeContext.tsx
// import { createContext, useState, useEffect} from "react";
// import type { ReactNode } from "react";


// interface ThemeContextType {
//   theme: "light" | "dark";
//   toggleTheme: () => void;
// }

// export const ThemeContext = createContext<ThemeContextType | null>(null);

// export const ThemeProvider = ({ children }: { children: ReactNode }) => {
//   const [theme, setTheme] = useState<"light" | "dark">(() => {
//     return (localStorage.getItem("theme") as "light" | "dark") || "light";
//   });

//   useEffect(() => {
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   const toggleTheme = () => {
//     setTheme(prev => (prev === "light" ? "dark" : "light"));
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       <div className={theme}>{children}</div>
//     </ThemeContext.Provider>
//   );
// };


// ThemeContext.tsx
import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
