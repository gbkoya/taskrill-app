// src/components/dashboard/home/TaskCard.tsx
import { Zap, Users } from "lucide-react";
import PlatformIcon from "./PlatformIcon";
import { Task } from "./dashboard";
import { BLUE, YELLOW } from "../../Shared";

interface TaskCardProps {
    task: Task;
    onComplete: (title: string) => void;
}

export default function TaskCard({ task, onComplete }: TaskCardProps) {
    return (
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm relative">
            {/* Top-right tokens (absolute) */}
            <span
                className="absolute top-3 right-3 flex items-center gap-1 text-xs font-bold"
                style={{ color: BLUE }}
            >
                <Zap className="w-3 h-3" style={{ color: YELLOW }} />⚡ {task.tokens.toLocaleString()}
            </span>

            <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-gray-50 border border-gray-100">
                    <PlatformIcon platform={task.platform} color={task.color} />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-gray-900 leading-tight">{task.title}</div>
                    <div className="text-xs text-gray-400 mt-0.5 leading-relaxed">{task.desc}</div>
                </div>
            </div>

            <div className="flex items-center gap-3 mt-3">
                <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Users className="w-3 h-3" /> {task.users} users completed
                </span>
                <button
                    onClick={() => onComplete(task.title)}
                    className="ml-auto px-4 py-2 rounded-xl text-xs font-bold text-white transition-all hover:opacity-90 active:scale-95"
                    style={{ background: task.completed ? "#22C55E" : BLUE }}
                >
                    {task.completed ? "Done ✓" : "Start Task"}
                </button>
            </div>
        </div>
    );
}