// src/components/dashboard/home/BoosterBanner.tsx
import { BLUE } from "../../Shared";

export default function BoosterBanner() {
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