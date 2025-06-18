import React, { useState, useEffect, PropsWithChildren } from "react";
import { useTheme } from "next-themes";
import cn from "classnames";
import { DarkMode, LightMode } from "./icons";

// Cookie utility functions
const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
};

const setCookie = (name: string, value: string, days: number = 365) => {
  if (typeof document === 'undefined') return;
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));

  // Determine domain based on current host
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  const domain = isLocalhost ? '' : ';domain=.shrirambalaji.com';

  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/${domain};SameSite=Lax`;
};

const getStoredTheme = (): string | null => {
  // 1. Check cookie first (for cross-subdomain sharing)
  const cookieTheme = getCookie('theme');
  if (cookieTheme && (cookieTheme === 'light' || cookieTheme === 'dark')) {
    return cookieTheme;
  }

  // 2. Check localStorage (existing preference)
  if (typeof localStorage !== 'undefined') {
    const localTheme = localStorage.getItem('theme');
    if (localTheme && (localTheme === 'light' || localTheme === 'dark')) {
      // Also save to cookie for future cross-subdomain access
      setStoredTheme(localTheme);
      return localTheme;
    }
  }

  return null;
};

const setStoredTheme = (theme: string) => {
  if (!theme || (theme !== 'light' && theme !== 'dark')) return;

  // Save to both storage methods
  setCookie('theme', theme);
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('theme', theme);
  }
};

export const ThemeSwitch = (
  props: PropsWithChildren<{ className?: string }>
) => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { className } = props; useEffect(() => {
    setMounted(true);
  }, []);  // Separate effect to handle theme syncing after mount
  useEffect(() => {
    if (!mounted) return;

    const storedTheme = getStoredTheme();
    if (storedTheme && storedTheme !== resolvedTheme) {
      setTheme(storedTheme);
    }
  }, [mounted, setTheme, resolvedTheme]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" || resolvedTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    // Use abstracted setStoredTheme function
    setStoredTheme(newTheme);
  };

  const isDarkMode = mounted && (theme === "dark" || resolvedTheme === "dark");

  return (
    <li
      aria-label="Toggle Dark Mode"
      className={cn(
        "cursor-pointer rounded-lg p-2 text-center text-current hover:bg-gray-100 hover:dark:bg-ghostindigo-800 mt-1",
        className
      )}
      tabIndex={0}
      onClick={toggleTheme}
      onKeyDown={(e) => {
        if (e.key === "Enter") toggleTheme();
      }}
    >
      <span>
        {isDarkMode ? <LightMode /> : <DarkMode />}
      </span>
    </li>
  );
};
