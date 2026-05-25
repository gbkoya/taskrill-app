// components/layout/MobileMenu.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { TbX } from "react-icons/tb";

const BRAND_BLUE = "#0C84FD";
const BRAND_YELLOW = "#FED403";

const NAV_LINKS = ["About", "Features", "Mission", "Goals"];

export function MobileMenu({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-40 flex flex-col bg-white transition-colors duration-300"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                    {/* Top bar */}
                    <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 transition-colors duration-300">
                        <span
                            className="text-xs font-bold tracking-[0.2em] uppercase"
                            style={{ color: BRAND_BLUE }}
                        >
                            Menu
                        </span>
                        <button
                            onClick={onClose}
                            className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-600 border border-gray-100 bg-gray-50 hover:border-gray-200 transition-all duration-200"
                            aria-label="Close menu"
                        >
                            <TbX className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Nav links */}
                    <nav className="flex-1 flex flex-col justify-center px-6 gap-2">
                        {NAV_LINKS.map((item, i) => (
                            <motion.a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                onClick={onClose}
                                className="flex items-center justify-between px-5 py-4 rounded-2xl text-xl font-black font-display text-gray-900 border border-transparent hover:border-gray-100 hover:bg-gray-50 transition-all duration-200 group"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.05 + i * 0.07, duration: 0.35 }}
                            >
                                {item}
                                <span
                                    className="text-sm font-normal opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                    style={{ color: BRAND_BLUE }}
                                >
                                    ↗
                                </span>
                            </motion.a>
                        ))}
                    </nav>

                    {/* Bottom CTA */}
                    <div className="px-6 pb-10 pt-4 border-t border-gray-100 transition-colors duration-300">
                        <motion.a
                            href="#"
                            onClick={onClose}
                            aria-label="Join waitlist"
                            className="flex items-center justify-center gap-3 w-full py-3 rounded-2xl font-semibold text-sm text-white shadow-[0_10px_30px_rgba(12,132,253,0.12)] transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                            style={{ background: `linear-gradient(90deg, ${BRAND_BLUE} 0%, ${BRAND_BLUE} 100%)` }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.35 }}
                        >
                            <span className="text-lg">🎮</span>
                            <span>Join Waitlist</span>
                        </motion.a>
                        <p className="text-center text-xs text-gray-400 mt-3 transition-colors duration-300">
                            Free to join · No credit card required
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}