"use client"
import { useRouter } from "next/navigation";
import { ChevronLeft, Heart, ArrowRight } from "lucide-react";
import { BLUE, YELLOW } from "@/src/components/Shared";

const EPISODES = [
    {
        id: 1,
        title: "Episode One",
        subtitle: "The matrix of Ravy",
        preview: "The first time Ravy wore the helmet, the world around him dissolved like a wet painting. He could still...",
        likes: "1.4k",
        hasTrivia: true,
        triviaTokens: 25000,
        triviaDesc: "How well do you know Ravy's story? Answer all questions correctly to win all collectibles!",
        triviaUsers: 800,
        content: `The first time Ravy wore the helmet, the world around him dissolved like a wet painting...`, // Full content here
    },
    {
        id: 2,
        title: "Episode Two",
        subtitle: "The city of lights",
        preview: "Benin City never slept. Ravy discovered that quickly. The streets hummed with a different kind of energy...",
        likes: "980",
        content: `Benin City never slept. Ravy discovered that quickly...`, // Full content here
    },
];

export default function EpisodesPage() {
    const router = useRouter();

    return (
        <div>
            <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900 mb-5 transition-colors"
            >
                <ChevronLeft className="w-4 h-4" /> Back to Events
            </button>

            <div className="space-y-4">
                {EPISODES.map(ep => (
                    <div key={ep.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="flex gap-4 p-4">
                            <div className="w-20 h-16 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center text-4xl"
                                style={{ background: "linear-gradient(135deg, #fde68a, #f59e0b)" }}>
                                🌾
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                    <div>
                                        <div className="text-xs font-bold text-gray-400 mb-0.5">{ep.title}</div>
                                        <div className="text-sm font-black text-gray-900">{ep.subtitle}</div>
                                    </div>
                                    <button
                                        onClick={() => router.push(`/events/reader/${ep.id}`)}
                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white flex-shrink-0 transition-all hover:opacity-90"
                                        style={{ background: BLUE }}
                                    >
                                        Read <ArrowRight className="w-3 h-3" />
                                    </button>
                                </div>
                                <p className="text-xs text-gray-400 mt-1.5 leading-relaxed line-clamp-2">{ep.preview}</p>
                                <div className="flex items-center gap-1 mt-2">
                                    <Heart className="w-3.5 h-3.5 text-red-400" />
                                    <span className="text-xs text-gray-400 font-semibold">{ep.likes}</span>
                                </div>
                            </div>
                        </div>

                        {ep.hasTrivia && (
                            <div className="border-t border-gray-100 px-4 py-3 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-xl flex-shrink-0">🤖</div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <span className="text-xs font-black text-gray-900">Trivia</span>
                                        <span className="flex items-center gap-0.5 text-xs font-black" style={{ color: YELLOW }}>
                                            ⚡ {ep.triviaTokens.toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="text-xs text-gray-400 leading-relaxed line-clamp-2">{ep.triviaDesc}</div>
                                    <div className="flex items-center gap-1 mt-1">
                                        <span className="text-[10px] text-gray-400">👥 {ep.triviaUsers} users took this quiz</span>
                                    </div>
                                </div>
                                <button className="px-4 py-1.5 rounded-xl text-xs font-bold text-white flex-shrink-0 transition-all hover:opacity-90"
                                    style={{ background: BLUE }}>
                                    Play
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}