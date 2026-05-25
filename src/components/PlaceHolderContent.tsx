// components/PlaceholderContent.tsx
import { LucideIcon } from "lucide-react";
import { BLUE } from "./Shared";

interface PlaceholderContentProps {
    label: string;
    icon: LucideIcon;
}

export default function PlaceholderContent({ label, icon: Icon }: PlaceholderContentProps) {
    return (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-16 h-16 rounded-3xl flex items-center justify-center" style={{ background: `${BLUE}15` }}>
                <Icon className="w-8 h-8" style={{ color: BLUE }} />
            </div>
            <div className="text-center">
                <div className="text-lg font-black text-gray-800">{label}</div>
                <div className="text-sm text-gray-400 mt-1">This section is coming soon.</div>
            </div>
        </div>
    );
}