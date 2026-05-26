// components/sections/About2.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MagneticButton } from "../ui/MagneticButton";

const BRAND_BLUE = "#0C84FD";

const STATS = [
    { value: "50k", label: "Waitlist signups" },
    { value: "48hrs", label: "Avg. insight delivery" },
    { value: "94%", label: "Task completion rate" },
];

export function About2() {
    return (
        <section className="relative py-20 md:py-28 lg:py-32 bg-white transition-colors duration-500 overflow-hidden">

            {/* Subtle background glow - light mode only */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute inset-0 transition-opacity duration-500"
                    style={{
                        background: "radial-gradient(ellipse 60% 40% at 80% 20%, rgba(12,132,253,0.04) 0%, transparent 70%)",
                    }}
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 xl:gap-20">

                    {/* Left side - Text Content */}
                    <motion.div
                        className="flex-1 text-center lg:text-left"
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Small "about taskrill" label */}
                        <motion.span
                            className="inline-block text-sm uppercase tracking-[0.2em] font-semibold mb-4"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            About Taskrill
                        </motion.span>

                        {/* Main headline - stacked words */}
                        <h2 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.1] mb-6 text-gray-950 transition-colors duration-300"
                        style={{ color: BRAND_BLUE }}
                        >
                            <span className="block">Not</span>
                            <span className="block">Your</span>
                            <span className="block">Regular</span>
                            <span className="block relative inline-block">
                                Survey App
                                
                            </span>
                        </h2>

                        {/* Store badges */}
                        <motion.div
                            className="flex flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-8 flex-wrap"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                        >
                            <span className="text-sm font-medium text-gray-500">coming soon on</span>
                            <button className="transition-transform hover:scale-105">
                                <Image
                                    src="/images/google-play-badge.png"
                                    alt="Google Play"
                                    width={120}
                                    height={40}
                                    className="h-10 w-auto"
                                />
                            </button>
                            <button className="transition-transform hover:scale-105">
                                <Image
                                    src="/images/app-store-badge.png"
                                    alt="App Store"
                                    width={120}
                                    height={40}
                                    className="h-10 w-auto"
                                />
                            </button>
                        </motion.div>

                        {/* Description text */}
                        <motion.p
                            className="text-base sm:text-lg md:text-xl max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed text-gray-500 transition-colors duration-300"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.45, duration: 0.5 }}
                        >
                            Taskrill turns boring tasks into fast, addictive challenges people actually enjoy.
                        </motion.p>

                        {/* Learn how it works button with rocket */}
                       <motion.button
                                       className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                                       style={{ background: BRAND_BLUE }}
                                       initial={{ opacity: 0, y: 20 }}
                                       whileInView={{ opacity: 1, y: 0 }}
                                       viewport={{ once: true }}
                                       transition={{ delay: 0.4, duration: 0.5 }}
                                       whileHover={{ scale: 1.05 }}
                                       whileTap={{ scale: 0.95 }}
                                     >
                                       Learn how it works
                                       <span className="text-lg">🚀</span>
                                     </motion.button>
                    </motion.div>

                    {/* Right side - Bouncing Image */}
                    <motion.div
                        className="flex-1 flex justify-center"
                        animate={{ y: [0, -20, 0] }}
                        transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <div className="relative w-full max-w-md lg:max-w-lg">
                            <Image
                                src="/images/google-play-badge.svg"
                                alt="Taskrill app interface"
                                width={1800}
                                height={1800}
                                className="w-fullh-auto object-contain"
                                priority
                            />
                            {/* Glow behind image - light mode only */}
                            <div
                                className="absolute inset-0 rounded-full blur-3xl opacity-20 pointer-events-none"
                                style={{
                                    background: `radial-gradient(ellipse at center, ${BRAND_BLUE} 0%, transparent 70%)`,
                                    transform: "scale(0.9)",
                                }}
                            />
                        </div>
                    </motion.div>
                </div>
                <motion.div
                    className="mt-20 max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    <div className="grid grid-cols-3 gap-8 border-t border-gray-100 pt-10 transition-colors duration-300">
                        {STATS.map((s, i) => (
                            <motion.div
                                key={s.label}
                                className="text-center"
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                            >
                                <div
                                    className="text-3xl md:text-4xl font-black font-display"
                                    style={{ color: BRAND_BLUE }}
                                >
                                    {s.value}
                                </div>
                                <div className="text-sm text-gray-400 mt-1 transition-colors duration-300">
                                    {s.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}