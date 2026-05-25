// src/components/dashboard/home/HomeWrapper.tsx
"use client";
import { useState } from "react";
import StatsMilestoneCard from "./StatsMilestoneCard";
import BoosterBanner from "./BoosterBanner";
import TopRanks from "./TopRanks";
import TaskCard from "./TaskCard";
import PrizeSlider from "./PrizeSlider";
import { Task } from "./dashboard";
import { BLUE } from "../../Shared";

const tasks: Task[] = [
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

export default function HomeWrapper() {
    const [taskList, setTaskList] = useState<Task[]>(tasks);

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