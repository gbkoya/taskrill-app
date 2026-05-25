"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, ChevronLeft, CheckCircle2, Circle } from "lucide-react";

// Move Req component outside of the main component
const Req = ({ met, label }: { met: boolean; label: string }) => (
    <div className="flex items-center gap-2">
        {met ? (
            <CheckCircle2 size={14} className="text-[#2e9e5b]" />
        ) : (
            <Circle size={14} className="text-gray-300" />
        )}
        <span className={`text-xs ${met ? "text-[#2e9e5b]" : "text-gray-400"}`}>{label}</span>
    </div>
);

const field = (delay: number) => ({
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.35, ease: "easeOut" as const }, // Add 'as const' for proper type inference
});

export default function ResetPasswordPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");

    const hasMinLength = password.length >= 6;
    const hasNumber = /\d/.test(password);
    const isValid = hasMinLength && hasNumber;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isValid) return;
        router.push("/verify-otp");
    };

    const inputClass =
        "w-full h-11 rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-[#1a7cd4] focus:ring-2 focus:ring-[#1a7cd4]/10 transition-all";

    return (
        <div>
            <motion.div {...field(0)}>
                <Link
                    href="/login"
                    className="inline-flex items-center gap-1 text-gray-400 hover:text-gray-600 text-sm mb-6 transition-colors"
                >
                    <ChevronLeft size={16} />
                    Back
                </Link>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">Reset password</h1>
                <p className="text-sm text-gray-500 mb-7">Please enter your new password</p>
            </motion.div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <motion.div {...field(0.05)}>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">New Password</label>
                    <div className="relative">
                        <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Min 6 chars + a number"
                            className={`${inputClass} pl-9 pr-10`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                    </div>
                </motion.div>

                {password.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="bg-gray-50 rounded-xl p-3 flex flex-col gap-2"
                    >
                        <p className="text-xs font-medium text-gray-500 mb-1">Your password must contain:</p>
                        <Req met={hasMinLength} label="At least 6 characters" />
                        <Req met={hasNumber} label="A number" />
                    </motion.div>
                )}

                <motion.button
                    {...field(0.15)}
                    type="submit"
                    disabled={!isValid}
                    className="w-full h-11 rounded-xl bg-[#1a7cd4] text-white text-sm font-semibold mt-1 hover:bg-[#1568bb] active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    Done
                </motion.button>
            </form>
        </div>
    );
}