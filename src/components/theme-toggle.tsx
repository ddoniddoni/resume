"use client";

import { useTheme } from "next-themes";

import styles from "./theme-toggle.module.css";

type Theme = "light" | "dark";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  function handleToggle() {
    const currentTheme: Theme = resolvedTheme === "dark" ? "dark" : "light";
    setTheme(currentTheme === "light" ? "dark" : "light");
  }

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={handleToggle}
      aria-label="Toggle color theme"
    >
      <span className={`${styles.icon} ${styles.sun}`} aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2.5v2.4" />
          <path d="M12 19.1v2.4" />
          <path d="M21.5 12h-2.4" />
          <path d="M4.9 12H2.5" />
          <path d="M18.7 5.3l-1.7 1.7" />
          <path d="M7 17l-1.7 1.7" />
          <path d="M18.7 18.7L17 17" />
          <path d="M7 7L5.3 5.3" />
        </svg>
      </span>
      <span className={`${styles.icon} ${styles.moon}`} aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M14.6 2.8a.8.8 0 0 0-.9.9 8.1 8.1 0 0 1-10 10 .8.8 0 0 0-.9.9 10.2 10.2 0 1 0 11.8-12.7Z" />
        </svg>
      </span>
    </button>
  );
}
