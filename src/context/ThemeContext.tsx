import React, { createContext, useContext, useState, useEffect } from "react";

export type ThemeType = 'dark' | 'light';

export const ThemeContext = createContext<{
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  toggleTheme: () => void;
}>({ 
  theme: 'dark', 
  setTheme: () => {},
  toggleTheme: () => {}
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<ThemeType>(() => {
    // Check localStorage first, then system preference, default to dark
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme') as ThemeType | null;
      if (stored === 'dark' || stored === 'light') {
        return stored;
      }
      // Check system preference
      if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
      }
    }
    return 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  return useContext(ThemeContext);
}

