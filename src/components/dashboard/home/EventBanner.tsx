// src/components/dashboard/home/EventBanner.tsx
import { BLUE, YELLOW } from "../../Shared";

export default function EventBanner() {
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