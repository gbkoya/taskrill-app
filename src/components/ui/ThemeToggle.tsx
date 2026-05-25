// components/ui/ThemeToggle.tsx
"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/src/providers/ThemeProvider";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
    const { theme, toggleTheme, mounted } = useTheme();
    const isDark = theme === "dark";

    // Prevent hydration mismatch by rendering a placeholder
    if (!mounted) {
        return (
            <div className="w-14 h-7 rounded-full border border-gray-300 dark:border-gray-700 flex-shrink-0 bg-gray-100 dark:bg-gray-800" />
        );
    }

    return (
        <motion.button
            onClick={toggleTheme}
            className={`relative w-14 h-7 rounded-full border flex items-center ${isDark ? "justify-end" : "justify-start"
                } border-gray-300 dark:border-gray-700 px-[2px]`}
            style={{
                background: isDark ? "#1e293b" : "#f1f5f9",
            }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        >
            <motion.div
                layout
                className="w-6 h-6 rounded-full shadow-md flex items-center justify-center"
                style={{ background: isDark ? "#334155" : "#ffffff" }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
                {isDark ? (
                    <Moon className="w-4 h-4 text-blue-400" />
                ) : (
                    <Sun className="w-4 h-4 text-yellow-500" />
                )}
            </motion.div>
        </motion.button>
    );
}