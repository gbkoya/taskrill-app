"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, Easing } from "framer-motion";
import { Loader2, AlertCircle } from "lucide-react";
import { useInterests } from "@/src/hooks/user/useInterests";

const INTERESTS = [
    "sports",
    "games",
    "entertainment",
    "technology",
    "politics",
    "finance",
    "lifestyle",
    "fashion",
    "entrepreneurship",
    "startup",
    "health",
    "science",
    "personal development",
] as const;

type Interest = typeof INTERESTS[number];

const MIN_SELECTION = 6;
const MAX_SELECTION = 10;

const field = (delay: number) => ({
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: {
        delay,
        duration: 0.35,
        ease: "easeOut" as Easing | Easing[],
    },
});

export default function InterestsPage() {
    const router = useRouter();
    const { setInterests, isLoading, error } = useInterests();
    const [selectedInterests, setSelectedInterests] = useState<Interest[]>([]);
    const audioContextRef = useRef<AudioContext | null>(null);

    useEffect(() => {
        const AudioContextClass =
            window.AudioContext ||
            (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

        if (!AudioContextClass) {
            console.warn("Web Audio API not supported");
            return;
        }

        audioContextRef.current = new AudioContextClass();

        return () => {
            audioContextRef.current?.close();
        };
    }, []);

    const resumeAudio = () => {
        if (audioContextRef.current?.state === "suspended") {
            audioContextRef.current.resume();
        }
    };

    const playSelectSound = () => {
        const ctx = audioContextRef.current;
        if (!ctx) return;
        resumeAudio();
        const t = ctx.currentTime;
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();
        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);
        osc1.type = "sine";
        osc1.frequency.setValueAtTime(660, t);
        osc1.frequency.linearRampToValueAtTime(880, t + 0.08);
        osc2.type = "sine";
        osc2.frequency.setValueAtTime(1320, t);
        osc2.frequency.linearRampToValueAtTime(1760, t + 0.08);
        gain.gain.setValueAtTime(0.12, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);
        osc1.start(t);
        osc2.start(t);
        osc1.stop(t + 0.18);
        osc2.stop(t + 0.18);
    };

    const playDeselectSound = () => {
        const ctx = audioContextRef.current;
        if (!ctx) return;
        resumeAudio();
        const t = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = "sine";
        osc.frequency.setValueAtTime(440, t);
        osc.frequency.linearRampToValueAtTime(280, t + 0.1);
        gain.gain.setValueAtTime(0.08, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);
        osc.start(t);
        osc.stop(t + 0.12);
    };

    const toggleInterest = (interest: Interest) => {
        setSelectedInterests((prev) => {
            if (prev.includes(interest)) {
                playDeselectSound();
                return prev.filter((i) => i !== interest);
            } else {
                if (prev.length >= MAX_SELECTION) return prev;
                playSelectSound();
                return [...prev, interest];
            }
        });
    };

    const handleSubmit = async () => {
        if (selectedInterests.length < MIN_SELECTION) return;

        try {
            const response = await setInterests({ interests: selectedInterests });
            if (response.success) {
                router.push("/dashboard");
            }
        } catch (err) {
            console.error("Failed to save interests:", err);
        }
    };

    const isSelectionValid =
        selectedInterests.length >= MIN_SELECTION &&
        selectedInterests.length <= MAX_SELECTION;
    const selectionCount = selectedInterests.length;
    const remaining = MIN_SELECTION - selectionCount;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-10 px-4">
            <div className="max-w-3xl mx-auto">

                {/* Header */}
                <motion.div {...field(0)} className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-3">
                        Select your interests
                    </h1>
                    <p className="text-gray-500 text-sm">
                        Choose topics you&apos;re passionate about to get personalised task recommendations
                    </p>
                    <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200">
                        <span
                            className={`text-sm font-medium ${selectionCount >= MIN_SELECTION
                                    ? "text-[#1a7cd4]"
                                    : "text-orange-500"
                                }`}
                        >
                            {selectionCount} / {MIN_SELECTION} minimum
                        </span>
                        <span className="text-gray-300">|</span>
                        <span className="text-sm text-gray-400">Max {MAX_SELECTION}</span>
                    </div>
                </motion.div>

                {/* Error Message */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6"
                    >
                        <div className="flex items-start gap-2">
                            <AlertCircle size={18} className="text-red-500 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-sm font-medium text-red-700 mb-0.5">Error</p>
                                <p className="text-sm text-red-600">{error}</p>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Interests Pills */}
                <motion.div
                    {...field(0.1)}
                    className="flex flex-wrap gap-3 mb-8"
                >
                    {INTERESTS.map((interest, index) => {
                        const isSelected = selectedInterests.includes(interest);
                        return (
                            <motion.button
                                key={interest}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.03 }}
                                onClick={() => toggleInterest(interest)}
                                className={`
                                    px-5 py-2 rounded-full text-sm font-medium border transition-all duration-150
                                    ${isSelected
                                        ? "bg-[#1a7cd4] border-[#1a7cd4] text-white"
                                        : "bg-white border-gray-300 text-gray-700 hover:border-[#1a7cd4] hover:text-[#1a7cd4]"
                                    }
                                    active:scale-95
                                `}
                            >
                                <span className="capitalize">{interest}</span>
                            </motion.button>
                        );
                    })}
                </motion.div>

                {/* Warning */}
                {selectionCount > 0 && selectionCount < MIN_SELECTION && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-orange-50 border border-orange-200 rounded-xl p-3 mb-6"
                    >
                        <p className="text-sm text-orange-600 text-center">
                            Select {remaining} more{" "}
                            {remaining === 1 ? "interest" : "interests"} to continue
                        </p>
                    </motion.div>
                )}

                {/* Submit */}
                <motion.button
                    {...field(0.2)}
                    onClick={handleSubmit}
                    disabled={!isSelectionValid || isLoading}
                    className="w-full h-12 rounded-full bg-[#1a7cd4] text-white font-semibold hover:bg-[#1568bb] active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <Loader2 size={18} className="animate-spin" />
                            Saving...
                        </>
                    ) : (
                        "Continue"
                    )}
                </motion.button>

                {/* Skip */}
                <motion.p {...field(0.25)} className="text-center mt-5">
                    <button
                        onClick={() => router.push("/dashboard")}
                        className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        Skip for now (you can set this later)
                    </button>
                </motion.p>
            </div>
        </div>
    );
}