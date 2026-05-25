// providers/ThemeProvider.tsx
"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>(() => {
        // Initialize from localStorage during SSR/hydration if available
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem("theme") as Theme | null;
            if (stored === "light" || stored === "dark") {
                return stored;
            }
        }
        return "light";
    });

    const [mounted, setMounted] = useState(false);

    // Effect 1: Sync theme from DOM on mount only
    useEffect(() => {
        // Read from DOM and localStorage to determine initial theme
        const isDark = document.documentElement.classList.contains("dark");
        const storedTheme = localStorage.getItem("theme") as Theme | null;

        // Use stored theme first, fall back to DOM class
        const initialTheme = storedTheme || (isDark ? "dark" : "light");

        // Batch updates using requestAnimationFrame
        requestAnimationFrame(() => {
            setTheme(initialTheme);
            setMounted(true);
        });
    }, []);

    // Effect 2: Apply theme to DOM when it changes (but only after mount)
    useEffect(() => {
        if (!mounted) return;

        // Update DOM class
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }

        // Update localStorage
        localStorage.setItem("theme", theme);
    }, [theme, mounted]);

    const toggleTheme = useCallback(() => {
        setTheme(prevTheme => prevTheme === "light" ? "dark" : "light");
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, mounted }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useTheme must be used within ThemeProvider");
    return context;
}