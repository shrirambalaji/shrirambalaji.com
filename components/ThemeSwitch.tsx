import React, { useState, useEffect, PropsWithChildren } from "react";
import { useTheme } from "next-themes";
import cn from "classnames";
import { DarkMode, LightMode } from "./icons";

export const ThemeSwitch = (
  props: PropsWithChildren<{ className?: string }>
) => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { className } = props;

  useEffect(() => setMounted(true), []);

  const toggleTheme = () => {
    setTheme(theme === "dark" || resolvedTheme === "dark" ? "light" : "dark");
  };

  const isDarkMode = mounted && (theme === "dark" || resolvedTheme === "dark");

  return (
    <span
      role="button"
      aria-label="Toggle Dark Mode"
      className={cn(
        "text-current p-2 cursor-pointer hover:dark:bg-ghostindigo-800 hover:bg-ghostindigo-50 rounded-lg text-center",
        className
      )}
      tabIndex={0}
      onClick={toggleTheme}
      onKeyDown={(e) => {
        if (e.key === "Enter") toggleTheme();
      }}
    >
      {isDarkMode ? <LightMode /> : <DarkMode />}
    </span>
  );
};
