// src/components/dashboard/home/PrizeSlider.tsx
import { motion, useMotionValue } from "framer-motion";
import PrizeCard from "./PrizeCard";
import { Prize } from "./dashboard";

const prizes: Prize[] = [
    { name: "Play Station 5", icon: "🎮" },
    { name: "MacBook Pro", icon: "💻" },
    { name: "iPhone 15 Pro", icon: "📱" },
];

export default function PrizeSlider() {
    const x = useMotionValue(0);
    const cardWidth = 140; // Width of each card + gap

    const handleDragEnd = () => {
        const currentX = x.get();
        const maxDrag = -((prizes.length - 2.3) * cardWidth);

        // Snap to nearest card position
        let newX = Math.round(currentX / cardWidth) * cardWidth;

        // Clamp the value
        newX = Math.max(maxDrag, Math.min(0, newX));

        x.set(newX);
    };

    return (
        <div className="overflow-hidden">
            <motion.div
                drag="x"
                dragConstraints={{
                    left: -((prizes.length - 2.3) * cardWidth),
                    right: 0
                }}
                dragElastic={0.1}
                dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
                onDragEnd={handleDragEnd}
                style={{ x }}
                className="flex gap-3 cursor-grab active:cursor-grabbing"
            >
                {prizes.map((p, i) => (
                    <motion.div
                        key={i}
                        className="flex-shrink-0"
                        style={{ width: `calc((100vw - 48px) / 2.3)` }}
                    >
                        <PrizeCard {...p} />
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}