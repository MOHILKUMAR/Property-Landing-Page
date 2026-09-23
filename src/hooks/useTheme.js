import { useEffect, useState } from "react";

// The initial class is set by the inline script in index.html
const getInitialTheme = () =>
  document.documentElement.classList.contains("dark") ? "dark" : "light";

const useTheme = () => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    try {
      localStorage.setItem("theme", theme);
    } catch {
      // Storage can be unavailable (private mode); the theme still applies for this visit
    }
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return { theme, toggleTheme };
};

export default useTheme;
