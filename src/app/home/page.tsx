// app/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../store/authStore";
import { Navbar } from "@/src/components/layout/Navbar";
import { MobileMenu } from "@/src/components/layout/MobileMenu";
import { Footer } from "@/src/components/layout/Footer";
import { Hero } from "@/src/components/sections/Hero";
import { About } from "@/src/components/sections/About";
import { Features } from "@/src/components/sections/Features";
import { MissionVision } from "@/src/components/sections/MissionVision";
import { Goals } from "@/src/components/sections/Goals";
import { CTA } from "@/src/components/sections/CTA";
// Remove ThemeProvider import
import { About2 } from "@/src/components/sections/About2";

export default function Home() {
    const [menuOpen, setMenuOpen] = useState(false);
    const router = useRouter();
    const { isAuthenticated, isLoading } = useAuthStore();

    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            router.replace("/dashboard");
        }
    }, [isAuthenticated, isLoading, router]);

    // Show loading state while checking authentication
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    // If authenticated, don't render the home page (will redirect)
    if (isAuthenticated) {
        return null;
    }

    return (
        // Remove ThemeProvider wrapper
        <div className="min-h-screen overflow-x-hidden bg-white text-gray-900">
            <style jsx global>{`
                .font-display { 
                    font-family: var(--font-montserrat) !important; 
                }
                
                ::-webkit-scrollbar { width: 4px; }
                ::-webkit-scrollbar-track { background: #f3f4f6; }
                ::-webkit-scrollbar-thumb { background: #0C84FD; border-radius: 4px; }
            `}</style>

            <Navbar onMenuClick={() => setMenuOpen(!menuOpen)} />
            <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

            <Hero />
            <About2 />
            
            <Features />
            <MissionVision />
            <About />
            <CTA />
            <Footer />
        </div>
    );
}