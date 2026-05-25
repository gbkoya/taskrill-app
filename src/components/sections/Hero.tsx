// components/sections/Hero.tsx
"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { MagneticButton } from "../ui/MagneticButton";
import { Particle } from "../ui/Particle";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

const BRAND_BLUE = "#0C84FD";
const BRAND_YELLOW = "#FED403";

const HERO_IMAGES = [
    { src: "/images/hero1.png", alt: "Market research dashboard" },
    { src: "/images/hpage2.png", alt: "User rewards interface" },
    { src: "/images/hpag3.png", alt: "Gamified survey experience" },
    { src: "/images/hpage2.png", alt: "Analytics visualization" },
];

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    delay: i * 0.4,
    x: `${Math.random() * 100}%`,
    y: `${Math.random() * 100}%`,
    size: 4 + Math.random() * 10,
    duration: 4 + Math.random() * 3,
}));

// ImageSlider component
function ImageSlider({
    className = "",
    currentImageIndex,
    setCurrentImageIndex
}: {
    className?: string;
    currentImageIndex: number;
    setCurrentImageIndex: (index: number) => void;
}) {
    return (
        <div className={`relative w-full max-w-[600px] mx-auto ${className}`}>
            {/* Glow halo */}
            <div
                className="absolute inset-0 rounded-3xl blur-3xl opacity-20 pointer-events-none"
                style={{
                    background: `radial-gradient(ellipse at center, ${BRAND_BLUE} 0%, transparent 70%)`,
                    transform: "scale(0.85) translateY(8%)",
                }}
            />

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentImageIndex}
                    className="relative w-full"
                    initial={{ x: "30%", rotate: 8, opacity: 0, scale: 0.8 }}
                    animate={{ x: 0, rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ x: "-30%", rotate: -8, opacity: 0, scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 80, damping: 18, mass: 0.8 }}
                >
                    <div className="relative">
                        <Image
                            src={HERO_IMAGES[currentImageIndex].src}
                            alt={HERO_IMAGES[currentImageIndex].alt}
                            width={600}
                            height={400}
                            className="w-full h-auto object-contain"
                            priority={currentImageIndex === 0}
                        />
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Dot indicators */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-2 items-center">
                {HERO_IMAGES.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentImageIndex(i)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${i === currentImageIndex
                            ? "w-8 bg-[#0C84FD]"
                            : "w-2 bg-gray-300 hover:bg-gray-400"
                            }`}
                        aria-label={`Go to image ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}

export function Hero() {
    const { scrollY } = useScroll();
    const heroY = useTransform(scrollY, [0, 600], [0, -150]);
    const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-white transition-colors duration-500">

            {/* ── Backgrounds ── */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Light mode ambient */}
                <div
                    className="absolute inset-0 transition-opacity duration-500"
                    style={{
                        background:
                            "radial-gradient(ellipse 70% 55% at 70% 10%, rgba(12,132,253,0.08) 0%, transparent 70%), " +
                            "radial-gradient(ellipse 40% 40% at 15% 75%, rgba(254,212,3,0.06) 0%, transparent 70%)",
                    }}
                />

                <motion.div
                    className="absolute rounded-full"
                    style={{
                        width: 600, height: 600, left: "55%", top: "10%",
                        background: `radial-gradient(circle, rgba(12,132,253,0.14) 0%, transparent 70%)`,
                        filter: "blur(70px)",
                    }}
                    animate={{ scale: [1, 1.15, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute rounded-full"
                    style={{
                        width: 320, height: 320, left: "8%", top: "58%",
                        background: `radial-gradient(circle, rgba(254,212,3,0.10) 0%, transparent 70%)`,
                        filter: "blur(55px)",
                    }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                />

                {PARTICLES.map((p) => (
                    <Particle key={p.id} delay={p.delay} x={p.x} y={p.y} size={p.size} duration={p.duration} />
                ))}
            </div>

            {/* Grid lines */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(12,132,253,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(12,132,253,0.04) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />

            {/* ── Content ── */}
            <div className="relative z-10 w-full mx-auto px-4 sm:px-6 lg:px-12">
                <div className="flex flex-col items-center gap-8 lg:gap-12">

                    {/* Image Slider - TOP on all devices */}
                    <motion.div
                        className="w-full flex justify-center"
                        style={{ y: heroY, opacity: heroOpacity }}
                    >
                        <ImageSlider
                            currentImageIndex={currentImageIndex}
                            setCurrentImageIndex={setCurrentImageIndex}
                        />
                    </motion.div>

                    {/* Text Content */}
                    <motion.div
                        className="w-full max-w-4xl mx-auto text-center"
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Beta badge */}
                        <motion.div
                            className="inline-flex items-center gap-2 mb-6 sm:mb-8 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mx-auto border"
                            style={{
                                background: "rgba(12,132,253,0.08)",
                                borderColor: "rgba(12,132,253,0.25)",
                                color: BRAND_BLUE,
                            }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <motion.span
                                className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full flex-shrink-0 bg-[#D61919]"
                                animate={{ scale: [1, 1.5, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            />
                            <span className="whitespace-nowrap">Now in Beta — Join Waitlist</span>
                        </motion.div>

                        {/* Headline: Play Compete Earn */}
                        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.1] mb-4 sm:mb-6 text-gray-950 transition-colors duration-300">
                            <span className="text-[#0C84FD]">Play <span>Compete</span></span>{" "}
                            {" "}
                            <span className="relative inline-block">
                                <span
                                    style={{
                                        background: "linear-gradient(135deg, #052647 0%, #9136E9 100%)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        backgroundClip: "text",
                                        color: "transparent"
                                    }}
                                >
                                    Earn
                                </span>
                            </span>
                        </h1>

                        {/* Sub-copy */}
                        <motion.p
                            className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed px-4 sm:px-0 text-gray-500 transition-colors duration-300"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
                        >
                            The first social micro-task platform where challenges, games, and rewards collide. Climb the leaderboard, Complete missions, Earn tokens, Beat your friends.
                        </motion.p>

                        {/* CTAs - Play Online & Download Mobile */}
                        <motion.div
                            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.8 }}
                        >
                            <MagneticButton
                                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-sm sm:text-base font-bold text-white blue-glow transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                                style={{ background: BRAND_BLUE }}
                            >
                                <Link href="/register" >
                                    <span className="inline-flex items-center gap-2">
                                        Play Online →
                                    </span>
                                </Link>
                            </MagneticButton>

                            <MagneticButton
                                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-sm sm:text-base font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] text-gray-700 border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300"
                            >
                                <span className="inline-flex items-center gap-2">
                                    Download Mobile 📱
                                </span>
                            </MagneticButton>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll cue */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
            >
                <motion.div
                    className="w-px h-12 rounded-full"
                    style={{ background: `linear-gradient(to bottom, transparent, ${BRAND_BLUE})` }}
                    animate={{ scaleY: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                />
                <span className="text-xs tracking-widest text-gray-400 transition-colors duration-300">
                    SCROLL
                </span>
            </motion.div>
        </section>
    );
}