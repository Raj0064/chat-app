import * as React from "react";

const ThemeProviderContext = React.createContext(undefined);

const COLOR_SCHEME_QUERY = "(prefers-color-scheme: dark)";

function getSystemTheme() {
  return window.matchMedia(COLOR_SCHEME_QUERY).matches
    ? "dark"
    : "light";
}

function disableTransitionsTemporarily() {
  const style = document.createElement("style");
  style.appendChild(
    document.createTextNode(
      "*,*::before,*::after{transition:none!important}"
    )
  );
  document.head.appendChild(style);

  return () => {
    window.getComputedStyle(document.body);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        style.remove();
      });
    });
  };
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "theme",
  disableTransitionOnChange = true,
}) {
  const [theme, setThemeState] = React.useState(() => {
    return localStorage.getItem(storageKey) || defaultTheme;
  });

  const setTheme = (nextTheme) => {
    localStorage.setItem(storageKey, nextTheme);
    setThemeState(nextTheme);
  };

  const applyTheme = React.useCallback(
    (nextTheme) => {
      const root = document.documentElement;
      const resolvedTheme =
        nextTheme === "system" ? getSystemTheme() : nextTheme;

      const restore = disableTransitionOnChange
        ? disableTransitionsTemporarily()
        : null;

      root.classList.remove("light", "dark");
      root.classList.add(resolvedTheme);

      if (restore) restore();
    },
    [disableTransitionOnChange]
  );

  React.useEffect(() => {
    applyTheme(theme);

    if (theme !== "system") return;

    const mediaQuery = window.matchMedia(COLOR_SCHEME_QUERY);
    const handleChange = () => applyTheme("system");

    mediaQuery.addEventListener("change", handleChange);
    return () =>
      mediaQuery.removeEventListener("change", handleChange);
  }, [theme, applyTheme]);

  const value = { theme, setTheme };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = React.useContext(ThemeProviderContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};