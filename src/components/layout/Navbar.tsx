// components/layout/Navbar.tsx
"use client";

import { motion } from "framer-motion";
import { MagneticButton } from "../ui/MagneticButton";
// Remove ThemeToggle import
import Image from "next/image";
import { TbMenu2 } from "react-icons/tb";

const BRAND_BLUE = "#0C84FD";

const NAV_LINKS = ["About", "Features", "Mission"];

export function Navbar({ onMenuClick }: { onMenuClick: () => void }) {
    return (
        <motion.nav
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-16 py-4 bg-white/90 border-b border-gray-100 transition-colors duration-300"
            style={{ backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
            {/* Logo */}
            <Image
                src="/images/taskrill-logo.png"
                alt="Taskrill"
                width={120}
                height={30}
                priority
            />

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500 transition-colors duration-300">
                {NAV_LINKS.map((item) => (
                    <motion.a
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        className="relative hover:text-gray-900 transition-colors duration-200 group"
                        whileHover={{ y: -1 }}
                    >
                        {item}
                        <span
                            className="absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full transition-all duration-300 rounded-full"
                            style={{ background: BRAND_BLUE }}
                        />
                    </motion.a>
                ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
                {/* Remove ThemeToggle component */}

                <MagneticButton
                    className="hidden md:block px-6 py-2 rounded-lg text-sm text-white blue-glow transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
                    style={{ background: BRAND_BLUE }}
                >
                    Get Early Access
                </MagneticButton>

                {/* Mobile hamburger */}
                <button
                    className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl text-gray-700 border border-gray-100 bg-white hover:border-gray-200 transition-all duration-200 ml-1"
                    onClick={onMenuClick}
                    aria-label="Open menu"
                >
                    <TbMenu2 className="w-5 h-5" />
                </button>
            </div>
        </motion.nav>
    );
}