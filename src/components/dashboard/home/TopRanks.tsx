// src/components/dashboard/home/TopRanks.tsx
import Image from "next/image";
import { BLUE } from "../../Shared";

export default function TopRanks() {
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