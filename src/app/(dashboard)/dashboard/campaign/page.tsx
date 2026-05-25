"use client"
import { useState } from "react";
import {
    Home, ClipboardList, Megaphone, CalendarDays, Trophy,
    Bell, Settings, LogOut, User, ChevronRight, ChevronLeft,
    Plus, Edit2, Pause, Play, Trash2, RefreshCw, Check, X, Zap, Users
} from "lucide-react";

const BLUE = "#0C84FD";
const YELLOW = "#FED403";
const GREEN = "#22C55E";
const RED = "#EF4444";
const ORANGE = "#F97316";

// ─── Types ────────────────────────────────────────────────────────────────
type CampaignStatus = "active" | "paused" | "completed";

interface Campaign {
    id: number;
    platform: "instagram" | "x" | "youtube";
    color: string;
    title: string;
    created: string;
    ends: string;
    tokens: number;
    impression: string;
    conversions: string;
    status: CampaignStatus;
}

type ModalType = "delete" | "reactivated";
type ModalState = { type: ModalType; id?: number } | null;

// ─── Mock data ────────────────────────────────────────────────────────────────
const INIT_CAMPAIGNS: Campaign[] = [
    {
        id: 1, platform: "instagram", color: "#E1306C",
        title: "Instagram Follow Campaign",
        created: "Dec 15,2025", ends: "Jan 15, 2026.",
        tokens: 1500, impression: "45.2k", conversions: "892",
        status: "active",
    },
    {
        id: 2, platform: "x", color: "#000000",
        title: "X Follow Campaign",
        created: "Dec 15,2025", ends: "Jan 15, 2026.",
        tokens: 1500, impression: "45.2k", conversions: "892",
        status: "active",
    },
    {
        id: 3, platform: "youtube", color: "#FF0000",
        title: "YouTube Follow Campaign",
        created: "Dec 15,2025", ends: "Jan 15, 2026.",
        tokens: 1500, impression: "45.2k", conversions: "892",
        status: "active",
    },
    {
        id: 4, platform: "instagram", color: "#E1306C",
        title: "Instagram Follow Campaign",
        created: "Dec 15,2025", ends: "Jan 15, 2026.",
        tokens: 1500, impression: "45.2k", conversions: "892",
        status: "paused",
    },
    {
        id: 5, platform: "instagram", color: "#E1306C",
        title: "Instagram Follow Campaign",
        created: "Dec 15,2025", ends: "Jan 15, 2026.",
        tokens: 1500, impression: "45.2k", conversions: "892",
        status: "paused",
    },
];

// ─── Platform icons ───────────────────────────────────────────────────────────
interface PlatformIconProps {
    platform: "instagram" | "x" | "youtube";
    color: string;
    size?: number;
}

function PlatformIcon({ platform, color, size = 36 }: PlatformIconProps) {
    const icons = {
        instagram: (
            <svg viewBox="0 0 24 24" fill={color} style={{ width: 18, height: 18 }}>
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
        ),
        x: (
            <svg viewBox="0 0 24 24" fill={color} style={{ width: 18, height: 18 }}>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        ),
        youtube: (
            <svg viewBox="0 0 24 24" fill={color} style={{ width: 18, height: 18 }}>
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
        ),
    };
    return (
        <div className="rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ width: size, height: size, background: `${color}15`, border: `1px solid ${color}25` }}>
            {icons[platform] || <span style={{ fontSize: 16 }}>🔗</span>}
        </div>
    );
}

// ─── Modals ───────────────────────────────────────────────────────────────────
interface ConfirmDeleteModalProps {
    onYes: () => void;
    onNo: () => void;
}

function ConfirmDeleteModal({ onYes, onNo }: ConfirmDeleteModalProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}
            onClick={onNo}>
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xs p-6" onClick={e => e.stopPropagation()}>
                <p className="text-sm font-semibold text-gray-700 text-center mb-5 leading-relaxed">
                    Are you sure you want to delete this task?
                </p>
                <div className="flex gap-3">
                    <button onClick={onYes}
                        className="flex-1 py-3 rounded-2xl text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all">
                        Yes
                    </button>
                    <button onClick={onNo}
                        className="flex-1 py-3 rounded-2xl text-sm font-bold text-white transition-all hover:opacity-90"
                        style={{ background: BLUE }}>
                        No
                    </button>
                </div>
            </div>
        </div>
    );
}

interface CongratulationsModalProps {
    message: string;
    onClose: () => void;
}

function CongratulationsModal({ message, onClose }: CongratulationsModalProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}
            onClick={onClose}>
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xs p-8 text-center" onClick={e => e.stopPropagation()}>
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                    style={{ background: `${GREEN}18` }}>
                    <Check className="w-8 h-8" style={{ color: GREEN }} />
                </div>
                <h3 className="font-black text-gray-900 text-xl mb-2">Congratulations!</h3>
                <p className="text-gray-500 text-sm">{message}</p>
            </div>
        </div>
    );
}

// ─── Stat Cards ───────────────────────────────────────────────────────────────
function StatsRow() {
    return (
        <div className="grid grid-cols-2 gap-3 mb-5">
            {[
                { icon: "🪙", label: "Total Spent", value: "₦ 100,000" },
                { icon: "📊", label: "Total Impressions", value: "4.2 Million" },
            ].map((s, i) => (
                <div key={i} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col items-center gap-2">
                    <span className="text-3xl">{s.icon}</span>
                    <span className="text-xs text-gray-400 font-medium text-center">{s.label}</span>
                    <span className="text-base font-black text-gray-900">{s.value}</span>
                </div>
            ))}
        </div>
    );
}

// ─── Tab toggle ───────────────────────────────────────────────────────────────
interface TabToggleProps {
    activeTab: string;
    setActiveTab: (tab: "active" | "completed") => void;
}

function TabToggle({ activeTab, setActiveTab }: TabToggleProps) {
    return (
        <div className="flex gap-1 p-1 bg-gray-100 rounded-2xl mb-5 w-full">
            {["active", "completed"].map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab as "active" | "completed")}
                    className="flex-1 py-2.5 rounded-xl text-sm font-bold capitalize transition-all duration-200"
                    style={activeTab === tab
                        ? { background: BLUE, color: "white", boxShadow: `0 2px 8px ${BLUE}40` }
                        : { color: "#6B7280" }}>
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
            ))}
        </div>
    );
}

// ─── Campaign Card ─────────────────────────────────────────────────────────────
interface CampaignCardProps {
    campaign: Campaign;
    onEdit: (id: number) => void;
    onPause: (id: number) => void;
    onResume: (id: number) => void;
    onDelete: (id: number) => void;
    onReactivate: (id: number) => void;
}

function CampaignCard({ campaign, onEdit, onPause, onResume, onDelete, onReactivate }: CampaignCardProps) {
    const isActive = campaign.status === "active";
    const isPaused = campaign.status === "paused";
    const isCompleted = campaign.status === "completed";

    return (
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm relative mb-3">
            {/* Top-right tokens (absolute) */}
            <span
                className="absolute top-3 right-3 flex items-center gap-1 text-xs font-bold"
                style={{ color: BLUE }}
            >
                <Zap className="w-3 h-3" style={{ color: YELLOW }} />⚡ {campaign.tokens.toLocaleString()}
            </span>

            {/* Status badge */}
            {(isActive || isPaused) && (
                <div className="mb-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold"
                        style={isActive
                            ? { background: `${GREEN}18`, color: GREEN }
                            : { background: `${ORANGE}18`, color: ORANGE }}>
                        <span className="w-1.5 h-1.5 rounded-full"
                            style={{ background: isActive ? GREEN : ORANGE }} />
                        {isActive ? "Active" : "Paused"}
                    </span>
                </div>
            )}

            {/* Platform icon + info */}
            <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-gray-50 border border-gray-100">
                    <PlatformIcon platform={campaign.platform} color={campaign.color} />
                </div>
                <div className="flex-1 min-w-0 pr-16">
                    <div className="text-sm font-bold text-gray-900 leading-tight">{campaign.title}</div>
                    <div className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                        Created: {campaign.created} &nbsp;Ends: {campaign.ends}
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-3 mt-3 mb-4">
                <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Users className="w-3 h-3" /> {campaign.impression} impressions
                </div>
                <div className="text-xs text-gray-400">
                    {campaign.conversions} conversions
                </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2">
                {isCompleted && (
                    <>
                        <button onClick={() => onReactivate(campaign.id)}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white transition-all hover:opacity-90 flex-1 justify-center"
                            style={{ background: BLUE }}>
                            <RefreshCw className="w-3.5 h-3.5" /> Reactivate
                        </button>
                        <button onClick={() => onDelete(campaign.id)}
                            className="w-9 h-9 rounded-xl flex items-center justify-center border border-gray-200 hover:bg-red-50 hover:border-red-200 transition-all">
                            <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-400" />
                        </button>
                    </>
                )}

                {isActive && (
                    <>
                        <button onClick={() => onEdit(campaign.id)}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-gray-600 border border-gray-200 hover:bg-gray-50 transition-all">
                            <Edit2 className="w-3.5 h-3.5" /> Edit
                        </button>
                        <button onClick={() => onPause(campaign.id)}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-gray-600 border border-gray-200 hover:bg-gray-50 transition-all">
                            <Pause className="w-3.5 h-3.5" /> Pause
                        </button>
                        <button onClick={() => onDelete(campaign.id)}
                            className="w-9 h-9 rounded-xl flex items-center justify-center border border-gray-200 hover:bg-red-50 hover:border-red-200 transition-all ml-auto">
                            <Trash2 className="w-4 h-4 text-gray-400" />
                        </button>
                    </>
                )}

                {isPaused && (
                    <>
                        <button onClick={() => onEdit(campaign.id)}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-gray-600 border border-gray-200 hover:bg-gray-50 transition-all">
                            <Edit2 className="w-3.5 h-3.5" /> Edit
                        </button>
                        <button onClick={() => onResume(campaign.id)}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-gray-600 border border-gray-200 hover:bg-gray-50 transition-all">
                            <Play className="w-3.5 h-3.5" /> Resume
                        </button>
                        <button onClick={() => onDelete(campaign.id)}
                            className="w-9 h-9 rounded-xl flex items-center justify-center border border-gray-200 hover:bg-red-50 hover:border-red-200 transition-all ml-auto">
                            <Trash2 className="w-4 h-4 text-gray-400" />
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

// ─── Campaign screen ──────────────────────────────────────────────────────────
export default function CampaignScreen() {
    const [activeTab, setActiveTab] = useState<"active" | "completed">("active");
    const [campaigns, setCampaigns] = useState<Campaign[]>(INIT_CAMPAIGNS);
    const [modal, setModal] = useState<ModalState>(null);

    const filtered = campaigns.filter(c =>
        activeTab === "active"
            ? c.status === "active" || c.status === "paused"
            : c.status === "completed"
    );

    const groupedActive = {
        active: filtered.filter(c => c.status === "active"),
        paused: filtered.filter(c => c.status === "paused"),
    };

    const handlePause = (id: number) => {
        setCampaigns(prev => prev.map(c => c.id === id ? { ...c, status: "paused" } : c));
    };

    const handleResume = (id: number) => {
        setCampaigns(prev => prev.map(c => c.id === id ? { ...c, status: "active" } : c));
    };

    const handleDelete = (id: number) => {
        setModal({ type: "delete", id });
    };

    const confirmDelete = () => {
        if (modal && modal.id) {
            setCampaigns(prev => prev.filter(c => c.id !== modal.id));
        }
        setModal(null);
    };

    const handleReactivate = (id: number) => {
        setCampaigns(prev => prev.map(c => c.id === id ? { ...c, status: "active" } : c));
        setModal({ type: "reactivated" });
    };

    const handleEdit = (id: number) => {
        // navigate to edit — placeholder
        console.log("Edit campaign:", id);
    };

    return (
        <div>
            {/* Page header */}
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                    <button className="text-gray-500 hover:text-gray-800 transition-colors">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <h2 className="text-base font-black text-gray-900">Campaign</h2>
                </div>
                <button
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 transition-all shadow-sm">
                    <Plus className="w-3.5 h-3.5" /> Create Task
                </button>
            </div>

            {/* All campaigns label */}
            <div className="text-sm font-black text-gray-900 mb-4">All campaigns</div>

            {/* Stats */}
            <StatsRow />

            {/* Tab toggle */}
            <TabToggle activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Campaign lists */}
            {activeTab === "active" ? (
                <>
                    {groupedActive.active.length > 0 && (
                        <>
                            <div className="text-sm font-black text-gray-900 mb-3">Active campaigns</div>
                            {groupedActive.active.map(c => (
                                <CampaignCard key={c.id} campaign={c}
                                    onEdit={handleEdit} onPause={handlePause}
                                    onResume={handleResume} onDelete={handleDelete}
                                    onReactivate={handleReactivate} />
                            ))}
                        </>
                    )}

                    {groupedActive.paused.length > 0 && (
                        <>
                            <div className="text-sm font-black text-gray-900 mb-3 mt-2">Paused campaigns</div>
                            {groupedActive.paused.map(c => (
                                <CampaignCard key={c.id} campaign={c}
                                    onEdit={handleEdit} onPause={handlePause}
                                    onResume={handleResume} onDelete={handleDelete}
                                    onReactivate={handleReactivate} />
                            ))}
                        </>
                    )}

                    {filtered.length === 0 && (
                        <div className="text-center py-16 text-gray-400">
                            <Megaphone className="w-10 h-10 mx-auto mb-3 opacity-30" />
                            <p className="text-sm font-semibold">No active campaigns yet</p>
                        </div>
                    )}
                </>
            ) : (
                <>
                    {filtered.length > 0 ? (
                        <>
                            <div className="text-sm font-black text-gray-900 mb-3">Completed campaigns</div>
                            {filtered.map(c => (
                                <CampaignCard key={c.id} campaign={c}
                                    onEdit={handleEdit} onPause={handlePause}
                                    onResume={handleResume} onDelete={handleDelete}
                                    onReactivate={handleReactivate} />
                            ))}
                        </>
                    ) : (
                        <div className="text-center py-16 text-gray-400">
                            <Check className="w-10 h-10 mx-auto mb-3 opacity-30" />
                            <p className="text-sm font-semibold">No completed campaigns</p>
                        </div>
                    )}
                </>
            )}

            {/* Modals */}
            {modal?.type === "delete" && (
                <ConfirmDeleteModal onYes={confirmDelete} onNo={() => setModal(null)} />
            )}
            {modal?.type === "reactivated" && (
                <CongratulationsModal
                    message="Your task has been reactivated."
                    onClose={() => setModal(null)} />
            )}
        </div>
    );
}