// components/sections/MissionVision.tsx
"use client";

import { motion } from "framer-motion";
import { FadeUp } from "../ui/FadeUp";
import { TbRocket, TbWorld } from "react-icons/tb";

const BRAND_BLUE = "#0C84FD";
const BRAND_YELLOW = "#FED403";

export function MissionVision() {
    return (
        <section
            className="py-24 px-6 md:px-16 max-w-7xl mx-auto bg-white transition-colors duration-300"
            id="mission"
        >
            <div className="mx-auto">
                {/* Section label */}
                <FadeUp className="text-center mb-12 ">
                    <span
                        className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase mb-4"
                        style={{ color: BRAND_BLUE }}
                    >
                        <span className="w-4 h-px inline-block" style={{ background: BRAND_BLUE }} />
                        Mission & Vision
                        <span className="w-4 h-px inline-block" style={{ background: BRAND_BLUE }} />
                    </span>
                    <h2 className="font-display text-4xl md:text-5xl font-black text-gray-950 transition-colors duration-300">
                        <span style={{ color: BRAND_BLUE }}> Why We Exist</span>
                    </h2>
                </FadeUp>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Mission Card */}
                    <FadeUp delay={0.15}>
                        <div className="group relative rounded-3xl p-8 h-full overflow-hidden bg-white border border-gray-100 shadow-sm transition-colors duration-300 hover:border-gray-200">
                            {/* Animated glow blob */}
                            <motion.div
                                className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl pointer-events-none"
                                style={{ background: "rgba(12,132,253,0.12)" }}
                                animate={{ scale: [1, 1.25, 1] }}
                                transition={{ duration: 6, repeat: Infinity }}
                            />
                            {/* Bottom sweep on hover */}
                            <div
                                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                style={{ background: "linear-gradient(135deg, rgba(12,132,253,0.04) 0%, transparent 60%)" }}
                            />

                            <div className="relative z-10">
                                {/* Icon badge */}
                                <div
                                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                                    style={{
                                        background: "rgba(12,132,253,0.1)",
                                        border: "1px solid rgba(12,132,253,0.25)",
                                    }}
                                >
                                    <TbRocket className="w-7 h-7" style={{ color: BRAND_BLUE }} />
                                </div>

                                <span
                                    className="text-xs font-bold tracking-[0.15em] uppercase"
                                    style={{ color: BRAND_BLUE }}
                                >
                                    Our Mission
                                </span>
                                <h3 className="font-display text-2xl md:text-3xl font-black mt-2 mb-4 text-gray-950 transition-colors duration-300">
                                    Revolutionize Research
                                </h3>
                                <p className="text-gray-500 leading-relaxed transition-colors duration-300">
                                    To make market research more engaging, accessible, and rewarding — empowering businesses with authentic insights while creating meaningful earning opportunities for users.
                                </p>

                                {/* Bottom rule */}
                                <div
                                    className="mt-8 h-0.5 w-12 rounded-full transition-all duration-500 group-hover:w-24"
                                    style={{ background: BRAND_BLUE }}
                                />
                            </div>
                        </div>
                    </FadeUp>

                    {/* Vision Card */}
                    <FadeUp delay={0.3}>
                        <div className="group relative rounded-3xl p-8 h-full overflow-hidden bg-white border border-gray-100 shadow-sm transition-colors duration-300 hover:border-gray-200">
                            {/* Animated glow blob */}
                            <motion.div
                                className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl pointer-events-none"
                                style={{ background: "rgba(254,212,3,0.12)" }}
                                animate={{ scale: [1, 1.25, 1] }}
                                transition={{ duration: 6, repeat: Infinity, delay: 1 }}
                            />
                            {/* Bottom sweep on hover */}
                            <div
                                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                style={{ background: "linear-gradient(135deg, rgba(254,212,3,0.04) 0%, transparent 60%)" }}
                            />

                            <div className="relative z-10">
                                {/* Icon badge */}
                                <div
                                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                                    style={{
                                        background: "rgba(254,212,3,0.1)",
                                        border: "1px solid rgba(254,212,3,0.25)",
                                    }}
                                >
                                    <TbWorld className="w-7 h-7" style={{ color: BRAND_YELLOW }} />
                                </div>

                                <span
                                    className="text-xs font-bold tracking-[0.15em] uppercase"
                                    style={{ color: BRAND_YELLOW }}
                                >
                                    Our Vision
                                </span>
                                <h3 className="font-display text-2xl md:text-3xl font-black mt-2 mb-4 text-gray-950 transition-colors duration-300">
                                    Lead the Intersection
                                </h3>
                                <p className="text-gray-500 leading-relaxed transition-colors duration-300">
                                    To become the leading global platform where gaming meets data intelligence, driven by behavioral insights and designed to deliver impactful engagement experiences.
                                </p>

                                {/* Bottom rule */}
                                <div
                                    className="mt-8 h-0.5 w-12 rounded-full transition-all duration-500 group-hover:w-24"
                                    style={{ background: BRAND_YELLOW }}
                                />
                            </div>
                        </div>
                    </FadeUp>
                </div>
            </div>
        </section>
    );
}