"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function ResetSuccessPage() {
    return (
        <div className="flex flex-col items-center text-center py-8">
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", bounce: 0.5, duration: 0.7 }}
                className="mb-8"
            >
                <div className="w-28 h-28 rounded-3xl bg-[#fff8e1] border-4 border-[#f59e0b] flex items-center justify-center">
                    <motion.div
                        initial={{ scale: 0, rotate: -30 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.3, type: "spring", bounce: 0.6 }}
                    >
                        <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                            <path
                                d="M14 28L24 38L42 20"
                                stroke="#2e9e5b"
                                strokeWidth="5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </motion.div>
                </div>
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="text-2xl font-bold text-gray-900 mb-2"
            >
                Successful
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="text-sm text-gray-500 mb-10 max-w-[240px] leading-relaxed"
            >
                Your new password has been set. You can now sign in with your new password.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.4 }}
                className="w-full"
            >
                <Link
                    href="/login"
                    className="flex items-center justify-center w-full h-11 rounded-xl bg-[#1a7cd4] text-white text-sm font-semibold hover:bg-[#1568bb] active:scale-[0.98] transition-all"
                >
                    Continue
                </Link>
            </motion.div>
        </div>
    );
}