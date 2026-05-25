"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { BLUE, YELLOW } from "@/src/components/Shared";
import Image from "next/image";

// ─── Types ────────────────────────────────────────────────────────────────
interface Event {
    id: string;
    title: string;
    subtitle: string;
    gradient: string;
    image: string;
    characters: string[];
    sponsored: boolean;
    eventImage: string;
}

type ModalState = "sponsor" | null;

// Mock data (from your original code)
const EVENTS: Record<string, Event> = {
    thisMonth: {
        id: "hunt",
        title: "The Hunt!",
        subtitle: "Find Ravy and Find Captain Jack's lost treasure!",
        gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)",
        image: "🏴‍☠️",
        characters: ["🧒", "👦"],
        sponsored: true,
        eventImage: "/images/event1.png",
    },
    nextMonth: {
        id: "console",
        title: "Console Clash!",
        subtitle: "Join Ravy in this new gaming adventure!",
        gradient: "linear-gradient(135deg, #2d1b69 0%, #4a1fa8 60%, #6d28d9 100%)",
        image: "🎮",
        characters: ["🧒"],
        sponsored: false,
        eventImage: "/images/event2.png",
    },
    comingSoon: {
        id: "vacation",
        title: "Vacation Thrill!",
        subtitle: "Join Ravy to the trip to see the pyramids of Egypt",
        gradient: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%)",
        image: "🏖️",
        characters: ["🧒", "🎒"],
        sponsored: false,
        eventImage: "/images/event3.png",
    },
};

interface EventCardProps {
    event: Event;
    label: string;
    onAbout: () => void;
    onSponsor: () => void;
}

function EventCard({ event, label, onAbout, onSponsor }: EventCardProps) {
    return (
        <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-black text-gray-900">{label}</span>
            </div>

            {/* Event Image - using dynamic image based on event */}
            <div className="rounded-3xl overflow-hidden mb-3">
                <Image
                    src={event.eventImage}
                    alt={event.title}
                    className="w-full h-auto object-cover"
                    height={1000}
                    width={1000}
                />
            </div>
            {/* Sponsor Button */}
            {label !== "Coming soon" && (
                <div className="mb-3">
                    <button
                        onClick={onSponsor}
                        className="ml-auto block w-1/2 px-3 py-2 rounded-lg text-sm font-bold text-white transition-all hover:opacity-90"
                        style={{ background: BLUE }}
                    >
                        Sponsor
                    </button>
                </div>
            )}
        </div>
    );
}

function RavyIntroCard() {
    const router = useRouter();

    return (
        <div className="bg-[#FFFAEA] rounded-3xl p-5 border border-gray-100 shadow-sm mb-6 flex gap-4 items-start">
            <div className="flex-1">
                <p className="text-sm text-gray-700 leading-relaxed mb-3">
                    <span className="font-black text-gray-900">Hey there! 👋 I&apos;m Ravy</span>
                    <br />
                    a young farmer from the heart of South-South Nigeria — and I&apos;ve got big dreams. Let&apos;s turn small beginnings into Rewarding dreams.
                    <br /><br />
                    Thanks for participating in my life&apos;s events!
                </p>
                <button
                    onClick={() => router.push('/events/episodes')}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-white bg-[#503203] hover:opacity-90 transition-all"
                >
                    Read story <ArrowRight className="w-3.5 h-3.5" />
                </button>
            </div>
            <div className="rounded-2xl flex items-center justify-center shrink-0 overflow-hidden">
                <Image
                    src="/images/wavy-boy.png"
                    alt="Ravy"
                    className="h-full object-cover rounded-2xl"
                    width={150}
                    height={150}
                />
            </div>
        </div>
    );
}

export default function EventsPage() {
    const router = useRouter();
    const [modal, setModal] = useState<ModalState>(null);

    return (
        <div className="pb-4">
            <RavyIntroCard />

            <EventCard
                event={EVENTS.thisMonth}
                label="This month"
                onAbout={() => router.push('/events/episodes')}
                onSponsor={() => setModal("sponsor")}
            />
            <EventCard
                event={EVENTS.nextMonth}
                label="Next month"
                onAbout={() => { }}
                onSponsor={() => setModal("sponsor")}
            />
            <EventCard
                event={EVENTS.comingSoon}
                label="Coming soon"
                onAbout={() => { }}
                onSponsor={() => { }}
            />

            <div className="px-2 py-4">
                <p className="text-xs text-gray-400 text-center">
                    If you would love to create a custom event with Ravy you can contact our event design team at{" "}
                    <a href="mailto:events@taskrill.com" className="text-blue-500 hover:underline">events@taskrill.com</a>
                </p>
            </div>

            {/* Optional: Add modal handling if needed */}
            {modal === "sponsor" && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
                        <h3 className="text-lg font-bold mb-2">Sponsor Event</h3>
                        <p className="text-sm text-gray-600 mb-4">Sponsorship feature coming soon!</p>
                        <button
                            onClick={() => setModal(null)}
                            className="w-full py-2 rounded-lg bg-blue-500 text-white font-semibold"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}