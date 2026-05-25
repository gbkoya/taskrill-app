"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="min-h-screen w-full flex bg-[#f0f7ff]">
            <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] relative overflow-hidden bg-gradient-to-br from-[#1a7cd4] via-[#1560a8] to-[#0d3d6e] items-center justify-center flex-col gap-6 p-16">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[-80px] left-[-80px] w-[400px] h-[400px] rounded-full bg-white/5" />
                    <div className="absolute bottom-[-60px] right-[-60px] w-[320px] h-[320px] rounded-full bg-white/5" />
                    <div className="absolute top-[40%] left-[60%] w-[180px] h-[180px] rounded-full bg-white/[0.04]" />
                    <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                </div>

                <Link href="/" className="absolute top-8 left-10">
                    <Image
                        src="/images/taskrill-log.png"
                        alt="TaskRill Logo"
                        width={120}
                        height={48}
                        priority
                    />
                </Link>

                <div className="relative z-10 text-center">
                    <div className="w-28 h-28 rounded-3xl bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-8 backdrop-blur-sm">
                        <span className="text-5xl">⚡</span>
                    </div>
                    <h2 className="text-4xl font-bold text-white leading-tight mb-4">
                        Complete tasks.<br />Climb the ranks.
                    </h2>
                    <p className="text-blue-200 text-base leading-relaxed max-w-xs mx-auto">
                        Join thousands already earning rewards and leveling up every day.
                    </p>
                </div>

                <div className="relative z-10 flex gap-3 mt-4">
                    {["/login", "/register"].map((path) => (
                        <div
                            key={path}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${pathname === path ? "bg-white w-6" : "bg-white/30"
                                }`}
                        />
                    ))}
                </div>
            </div>

            <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
                <div className="w-full max-w-[420px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={pathname}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -16 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}