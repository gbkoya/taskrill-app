// src/components/dashboard/home/StatCard.tsx
import Image from "next/image";
import { Stat } from "./dashboard";


export default function StatCard({ icon, label, value, sub }: Stat) {
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