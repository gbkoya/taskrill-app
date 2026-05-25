// src/components/dashboard/home/Avatar.tsx
interface AvatarProps {
    initials: string;
    color: string;
    size?: number;
}

export default function Avatar({ initials, color, size = 36 }: AvatarProps) {
    return (
        <div
            className="rounded-full flex items-center justify-center font-bold text-white flex-shrink-0"
            style={{ width: size, height: size, background: color, fontSize: size * 0.35 }}
        >
            {initials}
        </div>
    );
}