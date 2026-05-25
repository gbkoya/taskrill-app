// app/auth/verify-otp/page.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, Easing } from "framer-motion";
import { ChevronLeft, AlertCircle, Loader2, CheckCircle, Mail } from "lucide-react";
import Link from "next/link";
import { useVerifyOtp } from "@/src/hooks/auth/useVerifyOtp";
import { useResendOtp } from "@/src/hooks/auth/useResendOtp";

const OTP_LENGTH = 5;
const EXPIRY_SECONDS = 3 * 60 + 12;

const field = (delay: number) => ({
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: {
        delay,
        duration: 0.35,
        ease: "easeOut" as Easing | Easing[]
    },
});

export default function VerifyOtpPage() {
    const router = useRouter();
    const { verifyOtp, isLoading: isVerifying, error: verifyError } = useVerifyOtp();
    const { resendOtp, isLoading: isResending, error: resendError } = useResendOtp();

    const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
    const [secondsLeft, setSecondsLeft] = useState(EXPIRY_SECONDS);
    const [error, setError] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const inputs = useRef<(HTMLInputElement | null)[]>([]);

    // Get email from sessionStorage (set during registration)
    const email = typeof window !== 'undefined' ? sessionStorage.getItem("registerEmail") : null;

    useEffect(() => {
        if (!email && !isSuccess) {
            router.push("/auth/register");
        }
    }, [email, router, isSuccess]);

    useEffect(() => {
        if (secondsLeft <= 0) return;
        const t = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
        return () => clearInterval(t);
    }, [secondsLeft]);

    // Combine errors from both hooks and local state
    const displayError = error || verifyError || resendError;

    const formatted = `${String(Math.floor(secondsLeft / 60)).padStart(2, "0")}:${String(secondsLeft % 60).padStart(2, "0")}`;

    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;

        // Clear error when user starts typing
        if (error) {
            setError(null);
        }

        const next = [...otp];
        next[index] = value.slice(-1);
        setOtp(next);
        if (value && index < OTP_LENGTH - 1) inputs.current[index + 1]?.focus();
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
        if (!pasted) return;

        // Clear error when user pastes
        if (error) {
            setError(null);
        }

        const next = [...Array(OTP_LENGTH).fill("")];
        pasted.split("").forEach((ch, i) => (next[i] = ch));
        setOtp(next);
        inputs.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus();
    };

    const handleResend = async () => {
        if (!email) return;

        // Clear previous errors
        setError(null);

        try {
            const response = await resendOtp(email);
            if (response.success) {
                setSecondsLeft(EXPIRY_SECONDS);
                setOtp(Array(OTP_LENGTH).fill(""));
                inputs.current[0]?.focus();
            }
        } catch (err) {
            console.error("Resend failed:", err);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const otpCode = otp.join("");
        if (otpCode.length < OTP_LENGTH) return;

        if (!email) {
            setError("Email not found. Please try registering again.");
            return;
        }

        // Clear previous errors before new attempt
        setError(null);

        try {
            const response = await verifyOtp({
                email,
                code: otpCode,
            });

            if (response.success) {
                sessionStorage.removeItem("registerEmail");
                setIsSuccess(true);
            }
        } catch (err) {
            // Error is handled by the hook, but we can also set local error
            if (verifyError) {
                setError(verifyError);
            }
            console.error("Verification failed:", err);
        }
    };

    const isFull = otp.join("").length === OTP_LENGTH;

    // Show success view
    if (isSuccess) {
        return (
            <div className="text-center">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                    <CheckCircle size={40} className="text-green-500" />
                </motion.div>

                <motion.div {...field(0)}>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Email Verified!</h1>
                    <p className="text-sm text-gray-500 mb-8">
                        Your email has been successfully verified. You can now log in to your account.
                    </p>
                </motion.div>

                <motion.div
                    {...field(0.05)}
                    className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8"
                >
                    <div className="flex items-start gap-3">
                        <Mail size={18} className="text-blue-500 mt-0.5" />
                        <div className="text-left">
                            <p className="text-sm font-medium text-blue-800 mb-1">What&apos;s next?</p>
                            <ul className="text-xs text-blue-700 space-y-1">
                                <li>• You can now log in with your email and password</li>
                                <li>• Complete your profile to get started</li>
                                <li>• Explore the dashboard and available features</li>
                            </ul>
                        </div>
                    </div>
                </motion.div>

                <motion.div {...field(0.1)} className="space-y-3">
                    <Link
                        href="/interests"
                        className="w-full h-11 rounded-xl bg-[#1a7cd4] text-white text-sm font-semibold hover:bg-[#1568bb] active:scale-[0.98] transition-all flex items-center justify-center"
                    >
                        Continue
                    </Link>

                    <Link
                        href="/"
                        className="w-full h-11 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 active:scale-[0.98] transition-all flex items-center justify-center"
                    >
                        Back to Home
                    </Link>
                </motion.div>
            </div>
        );
    }

    if (!email) {
        return null;
    }

    return (
        <div>
            <motion.div {...field(0)}>
                <Link
                    href="/register"
                    className="inline-flex items-center gap-1 text-gray-400 hover:text-gray-600 text-sm mb-6 transition-colors"
                >
                    <ChevronLeft size={16} />
                    Back
                </Link>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">Check your email</h1>
                <p className="text-sm text-gray-500 mb-2">
                    We&apos;ve sent a verification code to
                </p>
                <p className="text-sm font-medium text-gray-700 mb-8">
                    {email}
                </p>
            </motion.div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {/* Error Message */}
                {displayError && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, ease: "easeOut" as Easing | Easing[] }}
                        className="bg-red-50 border border-red-200 rounded-xl p-3"
                    >
                        <div className="flex items-start gap-2">
                            <AlertCircle size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                                <p className="text-sm font-medium text-red-700 mb-1">Verification Failed</p>
                                <p className="text-xs text-red-600">{displayError}</p>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* OTP Inputs */}
                <motion.div {...field(0.05)} className="flex gap-3 justify-center" onPaste={handlePaste}>
                    {otp.map((digit, i) => (
                        <input
                            key={i}
                            ref={(el) => { inputs.current[i] = el; }}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(i, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(i, e)}
                            className="w-12 h-14 rounded-xl border-2 border-gray-200 bg-white text-center text-xl font-bold text-gray-800 outline-none focus:border-[#1a7cd4] focus:ring-2 focus:ring-[#1a7cd4]/10 transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
                            disabled={isVerifying}
                        />
                    ))}
                </motion.div>

                {/* Timer */}
                <motion.div {...field(0.1)} className="text-center">
                    <p className="text-xs text-gray-400">
                        Code expires in:{" "}
                        <span className={`font-semibold ${secondsLeft < 60 ? "text-red-500" : "text-gray-600"}`}>
                            {formatted}
                        </span>
                    </p>
                </motion.div>

                {/* Resend Button */}
                <motion.button
                    {...field(0.15)}
                    type="button"
                    onClick={handleResend}
                    disabled={secondsLeft > 0 || isResending || isVerifying}
                    className="w-full h-11 rounded-xl border border-gray-200 bg-gray-100 text-sm font-medium text-gray-500 hover:bg-gray-200 active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isResending ? (
                        <>
                            <Loader2 size={16} className="animate-spin" />
                            Resending...
                        </>
                    ) : (
                        secondsLeft > 0 ? `Resend code in ${formatted}` : "Resend Code"
                    )}
                </motion.button>

                {/* Verify Button */}
                <motion.button
                    {...field(0.2)}
                    type="submit"
                    disabled={!isFull || isVerifying}
                    className="w-full h-11 rounded-xl bg-[#1a7cd4] text-white text-sm font-semibold hover:bg-[#1568bb] active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isVerifying ? (
                        <>
                            <Loader2 size={16} className="animate-spin" />
                            Verifying...
                        </>
                    ) : (
                        "Verify Email"
                    )}
                </motion.button>
            </form>
        </div>
    );
}