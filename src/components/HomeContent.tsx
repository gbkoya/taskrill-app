// components/HomeContent.tsx (and other content components)
"use client"
import { useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { Zap, Users } from "lucide-react";
import { BLUE, YELLOW } from "./Shared";
import Image from "next/image";

// Simplified stats array
const stats = [
    {
        icon: "/images/google.png",
        label: "Tokens Earned",
        value: "8,729",
        accent: BLUE
    },
    {
        icon: "/images/cup.png",
        label: "Ranking",
        value: "#34",
        accent: YELLOW
    },
    {
        icon: "/images/swipe.png",
        label: "x3 Booster",
        sub: "2d:1h:23mins",
        accent: "#FF6B35"
    },
];

const tasks = [
    {
        platform: "ig", color: "#E1306C",
        title: "Follow TechHub on Instagram",
        desc: "Follow @TechHub official on Instagram and earn coins instantly.",
        tokens: 1500, users: 800, completed: false,
    },
    {
        platform: "yt", color: "#FF0000",
        title: "Subscribe to TechHub on YouTube",
        desc: "Subscribe @TechHub official on YouTube and earn coins instantly.",
        tokens: 750, users: 800, completed: false,
    },
    {
        platform: "x", color: "#000000",
        title: "Retweet TechHub post on X",
        desc: "Retweet @TechHub post on X and earn coins instantly.",
        tokens: 300, users: 800, completed: false,
    },
];

const topRanks = [
    { name: "Mike Hutchinson", tokens: "2,305,981", rank: 1, avatar: "MH", color: "#FF6B35" },
    { name: "Mike Hutchinson", tokens: "1,254,393", rank: 2, avatar: "MH", color: BLUE },
    { name: "Yorlev Unit", tokens: "334,697", rank: 3, avatar: "YU", color: "#7C3AED" },
];

const prizes = [
    { name: "Play Station 5", icon: "🎮" },
    { name: "MacBook Pro", icon: "💻" },
    { name: "iPhone 15 Pro", icon: "📱" },
];

// Sub-components for HomeContent
function StatCard({ icon, label, value, sub, accent }: any) {
    return (
        <div className="flex-1 min-w-0 flex flex-col items-center justify-center gap-0.5 py-3 px-2">
            <Image
                src={icon}
                alt={label}
                className="w-8 h-8 object-contain"
                width={20}
                height={20}
            />
            <span className="text-xs text-gray-400 font-medium text-center leading-tight">{label}</span>
            <span className="text-base font-black text-gray-900">{value}</span>
            {sub && <span className="text-[10px] text-gray-400 font-medium">{sub}</span>}
        </div>
    );
}

// Combined Stats + Milestone Card
function StatsMilestoneCard() {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            {/* Stats row */}
            <div className="flex divide-x divide-gray-100">
                {stats.map((s, i) => <StatCard key={i} {...s} />)}
            </div>

            {/* Divider */}
            <div className="block lg:hidden py-4">
                <div className="flex justify-center w-full ">
                    <div className="border-t border-gray-100 w-[90%]" />
                </div>
            </div>

            {/* Milestone section */}
            <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-gray-700">Next Milestone</span>
                    <span className="flex items-center gap-1 text-xs text-black">
                        👥 45,000
                    </span>
                </div>
                <div className="w-full bg-[#0A7C91] rounded-full h-2">
                    <div className="h-2 rounded-full transition-all" style={{ width: "62%", background: `linear-gradient(90deg, #0CC0DF` }} />
                </div>
                <div className="text-[10px] text-gray-400 mt-1.5">Tasks completed 3/10</div>
            </div>
        </div>
    );
}

function PlatformIcon({ platform, color }: any) {
    const logos: any = {
        ig: (
            <svg viewBox="0 0 24 24" fill={color} className="w-5 h-5">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
        ),
        yt: (
            <svg viewBox="0 0 24 24" fill={color} className="w-5 h-5">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
        ),
        x: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-800">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        ),
    };
    return logos[platform] || null;
}

export function TaskCard({ task, onComplete }: any) {
    return (
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm relative">
            {/* Top-right tokens (absolute) */}
            <span
                className="absolute top-3 right-3 flex items-center gap-1 text-xs font-bold"
                style={{ color: BLUE }}
            >
                <Zap className="w-3 h-3" style={{ color: YELLOW }} />⚡ {task.tokens.toLocaleString()}
            </span>

            <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-gray-50 border border-gray-100">
                    <PlatformIcon platform={task.platform} color={task.color} />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-gray-900 leading-tight">{task.title}</div>
                    <div className="text-xs text-gray-400 mt-0.5 leading-relaxed">{task.desc}</div>
                </div>
            </div>

            <div className="flex items-center gap-3 mt-3">
                <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Users className="w-3 h-3" /> {task.users} users completed
                </span>
                <button
                    onClick={() => onComplete(task.title)}
                    className="ml-auto px-4 py-2 rounded-xl text-xs font-bold text-white transition-all hover:opacity-90 active:scale-95"
                    style={{ background: task.completed ? "#22C55E" : BLUE }}
                >
                    {task.completed ? "Done ✓" : "Start Task"}
                </button>
            </div>
        </div>
    );
}

function BoosterBanner() {
    return (
        <div className="rounded-2xl p-4 flex items-center justify-between" style={{ background: `linear-gradient(135deg, ${BLUE} 0%, #0057CC 100%)` }}>
            <div>
                <div className="text-white font-black text-sm">x3 Booster Active</div>
                <div className="text-blue-200 text-xs mt-0.5">Expires in 2d : 1h : 23mins</div>
            </div>
            <div className="text-3xl">⚡</div>
        </div>
    );
}

function EventBanner() {
    return (
        <div
            className="rounded-2xl overflow-hidden relative"
            style={{ background: "linear-gradient(135deg, #1a6fe8 0%, #0C84FD 60%, #00C2FF 100%)", minHeight: 120 }}
        >
            <div className="absolute inset-0 flex items-center">
                <div className="pl-4 flex-1">
                    <div className="text-white/80 text-[10px] font-bold uppercase tracking-wider mb-0.5">Next Event</div>
                    <div className="text-white font-black text-lg leading-tight">NEXT MONTH!</div>
                    <div
                        className="inline-block mt-1 px-3 py-1 rounded-full text-xs font-black"
                        style={{ background: YELLOW, color: "#000" }}
                    >
                        Vacation Thrill!
                    </div>
                </div>
                <div className="text-6xl pr-2 opacity-90">🏖️</div>
            </div>
        </div>
    );
}

function TopRanks() {
    const medalColors = [YELLOW, "#C0C0C0", "#CD7F32"];
    const medals = ["🥇", "🥈", "🥉"];
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center p-4 justify-between mb-3">
                <span className="text-sm font-black text-gray-900">Top 3 Ranks</span>
                <button className="text-xs font-semibold" style={{ color: BLUE }}>View all</button>
            </div>
            <div className="">
                <Image
                    src="/images/top3.png"
                    alt="Top 3"
                    width={800}
                    height={280}
                    className="w-full xl:h-60 rounded-2xl object-cover"
                />
            </div>
        </div>
    );
}

function PrizeCard({ icon, name }: any) {
    return (
        <div className="bg-white rounded-2xl p-3 border border-gray-100 shadow-sm flex flex-col items-center gap-2 text-center w-full">
            <div className="text-8xl">{icon}</div>
            <span className="text-[11px] font-semibold text-gray-700 leading-tight">{name}</span>
        </div>
    );
}

function PrizeSlider() {
    const x = useMotionValue(0);
    const cardWidth = 140; // Width of each card + gap

    const handleDragEnd = (event: any, info: any) => {
        const currentX = x.get();
        const maxDrag = -((prizes.length - 2.3) * cardWidth);

        // Snap to nearest card position
        let newX = Math.round(currentX / cardWidth) * cardWidth;

        // Clamp the value
        newX = Math.max(maxDrag, Math.min(0, newX));

        x.set(newX);
    };

    return (
        <div className="overflow-hidden">
            <motion.div
                drag="x"
                dragConstraints={{
                    left: -((prizes.length - 2.3) * cardWidth),
                    right: 0
                }}
                dragElastic={0.1}
                dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
                onDragEnd={handleDragEnd}
                style={{ x }}
                className="flex gap-3 cursor-grab active:cursor-grabbing"
            >
                {prizes.map((p, i) => (
                    <motion.div
                        key={i}
                        className="flex-shrink-0"
                        style={{ width: `calc((100vw - 48px) / 2.3)` }}
                    >
                        <PrizeCard {...p} />
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}

function Avatar({ initials, color, size = 36 }: any) {
    return (
        <div
            className="rounded-full flex items-center justify-center font-bold text-white flex-shrink-0"
            style={{ width: size, height: size, background: color, fontSize: size * 0.35 }}
        >
            {initials}
        </div>
    );
}

export default function HomeContent() {
    const [taskList, setTaskList] = useState(tasks);

    const handleComplete = (title: string) => {
        setTaskList(prev => prev.map(t => t.title === title ? { ...t, completed: !t.completed } : t));
    };

    return (
        <div className="space-y-4">
            {/* Combined Stats + Milestone Card */}
            <StatsMilestoneCard />

            {/* Booster */}
            <BoosterBanner />

            {/* Two-col on desktop for ranks + event */}
            <div className="gap-4">
                <TopRanks />
                {/* <EventBanner /> */}
            </div>

            {/* Available Tasks */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-black text-gray-900">Available Tasks</span>
                    <button className="text-xs font-semibold" style={{ color: BLUE }}>View all</button>
                </div>
                <div className="space-y-3">
                    {taskList.map((task, i) => (
                        <TaskCard key={i} task={task} onComplete={handleComplete} />
                    ))}
                </div>
            </div>

            {/* Up for grabs */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-black text-gray-900">Up for grabs 🎁</span>
                    <button className="text-xs font-semibold" style={{ color: BLUE }}>View all</button>
                </div>
                <PrizeSlider />
            </div>
        </div>
    );
}