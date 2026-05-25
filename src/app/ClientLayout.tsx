// app/ClientLayout.tsx
"use client";

import { ThemeProvider } from "@/src/providers/ThemeProvider";

export function ClientLayout({ children }: { children: React.ReactNode }) {
    return <ThemeProvider>{children}</ThemeProvider>;
}