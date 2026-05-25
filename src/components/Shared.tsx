// components/shared.tsx
import { Home, ClipboardList, Megaphone, CalendarDays, Trophy } from "lucide-react";

export const BLUE = "#0C84FD";
export const YELLOW = "#FED403";
export const PURPLE = "#7C3AED";

export const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "task", label: "Task", icon: ClipboardList },
    { id: "campaign", label: "Campaign", icon: Megaphone },
    { id: "events", label: "Events", icon: CalendarDays },
    { id: "rank", label: "Rank", icon: Trophy },
];

interface AvatarProps {
    initials: string;
    color: string;
    size?: number;
}

export function Avatar({ initials, color, size = 36 }: AvatarProps) {
    return (
        <div
            className="rounded-full flex items-center justify-center font-bold text-white flex-shrink-0"
            style={{ width: size, height: size, background: color, fontSize: size * 0.35 }}
        >
            {initials}
        </div>
    );
}