import { Prize } from "./dashboard";

export default function PrizeCard({ icon, name }: Prize) {
    return (
        <div className="bg-white rounded-2xl p-3 border border-gray-100 shadow-sm flex flex-col items-center gap-2 text-center w-full">
            <div className="text-8xl">{icon}</div>
            <span className="text-[11px] font-semibold text-gray-700 leading-tight">{name}</span>
        </div>
    );
}