"use client"
import { useState } from "react";
import {
    Check, X, Zap, Target
} from "lucide-react";

const BLUE = "#0C84FD";
const YELLOW = "#FED403";
const PURPLE = "#7C3AED";
const GREEN = "#22C55E";
const RED = "#EF4444";
const ORANGE = "#F97316";

// ─── Types ─────────────────────────────────────────────────────────────────────
interface Player {
    id: number;
    name: string;
    tokens: string;
    rank: number;
    isMe: boolean;
    avatar: string;
    color: string;
    nukes?: number;
}

type NukeVariant = "default" | "blue" | "purple";
type NukeResultType = "oops" | "magnificent" | "incredible" | "nukehits";

interface NukeConfirmModalProps {
    target: string;
    variant: NukeVariant;
    onNuke: () => void;
    onCancel: () => void;
}

interface NukeResultModalProps {
    type: NukeResultType;
    target: string;
    tokens: number;
    onClose: () => void;
}

interface EventEndedModalProps {
    onClose: () => void;
}

interface AvatarProps {
    initials: string;
    color: string;
    size?: number;
    border?: boolean;
}

type ModalState =
    | { type: "nukeConfirm"; target: string; targetId: number; variant: NukeVariant }
    | { type: "nukeResult"; resultType: NukeResultType; target: string; tokens: number }
    | { type: "eventEnded" }
    | null;

// ─── Mock leaderboard data ─────────────────────────────────────────────────────
const PLAYERS: Player[] = [
    { id: 1, name: "Mike Hutchinson", tokens: "2.3k", rank: 1, isMe: false, avatar: "MH", color: "#FF6B35" },
    { id: 2, name: "Mike Hutchinson", tokens: "1.2k", rank: 2, isMe: false, avatar: "MH", color: BLUE },
    { id: 3, name: "Yorlev Unit", tokens: "334k", rank: 3, isMe: false, avatar: "YU", color: PURPLE },
    { id: 4, name: "Mike Hutchinson", tokens: "3.1k", rank: 4, isMe: false, avatar: "MH", color: "#10B981" },
    { id: 5, name: "Mike Hutchinson", tokens: "2.9k", rank: 5, isMe: false, avatar: "MH", color: "#F59E0B" },
    { id: 6, name: "Mike Hutchinson", tokens: "2.7k", rank: 6, isMe: false, avatar: "MH", color: "#EC4899" },
    { id: 7, name: "Mike Hutchinson", tokens: "2.5k", rank: 7, isMe: false, avatar: "MH", color: "#6366F1" },
    { id: 8, name: "Mike Hutchinson", tokens: "2.3k", rank: 8, isMe: false, avatar: "MH", color: "#14B8A6" },
    { id: 9, name: "Mike Hutchinson", tokens: "2.1k", rank: 9, isMe: false, avatar: "MH", color: "#8B5CF6" },
    { id: 10, name: "Mike Hutchinson", tokens: "1.9k", rank: 10, isMe: false, avatar: "MH", color: "#EF4444" },
    { id: 11, name: "Mike Hutchinson", tokens: "1.7k", rank: 11, isMe: false, avatar: "MH", color: "#F97316" },
    { id: 12, name: "Mike Hutchinson", tokens: "1.5k", rank: 12, isMe: false, avatar: "MH", color: "#06B6D4" },
    { id: 13, name: "Mike Hutchinson", tokens: "1.3k", rank: 13, isMe: false, avatar: "MH", color: "#84CC16" },
    { id: 14, name: "Mike Hutchinson", tokens: "1.1k", rank: 14, isMe: false, avatar: "MH", color: "#A855F7" },
    { id: 15, name: "Yas", tokens: "2k", rank: 15, isMe: true, avatar: "EJ", color: BLUE, nukes: 1 },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function Avatar({ initials, color, size = 36, border = false }: AvatarProps) {
    return (
        <div className="rounded-full flex items-center justify-center font-bold text-white flex-shrink-0"
            style={{
                width: size, height: size,
                background: color,
                fontSize: size * 0.32,
                boxShadow: border ? `0 0 0 3px white, 0 0 0 5px ${color}60` : "none",
            }}>
            {initials}
        </div>
    );
}

// ─── Nuke confirm modal ───────────────────────────────────────────────────────
function NukeConfirmModal({ target, variant = "default", onNuke, onCancel }: NukeConfirmModalProps) {
    const shields: Record<NukeVariant, { bg: string; accent: string; icon: string }> = {
        default: { bg: "#1a1a2e", accent: "#4F46E5", icon: "🛡️" },
        blue: { bg: "#0f2d5e", accent: BLUE, icon: "🛡️" },
        purple: { bg: "#2d1b69", accent: PURPLE, icon: "🛡️" },
    };
    const s = shields[variant];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)" }}
            onClick={onCancel}>
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xs overflow-hidden" onClick={e => e.stopPropagation()}>
                <div className="px-5 pt-5 pb-4 flex items-center gap-3"
                    style={{ background: `linear-gradient(135deg, ${s.bg}, ${s.accent}33)` }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-2xl"
                        style={{ background: `${s.accent}30` }}>
                        {s.icon}
                    </div>
                    <span className="font-black text-white text-lg">Nuke</span>
                </div>
                <div className="p-5">
                    <p className="text-sm text-gray-600 leading-relaxed mb-5">
                        You are about to nuke <span className="font-black text-gray-900">@{target}</span>!
                    </p>
                    <div className="flex gap-3">
                        <button onClick={onCancel}
                            className="flex-1 py-3 rounded-2xl text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all">
                            Back
                        </button>
                        <button onClick={onNuke}
                            className="flex-1 py-3 rounded-2xl text-sm font-bold text-white transition-all hover:opacity-90"
                            style={{ background: s.accent }}>
                            Nuke
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Nuke result modals ───────────────────────────────────────────────────────
function NukeResultModal({ type, target, tokens, onClose }: NukeResultModalProps) {
    const configs: Record<NukeResultType, {
        title: string;
        icon: string;
        iconBg: string;
        body: string;
        tokenColor: string;
        btn: string;
        btnBg: string;
        btnColor: string;
        headerBg: string;
    }> = {
        oops: {
            title: "Oops!",
            icon: "⚡",
            iconBg: "#FEF3C7",
            body: `@${target} is shielded so you lost`,
            tokenColor: YELLOW,
            btn: "Cancel",
            btnBg: "#F3F4F6",
            btnColor: "#374151",
            headerBg: "linear-gradient(135deg, #1a1a2e, #3730a3)",
        },
        magnificent: {
            title: "Magnificent!",
            icon: "💥",
            iconBg: "#DCFCE7",
            body: `You just nuked @${target} you gained`,
            tokenColor: GREEN,
            btn: "Collect",
            btnBg: GREEN,
            btnColor: "white",
            headerBg: "linear-gradient(135deg, #0f2d5e, #1d4ed8)",
        },
        incredible: {
            title: "Incredible",
            icon: "🌟",
            iconBg: "#FEF3C7",
            body: `You just ruled @${target} you gained`,
            tokenColor: YELLOW,
            btn: "Cancel",
            btnBg: YELLOW,
            btnColor: "#000",
            headerBg: "linear-gradient(135deg, #2d1b69, #7C3AED)",
        },
        nukehits: {
            title: "Nuke Hits!",
            icon: "💣",
            iconBg: "#FEE2E2",
            body: `You had 3 nuke hits, you lost`,
            tokenColor: YELLOW,
            btn: "Cancel",
            btnBg: "#F3F4F6",
            btnColor: "#374151",
            headerBg: "linear-gradient(135deg, #0f172a, #1e3a5f)",
        },
    };

    const cfg = configs[type];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)" }}
            onClick={onClose}>
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xs overflow-hidden" onClick={e => e.stopPropagation()}>
                <div className="px-5 pt-5 pb-4 flex items-center gap-3" style={{ background: cfg.headerBg }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-2xl"
                        style={{ background: "rgba(255,255,255,0.15)" }}>🛡️</div>
                    <span className="font-black text-white text-lg">{cfg.title}</span>
                </div>

                <div className="p-5 text-center">
                    <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-3xl"
                        style={{ background: cfg.iconBg }}>
                        {cfg.icon}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{cfg.body}</p>
                    <div className="flex items-center justify-center gap-1 font-black text-xl mb-5"
                        style={{ color: cfg.tokenColor }}>
                        {tokens} <Zap className="w-5 h-5" />
                    </div>
                    <button onClick={onClose}
                        className="w-full py-3 rounded-2xl text-sm font-bold transition-all hover:opacity-90"
                        style={{ background: cfg.btnBg, color: cfg.btnColor }}>
                        {cfg.btn}
                    </button>
                </div>
            </div>
        </div>
    );
}

// ─── Event ended modal ────────────────────────────────────────────────────────
function EventEndedModal({ onClose }: EventEndedModalProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)" }}
            onClick={onClose}>
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xs overflow-hidden" onClick={e => e.stopPropagation()}>
                <div className="px-5 pt-5 pb-4 flex items-center gap-3"
                    style={{ background: "linear-gradient(135deg, #1a1a2e, #7C3AED33)" }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-2xl bg-purple-900/30">🎉</div>
                    <span className="font-black text-white text-lg">Event Ended</span>
                    <span className="ml-auto text-xs text-purple-300 font-semibold">The Hunt</span>
                </div>
                <div className="p-5 text-center">
                    <div className="text-4xl mb-3">🏆</div>
                    <h3 className="font-black text-gray-900 text-lg mb-2">Congratulations!</h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-5">
                        You Ranked 2nd champion! You win a free gift! The Taskrill team will be contacting you within the next 7 days.
                    </p>
                    <button onClick={onClose}
                        className="w-full py-3 rounded-2xl text-sm font-bold text-white transition-all hover:opacity-90"
                        style={{ background: PURPLE }}>
                        Collect
                    </button>
                </div>
            </div>
        </div>
    );
}

// ─── Rank screen ──────────────────────────────────────────────────────────────
export default function RankScreen() {
    const [players] = useState<Player[]>(PLAYERS); // Removed setPlayers since it's not used
    const [modal, setModal] = useState<ModalState>(null);

    const me = players.find(p => p.isMe);
    const top3 = players.slice(0, 3);
    const rest = players.slice(3);

    const handleNukeClick = (player: Player) => {
        const variants: NukeVariant[] = ["default", "blue", "purple"];
        setModal({
            type: "nukeConfirm",
            target: player.name.split(" ")[0] + player.id,
            targetId: player.id,
            variant: variants[player.id % 3],
        });
    };

    const handleNuke = () => {
        if (!modal || modal.type !== "nukeConfirm") return;

        const results: NukeResultType[] = ["oops", "magnificent", "incredible", "nukehits"];
        const pick = results[Math.floor(Math.random() * results.length)];
        setModal({
            type: "nukeResult",
            resultType: pick,
            target: modal.target,
            tokens: pick === "oops" || pick === "nukehits" ? 5000 : pick === "magnificent" ? 500 : 3000,
        });
    };

    return (
        <div>
            {/* Hero banner */}
            <div className="rounded-3xl overflow-hidden mb-6 relative"
                style={{
                    background: "linear-gradient(135deg, #4C1D95 0%, #6D28D9 35%, #2563EB 70%, #1D4ED8 100%)",
                    minHeight: 200,
                }}>
                <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

                <div className="relative p-5">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <div className="text-white/70 text-xs font-bold uppercase tracking-wider">🌸 April Rush</div>
                            <div className="text-white font-black text-lg leading-tight">Top performers this month</div>
                        </div>
                        <div className="text-[10px] font-mono text-white/60 bg-white/10 px-2 py-1 rounded-lg">
                            ⏱ 10d:1h:23m
                        </div>
                    </div>

                    {/* Top 3 podium */}
                    <div className="flex items-end justify-center gap-4 pb-2">
                        {/* 2nd */}
                        {top3[1] && (
                            <div className="flex flex-col items-center gap-1.5">
                                <div className="text-lg">🥈</div>
                                <Avatar initials={top3[1].avatar} color={top3[1].color} size={48} border />
                                <div className="text-white text-[10px] font-bold text-center max-w-[60px] truncate">{top3[1].name.split(" ")[0]}</div>
                                <div className="text-yellow-300 text-[10px] font-black">{top3[1].tokens}</div>
                            </div>
                        )}
                        {/* 1st */}
                        {top3[0] && (
                            <div className="flex flex-col items-center gap-1.5 -mb-2">
                                <div className="text-2xl">👑</div>
                                <Avatar initials={top3[0].avatar} color={top3[0].color} size={60} border />
                                <div className="text-white text-xs font-black text-center max-w-[70px] truncate">{top3[0].name.split(" ")[0]}</div>
                                <div className="text-yellow-300 text-xs font-black">{top3[0].tokens}</div>
                            </div>
                        )}
                        {/* 3rd */}
                        {top3[2] && (
                            <div className="flex flex-col items-center gap-1.5">
                                <div className="text-lg">🥉</div>
                                <Avatar initials={top3[2].avatar} color={top3[2].color} size={48} border />
                                <div className="text-white text-[10px] font-bold text-center max-w-[60px] truncate">{top3[2].name.split(" ")[0]}</div>
                                <div className="text-yellow-300 text-[10px] font-black">{top3[2].tokens}</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* My position strip */}
            {me && (
                <div className="flex items-center gap-3 px-4 py-3 rounded-2xl mb-4 border border-blue-100"
                    style={{ background: `${BLUE}08` }}>
                    <span className="text-xs font-black text-gray-400 w-5 text-center">{me.rank}</span>
                    <Avatar initials={me.avatar} color={me.color} size={36} />
                    <div className="flex-1 min-w-0">
                        <div className="text-sm font-black text-gray-900">You</div>
                        <div className="flex items-center gap-1 text-xs text-gray-400">
                            <Zap className="w-3 h-3" style={{ color: YELLOW }} /> {me.tokens}
                            {me.nukes && (
                                <span className="ml-2 flex items-center gap-0.5 text-[10px] font-bold"
                                    style={{ color: PURPLE }}>
                                    💣 {me.nukes} nuke left
                                </span>
                            )}
                        </div>
                    </div>
                    <button
                        onClick={() => setModal({ type: "eventEnded" })}
                        className="px-3 py-1.5 rounded-xl text-[10px] font-bold text-white"
                        style={{ background: `linear-gradient(90deg, ${PURPLE}, ${BLUE})` }}>
                        View prize
                    </button>
                </div>
            )}

            {/* Ranked list (4–15) */}
            <div className="space-y-2">
                {rest.map((player) => (
                    <div key={player.id}
                        className={`flex items-center gap-3 px-4 py-3 rounded-2xl bg-white border transition-all ${player.isMe ? "border-blue-200" : "border-gray-100"
                            } shadow-sm`}>
                        <span className="text-xs font-black text-gray-400 w-5 text-center flex-shrink-0">{player.rank}</span>

                        <Avatar initials={player.avatar} color={player.color} size={36} />

                        <div className="flex-1 min-w-0">
                            <div className="text-sm font-bold text-gray-900 truncate">{player.name}</div>
                            <div className="flex items-center gap-1 text-xs text-gray-400">
                                <Zap className="w-3 h-3" style={{ color: YELLOW }} /> {player.tokens}
                            </div>
                        </div>

                        {!player.isMe && (
                            <button onClick={() => handleNukeClick(player)}
                                className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-[11px] font-bold text-white flex-shrink-0 transition-all hover:opacity-90 active:scale-95"
                                style={{ background: `linear-gradient(135deg, ${PURPLE}, ${BLUE})` }}>
                                💣 Nuke
                            </button>
                        )}
                        {player.isMe && (
                            <span className="text-[10px] font-bold px-2 py-1 rounded-lg"
                                style={{ background: `${BLUE}15`, color: BLUE }}>You</span>
                        )}
                    </div>
                ))}
            </div>

            {/* Modals */}
            {modal?.type === "nukeConfirm" && (
                <NukeConfirmModal
                    target={modal.target}
                    variant={modal.variant}
                    onNuke={handleNuke}
                    onCancel={() => setModal(null)}
                />
            )}
            {modal?.type === "nukeResult" && (
                <NukeResultModal
                    type={modal.resultType}
                    target={modal.target}
                    tokens={modal.tokens}
                    onClose={() => setModal(null)}
                />
            )}
            {modal?.type === "eventEnded" && (
                <EventEndedModal onClose={() => setModal(null)} />
            )}
        </div>
    );
}