"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ArrowLeft, ArrowRight } from "lucide-react";
import { YELLOW } from "@/src/components/Shared";

// In a real app, you'd fetch this from an API or database
const EPISODES_MAP = {
    1: {
        id: 1,
        title: "Episode One",
        subtitle: "The matrix of Ravy",
        content: `The first time Ravy wore the helmet, the world around him dissolved like a wet painting.

He could still smell the earthy scent of his father's old farm, hear the wind rustling through the palm fronds behind their thatched house in Edo State—but suddenly, those sounds faded into something electric. A world of glowing patterns, humming lights, and shapes that seemed to breathe. That was the birth of Taskrill, a universe born not from stars, but from a dream—a dream that started long before Ravy ever left home.

Ravy Osagi had always been a child of the soil. He grew up where dawns came quietly, and the air smelled of cassava, smoke, and hope. His father, a farmer with sun-worn hands, often told him, "The land never forgets those who love it." His mother sold fabrics in the village market, her laughter rising above the chatter of women bargaining for Ankara prints.

Life was simple—until the day sickness came and took his father away.

Ravy was thirteen. He never forgot how silent the farm became afterward. No more footsteps in the morning dew. No more gentle humming of old songs while tilling the ground. Just silence—and the weight of loss.

Still, his mother carried the family forward with a strength that reminded Ravy of a baobab tree standing against the storm. She wanted more for him.

"You'll go to the city," she insisted. "You'll learn. You'll grow. Your father's dreams will live through you."

So, when Ravy turned nineteen, he packed his small bag, said goodbye to the farm, hugged his dog Dedefo one last time, and boarded a rickety bus heading to Benin City.

The city was a shock. Noise. Neon lights. Speed. People moving like they were running late for their own shadows.

At first, Ravy felt like a leaf blown into a whirlwind. He spoke softly, dressed modestly, and preferred quiet corners. But the city had a way of pushing you to find your place—or get lost in its chaos.`,
    },
    2: {
        id: 2,
        title: "Episode Two",
        subtitle: "The city of lights",
        content: `Benin City never slept. Ravy discovered that quickly. The streets hummed with a different kind of energy—nothing like the quiet rhythm of the farm.

He found a small room in Uselu, sharing a compound with six other young men who had come to the city with similar dreams and similar empty pockets. They laughed a lot. They argued over the single electric fan. They shared jollof rice when times were good.

Ravy got a job at a cybercafé. He had never used a computer properly before, but he watched. He learned. He typed faster than anyone expected.

The owner, a gruff man named Mr. Osagie who seemed permanently irritated by everything, noticed. "You have a good eye," he said one evening, not looking up from his newspaper. That was the closest thing to a compliment Ravy would get from him for three years.

But it was enough.

Ravy started reading at night—tech blogs, forums, YouTube tutorials on everything from graphic design to basic coding. He didn't sleep much. He didn't need to. The hunger to understand was stronger than fatigue.

Then one afternoon, a customer left a VR headset on the counter. Ravy called after him, but the man was already gone. He stared at the device for a long time before he put it on.

The world cracked open.`,
    },
};

export default function EpisodeReaderPage({ params }: { params: { episodeId: string } }) {
    const router = useRouter();
    // ✅ Move ALL hooks to the top, before any conditional returns
    const [page, setPage] = useState(0);

    const episode = EPISODES_MAP[params.episodeId as unknown as keyof typeof EPISODES_MAP];

    // ✅ Now it's safe to conditionally return after all hooks
    if (!episode) {
        return <div>Episode not found</div>;
    }

    const pages = episode.content.split("\n\n").filter(Boolean);
    const totalPages = pages.length;
    const CHUNK = 4;
    const start = page * CHUNK;
    const visibleParagraphs = pages.slice(start, start + CHUNK);
    const totalChunks = Math.ceil(totalPages / CHUNK);
    const currentChunk = page + 1;

    return (
        <div>
            <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900 mb-4 transition-colors"
            >
                <ChevronLeft className="w-4 h-4" /> {episode.title}
            </button>

            <div className="rounded-3xl overflow-hidden mb-5 flex items-center justify-center"
                style={{ height: 200, background: "linear-gradient(135deg, #86efac 0%, #22c55e 40%, #15803d 100%)" }}>
                <div className="flex items-end gap-4">
                    <div className="text-7xl">🌾</div>
                    <div className="text-6xl">🧒</div>
                    <div className="text-5xl">🌳</div>
                </div>
            </div>

            <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm mb-5">
                <h2 className="font-black text-lg text-gray-900 mb-4">{episode.subtitle}</h2>
                <div className="space-y-4">
                    {visibleParagraphs.map((para, i) => (
                        <p key={i} className="text-sm text-gray-600 leading-[1.8]">{para}</p>
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-center gap-6 pb-4">
                <button
                    onClick={() => setPage(p => Math.max(0, p - 1))}
                    disabled={page === 0}
                    className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 bg-white shadow-sm hover:bg-gray-50 disabled:opacity-30 transition-all"
                    style={{ color: page === 0 ? "#9CA3AF" : "#374151" }}
                >
                    <ArrowLeft className="w-4 h-4" />
                </button>

                <span className="text-sm font-bold text-gray-500">
                    {currentChunk} / {totalChunks}
                </span>

                <button
                    onClick={() => setPage(p => Math.min(totalChunks - 1, p + 1))}
                    disabled={page >= totalChunks - 1}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg hover:opacity-90 disabled:opacity-30 transition-all"
                    style={{ background: currentChunk < totalChunks ? YELLOW : "#D1D5DB" }}
                >
                    <ArrowRight className="w-4 h-4 text-gray-800" />
                </button>
            </div>
        </div>
    );
}