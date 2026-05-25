"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function SplashScreen() {
    return (
        <main className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-[#c8e9f8] via-[#e8f6fd] to-[#f5fbff] px-8">
            <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5, type: "spring", bounce: 0.45 }}
            >
                <Image
                    src="/images/hero1.png"
                    alt=""
                    width={200}
                    height={160}
                    priority
                />
            </motion.div>

            <motion.h1
                className="text-5xl font-extrabold italic tracking-tight text-[#1a6db5] mt-3"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75, duration: 0.45, ease: "easeOut" }}
            >
                <Image
                    src="/images/taskrill-log.png"
                    alt="TaskRill Logo"
                    width={200}
                    height={80}
                    priority
                />
            </motion.h1>

            <motion.p
                className="text-[#3a6a8a] text-sm text-center leading-relaxed mt-3 max-w-[240px]"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.95, duration: 0.4, ease: "easeOut" }}
            >
                Join the thrill — complete tasks,
                <br />
                collect rewards, and climb the ranks!
            </motion.p>
        </main>
    );
}