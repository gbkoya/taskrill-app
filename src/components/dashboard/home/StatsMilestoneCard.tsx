// src/components/dashboard/home/StatsMilestoneCard.tsx
import StatCard from "./StatCard";
import { Stat } from "./dashboard";
import { BLUE, YELLOW } from "../../Shared";

const stats: Stat[] = [
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

export default function StatsMilestoneCard() {
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