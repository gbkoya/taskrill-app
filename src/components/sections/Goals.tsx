// components/sections/Goals.tsx
"use client";

import { motion } from "framer-motion";
import { FadeUp } from "../ui/FadeUp";

const BRAND_BLUE = "#0C84FD";
const BRAND_YELLOW = "#FED403";

const goals = [
    "Build a highly engaging, competitive platform that keeps users actively participating.",
    "Provide businesses with accurate, real-time, and actionable consumer insights.",
    "Continuously innovate through game mechanics, data analytics, and UX improvements.",
    "Expand partnerships with brands and enterprises across multiple industries.",
    "Scale globally while maintaining strong community trust and satisfaction.",
    "Establish Taskrill as a trusted engagement engine powered by data and user behavior.",
];

export function Goals() {
    return (
        <section className="py-24 px-6 md:px-16" id="goals">
            <div className="max-w-3xl mx-auto">
                <FadeUp className="text-center mb-16">
                    <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: BRAND_BLUE }}>Our Goals</span>
                    <h2 className="font-display text-4xl md:text-5xl font-black mt-4 text-gray-900">
                        Where We&apos;re <span style={{ color: BRAND_YELLOW }}>Headed</span>
                    </h2>
                </FadeUp>
                <div className="space-y-4">
                    {goals.map((goal, i) => (
                        <FadeUp key={i} delay={i * 0.07}>
                            <motion.div
                                className="flex items-start gap-4 p-5 rounded-2xl group cursor-default"
                                style={{
                                    background: "rgba(12,132,253,0.04)",
                                    border: "1px solid rgba(12,132,253,0.1)"
                                }}
                                whileHover={{
                                    x: 6,
                                    borderColor: BRAND_BLUE,
                                    background: "rgba(12,132,253,0.09)"
                                }}
                                transition={{ duration: 0.2 }}
                            >
                                <motion.div
                                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-black mt-0.5"
                                    style={{ background: BRAND_YELLOW }}
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    {i + 1}
                                </motion.div>
                                <p className="text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors">
                                    {goal}
                                </p>
                            </motion.div>
                        </FadeUp>
                    ))}
                </div>
            </div>
        </section>
    );
}