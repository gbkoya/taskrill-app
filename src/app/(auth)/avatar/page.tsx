"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronLeft, Check, Loader2, AlertCircle } from "lucide-react";
import { useAvatar } from "@/src/hooks/user/useAvatar";

interface Avatar {
    id: string;
    avatarId: string;
    imageUrl: string;
    bgColor: string;
    name?: string;
}

export default function AvatarPage() {
    const router = useRouter();
    const { getAvatars, selectAvatar, isLoading, error } = useAvatar();
    const [avatars, setAvatars] = useState<Avatar[]>([]);
    const [selectedAvatarId, setSelectedAvatarId] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isWelcome, setIsWelcome] = useState(false);
    const [page, setPage] = useState(0);
    const [direction, setDirection] = useState(1);

    const [userName] = useState<string>(() => {
        try {
            const userStr = localStorage.getItem("user");
            if (!userStr) return "User";
            const user = JSON.parse(userStr);
            return user.firstName || user.username || "User";
        } catch {
            return "User";
        }
    });

    const ITEMS_PER_PAGE = 6;
    const totalPages = Math.ceil(avatars.length / ITEMS_PER_PAGE);

    useEffect(() => {
        const fetchAvatars = async () => {
            try {
                const response = await getAvatars();
                if (response.success && response.data) {
                    setAvatars(response.data);
                }
            } catch (err) {
                console.error("Failed to fetch avatars:", err);
            }
        };

        fetchAvatars();
    }, [getAvatars]);

    const goToPage = (newPage: number) => {
        setDirection(newPage > page ? 1 : -1);
        setPage(newPage);
    };

    const handleAvatarSelect = (avatarId: string) => {
        setSelectedAvatarId(avatarId);
    };

    const handleContinue = async () => {
        if (selectedAvatarId) {
            setIsSubmitting(true);
            try {
                const response = await selectAvatar({ avatarId: selectedAvatarId });
                if (response.success) {
                    setIsWelcome(true);
                }
            } catch (err) {
                console.error("Failed to select avatar:", err);
            } finally {
                setIsSubmitting(false);
            }
        } else {
            setIsWelcome(true);
        }
    };

    const handleStartTasks = () => {
        router.push("/dashboard");
    };

    const currentPageAvatars = avatars.slice(
        page * ITEMS_PER_PAGE,
        (page + 1) * ITEMS_PER_PAGE
    );

    const selectedAvatar = avatars.find((a) => a.id === selectedAvatarId);

    if (isLoading && avatars.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f0f7ff]">
                <Loader2 size={40} className="animate-spin text-[#1a7cd4]" />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f0f7ff] p-4">
            <div
                className="w-full max-w-md bg-white rounded-3xl overflow-hidden flex flex-col"
                style={{ minHeight: "680px" }}
            >
                {/* Top bar */}
                <div className="flex items-center gap-3 px-6 pt-6 pb-4">
                    {!isWelcome && (
                        <button
                            onClick={() => (page > 0 ? goToPage(page - 1) : router.back())}
                            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-500"
                        >
                            <ChevronLeft size={18} />
                        </button>
                    )}
                    <h1 className="text-base font-bold text-gray-900 tracking-tight">
                        {isWelcome ? "Welcome!" : "Choose Your Avatar"}
                    </h1>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mx-6 mb-4 bg-red-50 border border-red-200 rounded-xl p-3">
                        <div className="flex items-start gap-2">
                            <AlertCircle size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-red-600">{error}</p>
                        </div>
                    </div>
                )}

                <div className="flex-1 flex flex-col px-6 pb-6">
                    <AnimatePresence mode="wait" custom={direction}>
                        {!isWelcome ? (
                            <motion.div
                                key={`page-${page}`}
                                custom={direction}
                                initial={{ opacity: 0, x: direction * 40 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: direction * -40 }}
                                transition={{ duration: 0.25, ease: "easeOut" }}
                                className="flex-1 flex flex-col justify-between"
                            >
                                {/* Avatar Grid */}
                                <div className="grid grid-cols-3 gap-5 mt-2">
                                    {currentPageAvatars.map((avatar, index) => (
                                        <motion.button
                                            key={avatar.id}
                                            initial={{ opacity: 0, scale: 0.75 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{
                                                delay: index * 0.045,
                                                type: "spring",
                                                bounce: 0.38,
                                            }}
                                            whileTap={{ scale: 0.88 }}
                                            onClick={() => handleAvatarSelect(avatar.id)}
                                            className="relative aspect-square focus:outline-none"
                                        >
                                            <div
                                                className={`w-full h-full rounded-full overflow-hidden transition-all duration-200 ${selectedAvatarId === avatar.id
                                                        ? "ring-[3px] ring-[#1a7cd4] ring-offset-2 scale-105"
                                                        : "hover:scale-[1.04] hover:ring-2 hover:ring-gray-200 hover:ring-offset-1"
                                                    }`}
                                                style={{ background: avatar.bgColor }}
                                            >
                                                <Image
                                                    src={avatar.imageUrl}
                                                    alt={`Avatar ${avatar.name || avatar.avatarId}`}
                                                    width={96}
                                                    height={96}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            {selectedAvatarId === avatar.id && (
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ type: "spring", bounce: 0.55 }}
                                                    className="absolute bottom-0.5 right-0.5 w-6 h-6 rounded-full bg-[#1a7cd4] flex items-center justify-center border-2 border-white"
                                                >
                                                    <Check size={12} strokeWidth={3} className="text-white" />
                                                </motion.div>
                                            )}
                                        </motion.button>
                                    ))}
                                </div>

                                {/* Pagination dots */}
                                {totalPages > 1 && (
                                    <div className="flex justify-center gap-2 mt-6">
                                        {Array.from({ length: totalPages }).map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => goToPage(i)}
                                                className={`h-1.5 rounded-full transition-all duration-300 ${page === i
                                                        ? "w-6 bg-[#1a7cd4]"
                                                        : "w-1.5 bg-gray-200 hover:bg-gray-300"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                )}

                                {/* Skip Button */}
                                <button
                                    onClick={() => setIsWelcome(true)}
                                    className="mt-3 w-full h-10 rounded-full border border-gray-200 bg-white text-sm font-medium text-gray-600 hover:bg-gray-50 active:scale-[0.98] transition-all"
                                >
                                    Skip for now
                                </button>

                                {/* CTA Button */}
                                <button
                                    onClick={handleContinue}
                                    disabled={isSubmitting}
                                    className="mt-3 w-full h-12 rounded-full bg-[#1a7cd4] text-white text-sm font-semibold hover:bg-[#1568bb] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 size={18} className="animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        "Continue"
                                    )}
                                </button>
                            </motion.div>
                        ) : (
                            /* Welcome screen */
                            <motion.div
                                key="welcome"
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="flex-1 flex flex-col items-center justify-center text-center"
                            >
                                <motion.div
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ type: "spring", bounce: 0.42, duration: 0.7 }}
                                    className="w-40 h-40 rounded-full overflow-hidden mb-7"
                                    style={{
                                        background: selectedAvatar?.bgColor || "#e8c97a",
                                    }}
                                >
                                    {selectedAvatar ? (
                                        <Image
                                            src={selectedAvatar.imageUrl}
                                            alt="Selected avatar"
                                            width={160}
                                            height={160}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-6xl bg-gradient-to-br from-blue-400 to-purple-500">
                                            🧑
                                        </div>
                                    )}
                                </motion.div>

                                <motion.h2
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3, duration: 0.4 }}
                                    className="text-2xl font-bold text-gray-900 mb-2"
                                >
                                    Welcome {userName}!
                                </motion.h2>

                                <motion.p
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4, duration: 0.4 }}
                                    className="text-sm text-gray-500 max-w-[280px] leading-relaxed mb-10"
                                >
                                    Your journey begins here! Complete tasks, earn rewards, and become
                                    part of our amazing community.
                                </motion.p>

                                <motion.button
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5, duration: 0.4 }}
                                    onClick={handleStartTasks}
                                    className="w-full h-12 rounded-full bg-[#1a7cd4] text-white text-sm font-semibold hover:bg-[#1568bb] active:scale-[0.98] transition-all"
                                >
                                    Start Your Journey
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}