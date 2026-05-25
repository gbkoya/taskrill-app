"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function AccountCreatedPage() {
    return (
        <div className="flex flex-col items-center text-center py-8">
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", bounce: 0.5, duration: 0.7 }}
                className="w-24 h-24 rounded-full bg-[#e8f5e9] flex items-center justify-center mb-8"
            >
                <CheckCircle2 size={48} className="text-[#2e9e5b]" strokeWidth={1.5} />
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="text-2xl font-bold text-gray-900 mb-2"
            >
                Account Created
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="text-sm text-gray-500 mb-10 max-w-[260px] leading-relaxed"
            >
                Your account has been created successfully. You&apos;re all set to start thrilling!
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="w-full"
            >
                <Link
                    href="/login"
                    className="flex items-center justify-center w-full h-11 rounded-xl bg-[#1a7cd4] text-white text-sm font-semibold hover:bg-[#1568bb] active:scale-[0.98] transition-all"
                >
                    Continue to Sign In
                </Link>
            </motion.div>
        </div>
    );
}