// components/sections/CTA.tsx
"use client";

import { motion } from "framer-motion";
import { MagneticButton } from "../ui/MagneticButton";
import { FadeUp } from "../ui/FadeUp";
import { TbDeviceMobile, TbBuildingStore } from "react-icons/tb";
import Image from "next/image";

const BRAND_BLUE = "#0C84FD";
const BRAND_YELLOW = "#FED403";

export function CTA() {
    return (
        <section className="py-32 px-6 md:px-16 relative overflow-hidden bg-white transition-colors duration-300">
            {/* Background glows */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ background: `radial-gradient(ellipse 60% 50% at 50% 60%, rgba(12,132,253,0.08) 0%, transparent 70%)` }}
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ background: `radial-gradient(ellipse 40% 35% at 50% 55%, rgba(254,212,3,0.05) 0%, transparent 70%)` }}
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ duration: 10, repeat: Infinity, delay: 2 }}
            />

            {/* Grid lines */}
            <div
                className="absolute inset-0 pointer-events-none opacity-40"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(12,132,253,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(12,132,253,0.04) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />

            <div className="relative max-w-3xl mx-auto text-center">
                <FadeUp>
                    {/* Badge */}
                    <div
                        className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full text-xs font-bold tracking-[0.15em] uppercase border"
                        style={{
                            background: "rgba(12,132,253,0.08)",
                            borderColor: "rgba(12,132,253,0.2)",
                            color: BRAND_BLUE,
                        }}
                    >
                        <motion.span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ background: BRAND_YELLOW }}
                            animate={{ scale: [1, 1.6, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        Beta Launching Soon
                    </div>

                    <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-black mb-6 text-gray-950 leading-[1.05] transition-colors duration-300">
                        <span className="inline-flex items-center gap-4">
                            <Image
                                src="/images/bots.png"
                                alt="Bot"
                                width={64}
                                height={64}
                                className="w-12 h-12 md:w-20 md:h-20"
                            />
                            <span style={{ color: BRAND_BLUE }}>Ready to</span>
                        </span>
                        <br />
                        <span
                            style={{
                                background: "linear-gradient(135deg, #052647 0%, #9136E9 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                                color: "transparent"
                            }}
                        >
                            Play & Earn?
                        </span>
                    </h2>

                    <p className="text-gray-500 text-lg mb-10 max-w-xl mx-auto leading-relaxed transition-colors duration-300">
                        Join thousands of users already completing tasks, earning rewards, and helping brands get the insights they need.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        {/* <MagneticButton
                            className="inline-flex items-center justify-center gap-2.5 px-10 py-4 rounded-lg text-base font-bold text-white blue-glow transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
                            style={{ background: BRAND_BLUE }}
                        >
                            <span className="inline-flex items-center gap-2">
                                Join Waitlist
                                <Image
                                    src="/images/google.png"
                                    alt="Google"
                                    width={20}
                                    height={20}
                                    className="w-5 h-5"
                                />
                            </span>
                        </MagneticButton> */}

                        <MagneticButton
                            className="inline-flex items-center justify-center gap-2.5 px-10 py-4 rounded-lg text-base font-semibold transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] text-gray-700 border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300"
                        >
                            Partner with Us →
                        </MagneticButton>
                    </div>

                    {/* Trust note */}
                    <p className="mt-8 text-xs text-gray-400 transition-colors duration-300">
                        No credit card required · Free to join · Cancel anytime
                    </p>
                </FadeUp>
            </div>
        </section>
    );
}