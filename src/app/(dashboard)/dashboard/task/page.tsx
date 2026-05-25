"use client"
import { useState } from "react";
import {
    Bell, Settings, LogOut, User, ChevronRight, ChevronLeft,
    Plus, Users, Zap, X, Check, Minus, ChevronDown,
    AlertCircle, Loader2, Home, ClipboardList, Megaphone, CalendarDays, Trophy
} from "lucide-react";

const BLUE = "#0C84FD";
const YELLOW = "#FED403";
const PURPLE = "#7C3AED";
const GREEN = "#22C55E";
const RED = "#EF4444";

// ─── Types ────────────────────────────────────────────────────────────────
type PlatformId = "youtube" | "instagram" | "x" | "substack" | "spotify" | "playstore" | "reddit" | "medium" | "notion" | "appstore" | "tiktok" | "snapchat" | "apple" | "facebook";

interface Platform {
    id: PlatformId;
    label: string;
    color: string;
    bg: string;
    emoji: string;
}

type TaskType = "social" | "game";
type GameType = "tripleace" | "trivia";

interface Task {
    id: number;
    platform?: PlatformId;
    color?: string;
    title: string;
    desc: string;
    tokens: number;
    users?: number | null;
    completed: boolean;
    type?: TaskType;
    gameType?: GameType;
    nextIn?: string;
    highlighted?: boolean;
}

interface AvatarProps {
    initials: string;
    color: string;
    size?: number;
}

interface PlatformIconProps {
    platform: PlatformId;
    color: string;
    size?: number;
}

interface PlatformBadgeProps {
    platform: PlatformId;
    color: string;
    size?: number;
}

interface TaskCardProps {
    task: Task;
    onComplete?: (title: string) => void;
    onPlay?: (task: Task) => void;
    variant?: string;
}

interface OverlayProps {
    onClose: () => void;
    children: React.ReactNode;
}

interface ModalCardProps {
    children: React.ReactNode;
    className?: string;
}

// ─── Platform data ────────────────────────────────────────────────────────────
const PLATFORMS: Platform[] = [
    { id: "youtube", label: "YouTube", color: "#FF0000", bg: "#FF000015", emoji: "▶️" },
    { id: "instagram", label: "Instagram", color: "#E1306C", bg: "#E1306C15", emoji: "📸" },
    { id: "x", label: "X", color: "#000000", bg: "#00000015", emoji: "✖️" },
    { id: "substack", label: "Substack", color: "#FF6719", bg: "#FF671915", emoji: "📰" },
    { id: "spotify", label: "Spotify", color: "#1DB954", bg: "#1DB95415", emoji: "🎵" },
    { id: "playstore", label: "Play Store", color: "#34A853", bg: "#34A85315", emoji: "▶" },
    { id: "reddit", label: "Reddit", color: "#FF4500", bg: "#FF450015", emoji: "🔴" },
    { id: "medium", label: "Medium", color: "#000000", bg: "#00000015", emoji: "Ⓜ️" },
    { id: "notion", label: "Notion", color: "#000000", bg: "#00000015", emoji: "📋" },
    { id: "appstore", label: "App Store", color: "#0D84FE", bg: "#0D84FE15", emoji: "🍎" },
    { id: "tiktok", label: "TikTok", color: "#000000", bg: "#00000015", emoji: "🎵" },
    { id: "snapchat", label: "Snapchat", color: "#FFFC00", bg: "#FFFC0015", emoji: "👻" },
    { id: "apple", label: "Apple", color: "#000000", bg: "#00000015", emoji: "🍎" },
    { id: "facebook", label: "Facebook", color: "#1877F2", bg: "#1877F215", emoji: "📘" },
];

const TASK_TYPES = ["Connect", "Follow", "Like", "Comment", "Share", "Subscribe", "Retweet", "Download"];

// ─── Mock task list ────────────────────────────────────────────────────────────
const MOCK_TASKS: Task[] = [
    {
        id: 1, platform: "youtube", color: "#FF0000",
        title: "Subscribe to TechHub on YouTube",
        desc: "Subscribe @TechHub official on YouTube and earn coins instantly.",
        tokens: 750, users: 800, completed: false, type: "social",
    },
    {
        id: 2, type: "game", gameType: "tripleace",
        title: "Triple Ace",
        desc: "Uncover the characters and match three to claim your prize.",
        tokens: 500, users: null, nextIn: "1:2h:54mins:9secs", completed: false,
    },
    {
        id: 3, platform: "instagram", color: "#E1306C",
        title: "Follow TechHub on Instagram",
        desc: "Follow @TechHub official on Instagram and earn coins instantly.",
        tokens: 800, users: 4, completed: false, type: "social", highlighted: true,
    },
    {
        id: 4, type: "game", gameType: "trivia",
        title: "Trivia",
        desc: "How well do you know Ravy's Story? Answer all questions correctly to win all collectibles!",
        tokens: 25000, users: null, nextIn: "1:2h:54mins:9secs", completed: false,
    },
    {
        id: 5, platform: "x", color: "#000",
        title: "Retweet TechHub post on X",
        desc: "Retweet @TechHub post on X and earn coins instantly.",
        tokens: 300, users: 800, completed: false, type: "social",
    },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function Avatar({ initials, color, size = 36 }: AvatarProps) {
    return (
        <div className="rounded-full flex items-center justify-center font-bold text-white flex-shrink-0"
            style={{ width: size, height: size, background: color, fontSize: size * 0.35 }}>
            {initials}
        </div>
    );
}

function PlatformBadge({ platform, color, size = 36 }: PlatformBadgeProps) {
    return (
        <div className="rounded-xl flex items-center justify-center flex-shrink-0 border border-gray-100"
            style={{ width: size, height: size, background: `${color}12` }}>
        </div>
    );
}

// ─── Unified TaskCard Component ───────────────────────────────────────────────
function TaskCard({ task, onComplete, onPlay, variant = "default" }: TaskCardProps) {
    const isGame = task.type === "game";
    const isHighlighted = task.highlighted === true && !isGame;
    const isTripleAce = task.gameType === "tripleace";
    const isTrivia = task.gameType === "trivia";

    // Determine background
    let bgStyle: React.CSSProperties = {};
    if (isHighlighted) {
        bgStyle = { background: "linear-gradient(135deg, #FED403 0%, #FF9803 100%)" };
    }

    // Determine icon
    const renderIcon = () => {
        if (isTripleAce) {
            return <span className="text-2xl">🃏</span>;
        }
        if (isTrivia) {
            return <span className="text-2xl">🎮</span>;
        }
        return <span className="text-2xl">🔗</span>;
    };

    // Determine icon container style
    const iconBgStyle: React.CSSProperties = isHighlighted
        ? { background: "rgba(255,255,255,0.2)" }
        : isGame
            ? { background: isTrivia ? `${BLUE}15` : `${YELLOW}20` }
            : { background: `${task.color}12` };

    // Colors based on variant
    const titleColor = isHighlighted ? "text-white" : "text-gray-900";
    const descColor = isHighlighted ? "text-white/75" : "text-gray-400";
    const tokenColor = isHighlighted ? "text-white" : BLUE;
    const usersColor = isHighlighted ? "text-white/60" : "text-gray-400";
    const buttonBg: React.CSSProperties = isHighlighted
        ? { background: "#fff", color: "#FF9803" }
        : task.completed
            ? { background: GREEN }
            : { background: BLUE };
    const buttonText = isHighlighted
        ? "Start Task"
        : isGame
            ? "Play"
            : task.completed
                ? "Done ✓"
                : "Start Task";

    return (
        <div
            className="rounded-2xl p-4 border border-gray-100 shadow-sm relative overflow-hidden"
            style={bgStyle}
        >
            {/* Top-right tokens (absolute) */}
            <span
                className="absolute top-3 right-3 flex items-center gap-1 text-xs font-bold"
                style={{ color: isHighlighted ? "#fff" : BLUE }}
            >
                <Zap className="w-3 h-3" style={{ color: YELLOW }} />⚡ {task.tokens.toLocaleString()}
            </span>

            <div className="flex items-start gap-3">
                <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border border-gray-100"
                    style={iconBgStyle}
                >
                    {renderIcon()}
                </div>
                <div className="flex-1 min-w-0 pr-16">
                    <div className={`text-sm font-bold leading-tight ${titleColor}`}>{task.title}</div>
                    <div className={`text-xs mt-0.5 leading-relaxed ${descColor}`}>{task.desc}</div>
                </div>
            </div>

            <div className="flex items-center gap-3 mt-3">
                {task.users !== undefined && task.users !== null && (
                    <span className={`flex items-center gap-1 text-xs ${usersColor}`}>
                        <Users className="w-3 h-3" /> {task.users} users completed
                    </span>
                )}
                {task.nextIn && (
                    <span className={`text-[10px] ${usersColor}`}>
                        Next in: {task.nextIn}
                    </span>
                )}
                <button
                    onClick={() => {
                        if (isGame && onPlay) {
                            onPlay(task);
                        } else if (onComplete) {
                            onComplete(task.title);
                        }
                    }}
                    className="ml-auto px-4 py-2 rounded-xl text-xs font-bold transition-all hover:opacity-90 active:scale-95"
                    style={buttonBg}
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );
}

// ─── Modals ───────────────────────────────────────────────────────────────────
function Overlay({ onClose, children }: OverlayProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
            onClick={onClose}>
            <div onClick={e => e.stopPropagation()}>{children}</div>
        </div>
    );
}

function ModalCard({ children, className = "" }: ModalCardProps) {
    return (
        <div className={`bg-white rounded-3xl shadow-2xl w-full max-w-sm ${className}`}>
            {children}
        </div>
    );
}

interface PleaseNoteModalProps {
    onProceed: () => void;
    onCancel: () => void;
}

function PleaseNoteModal({ onProceed, onCancel }: PleaseNoteModalProps) {
    return (
        <Overlay onClose={onCancel}>
            <ModalCard>
                <div className="p-6 text-center">
                    <AlertCircle className="w-10 h-10 mx-auto mb-3" style={{ color: YELLOW }} />
                    <h3 className="font-black text-gray-900 text-lg mb-2">Please note!</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6">
                        Going back to undo a task you already did will cause you to lose tokens.
                    </p>
                    <div className="flex gap-3">
                        <button onClick={onProceed} className="flex-1 py-3 rounded-2xl text-sm font-bold text-white transition-all hover:opacity-90" style={{ background: BLUE }}>Proceed</button>
                        <button onClick={onCancel} className="flex-1 py-3 rounded-2xl text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all">Cancel</button>
                    </div>
                </div>
            </ModalCard>
        </Overlay>
    );
}

interface WrongModalProps {
    onNext: () => void;
}

function WrongModal({ onNext }: WrongModalProps) {
    return (
        <Overlay onClose={onNext}>
            <ModalCard>
                <div className="p-6 text-center">
                    <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: `${RED}15` }}>
                        <X className="w-8 h-8" style={{ color: RED }} />
                    </div>
                    <h3 className="font-black text-gray-900 text-xl mb-6">Wrong!</h3>
                    <button onClick={onNext} className="w-full py-3 rounded-2xl text-sm font-bold text-white" style={{ background: BLUE }}>Next</button>
                </div>
            </ModalCard>
        </Overlay>
    );
}

interface CorrectModalProps {
    onNext: () => void;
}

function CorrectModal({ onNext }: CorrectModalProps) {
    return (
        <Overlay onClose={onNext}>
            <ModalCard>
                <div className="p-6 text-center">
                    <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: `${GREEN}15` }}>
                        <Check className="w-8 h-8" style={{ color: GREEN }} />
                    </div>
                    <h3 className="font-black text-gray-900 text-xl mb-6">Correct!</h3>
                    <button onClick={onNext} className="w-full py-3 rounded-2xl text-sm font-bold text-white" style={{ background: BLUE }}>Next</button>
                </div>
            </ModalCard>
        </Overlay>
    );
}

interface TriviaModalProps {
    onClose: () => void;
}

function TriviaModal({ onClose }: TriviaModalProps) {
    const questions = [
        {
            q: "1. What's Ravy's Uncles name?",
            options: ["A. Uncle Brown", "B. Uncle Liam", "C. Uncle Sam", "D. Uncle Layu"],
            correct: 2,
        },
    ];
    const [selected, setSelected] = useState<number | null>(null);
    const [step, setStep] = useState<"quiz" | "wrong" | "correct" | "result">("quiz");

    const handleFinalAnswer = () => {
        if (selected === null) return;
        setStep(selected === questions[0].correct ? "correct" : "wrong");
    };

    if (step === "wrong") return <WrongModal onNext={() => setStep("quiz")} />;
    if (step === "correct") return <CorrectModal onNext={() => setStep("result")} />;
    if (step === "result") return (
        <Overlay onClose={onClose}>
            <ModalCard>
                <div className="p-6 text-center">
                    <div className="text-4xl mb-2">🎉</div>
                    <h3 className="font-black text-gray-900 text-xl mb-1">Congratulations!</h3>
                    <p className="text-gray-500 text-sm mb-3">You have won</p>
                    <div className="text-2xl font-black mb-1" style={{ color: GREEN }}>20000</div>
                    <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-6">
                        <span className="flex items-center gap-1"><span style={{ color: RED }}>●</span> 1 Wrong</span>
                        <span className="flex items-center gap-1"><span style={{ color: GREEN }}>●</span> 4 Correct</span>
                    </div>
                    <button onClick={onClose} className="w-full py-3 rounded-2xl text-sm font-bold text-white" style={{ background: BLUE }}>Done</button>
                </div>
            </ModalCard>
        </Overlay>
    );

    return (
        <Overlay onClose={onClose}>
            <ModalCard>
                <div className="p-5">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <span className="text-lg">🎮</span>
                            <span className="font-black text-gray-900">Ravy Story Trivia</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm font-black" style={{ color: YELLOW }}>
                            <Zap className="w-4 h-4" /> 5000
                        </div>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-700"><X className="w-4 h-4" /></button>
                    </div>
                    <div className="space-y-2 mb-5">
                        {questions[0].options.map((opt, i) => (
                            <button key={i} onClick={() => setSelected(i)}
                                className="w-full text-left px-4 py-3 rounded-2xl text-sm font-semibold border-2 transition-all"
                                style={{
                                    borderColor: selected === i ? BLUE : "#e5e7eb",
                                    background: selected === i ? `${BLUE}12` : "white",
                                    color: selected === i ? BLUE : "#374151",
                                }}>
                                {opt}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">1/5</span>
                        <button onClick={handleFinalAnswer}
                            className="px-6 py-2.5 rounded-2xl text-sm font-bold text-white transition-all hover:opacity-90"
                            style={{ background: selected !== null ? BLUE : "#D1D5DB" }}>
                            Final answer
                        </button>
                    </div>
                </div>
            </ModalCard>
        </Overlay>
    );
}

interface TriviaStartModalProps {
    onStart: () => void;
    onClose: () => void;
}

function TriviaStartModal({ onStart, onClose }: TriviaStartModalProps) {
    return (
        <Overlay onClose={onClose}>
            <ModalCard>
                <div className="p-6 text-center">
                    <div className="text-4xl mb-3">🎮</div>
                    <h3 className="font-black text-gray-900 text-lg mb-2">Trivia Time!</h3>
                    <p className="text-gray-500 text-sm mb-3">How well do you know Ravy? Each question is worth</p>
                    <div className="flex items-center justify-center gap-1 font-black text-xl mb-6" style={{ color: YELLOW }}>
                        5000 <Zap className="w-5 h-5" />
                    </div>
                    <button onClick={onStart} className="w-full py-3 rounded-2xl text-sm font-bold text-white" style={{ background: BLUE }}>Start</button>
                </div>
            </ModalCard>
        </Overlay>
    );
}

interface GuessWhatModalProps {
    onUse: () => void;
    onCancel: () => void;
}

function GuessWhatModal({ onUse, onCancel }: GuessWhatModalProps) {
    return (
        <Overlay onClose={onCancel}>
            <ModalCard>
                <div className="p-6 text-center">
                    <div className="text-4xl mb-3">🤖</div>
                    <h3 className="font-black text-gray-900 text-lg mb-2">Guess what</h3>
                    <p className="text-gray-500 text-sm mb-6">You have one free task upload</p>
                    <div className="flex gap-3">
                        <button onClick={onCancel} className="flex-1 py-3 rounded-2xl text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all">Cancel</button>
                        <button onClick={onUse} className="flex-1 py-3 rounded-2xl text-sm font-bold text-white transition-all hover:opacity-90" style={{ background: BLUE }}>Use</button>
                    </div>
                </div>
            </ModalCard>
        </Overlay>
    );
}

interface ProcessingModalProps {
    onClose: () => void;
}

function ProcessingModal({ onClose }: ProcessingModalProps) {
    return (
        <Overlay onClose={onClose}>
            <ModalCard>
                <div className="p-8 text-center">
                    <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin" style={{ color: BLUE }} />
                    <h3 className="font-black text-gray-900 text-xl mb-2" style={{ color: BLUE }}>Processing</h3>
                    <p className="text-gray-500 text-sm">Your task will be uploaded in a few minutes.</p>
                </div>
            </ModalCard>
        </Overlay>
    );
}

interface CancelGameModalProps {
    onYes: () => void;
    onNo: () => void;
}

function CancelGameModal({ onYes, onNo }: CancelGameModalProps) {
    return (
        <Overlay onClose={onNo}>
            <ModalCard>
                <div className="p-6 text-center">
                    <AlertCircle className="w-10 h-10 mx-auto mb-3" style={{ color: YELLOW }} />
                    <h3 className="font-black text-gray-900 text-lg mb-2">Please note!</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6">
                        If you cancel the game before the end you will loose your progress. Are you sure you want to cancel?
                    </p>
                    <div className="flex gap-3">
                        <button onClick={onYes} className="flex-1 py-3 rounded-2xl text-sm font-bold text-white" style={{ background: BLUE }}>Yes</button>
                        <button onClick={onNo} className="flex-1 py-3 rounded-2xl text-sm font-bold text-white" style={{ background: RED }}>No</button>
                    </div>
                </div>
            </ModalCard>
        </Overlay>
    );
}

type CreateTaskModalType = "guessWhat" | "processing" | "cancel" | null;

// ─── Create Task Form ─────────────────────────────────────────────────────────
interface CreateTaskFormProps {
    onBack: () => void;
}

function CreateTaskForm({ onBack }: CreateTaskFormProps) {
    const [platform, setPlatform] = useState<PlatformId | null>(null);
    const [taskType, setTaskType] = useState("");
    const [profileName, setProfileName] = useState("");
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDesc, setTaskDesc] = useState("");
    const [link, setLink] = useState("");
    const [tokenValue, setTokenValue] = useState(250);
    const [amount, setAmount] = useState(1000);
    const [duration, setDuration] = useState(3);
    const [durationAmount, setDurationAmount] = useState(50);
    const [location, setLocation] = useState("");
    const [gender, setGender] = useState("");
    const [interest, setInterest] = useState("");
    const [modal, setModal] = useState<CreateTaskModalType>(null);

    const handleProceed = () => setModal("guessWhat");
    const handleUseCredit = () => { setModal(null); setTimeout(() => setModal("processing"), 200); };
    const handleProcessingDone = () => { setModal(null); onBack(); };

    return (
        <div className="pb-24 lg:pb-8">
            {/* Header */}
            <div className="sticky top-0 z-20 bg-white border-b border-gray-100 -mt-4 -mx-4 lg:-mx-8 px-4 lg:px-8 py-4 mb-6 flex items-center justify-between">
                <button onClick={() => setModal("cancel")} className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors">
                    <ChevronLeft className="w-4 h-4" /> Create Task
                </button>
                <button onClick={handleProceed}
                    className="px-5 py-2 rounded-full text-sm font-bold text-white transition-all hover:opacity-90"
                    style={{ background: BLUE }}>
                    Create Task +
                </button>
            </div>

            <div className="max-w-2xl space-y-6">
                {/* Profile name */}
                <div>
                    <label className="text-xs font-black text-gray-700 uppercase tracking-wider mb-2 block">Profile Name</label>
                    <input value={profileName} onChange={e => setProfileName(e.target.value)}
                        placeholder="@techub_official"
                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all" />
                </div>

                {/* Task title */}
                <div>
                    <label className="text-xs font-black text-gray-700 uppercase tracking-wider mb-2 block">Task Title</label>
                    <input value={taskTitle} onChange={e => setTaskTitle(e.target.value)}
                        placeholder="e.g. Follow us on Instagram"
                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all" />
                </div>

                {/* Task description */}
                <div>
                    <label className="text-xs font-black text-gray-700 uppercase tracking-wider mb-2 block">Task Description</label>
                    <div className="relative">
                        <select value={taskType} onChange={e => setTaskType(e.target.value)}
                            className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white text-sm text-gray-700 appearance-none focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all">
                            <option value="">Connect</option>
                            {TASK_TYPES.map(t => <option key={t}>{t}</option>)}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                    <p className="text-[11px] text-blue-400 mt-1.5 px-1">
                        You just go and comment on my recent post @Eject task. Thank you
                    </p>
                </div>

                {/* Link */}
                <div>
                    <label className="text-xs font-black text-gray-700 uppercase tracking-wider mb-2 block">Link</label>
                    <input value={link} onChange={e => setLink(e.target.value)}
                        placeholder="https://www.facebook.com/task"
                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all" />
                </div>

                {/* Task value + amount */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs font-black text-gray-700 uppercase tracking-wider mb-2 block">Task Value</label>
                        <div className="flex items-center gap-2 px-4 py-3 rounded-2xl border border-gray-200 bg-white">
                            <Zap className="w-4 h-4 flex-shrink-0" style={{ color: YELLOW }} />
                            <input type="number" value={tokenValue} onChange={e => setTokenValue(+e.target.value)}
                                className="flex-1 min-w-0 text-sm font-bold text-gray-900 bg-transparent focus:outline-none" />
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-black text-gray-700 uppercase tracking-wider mb-2 block">Amount</label>
                        <input type="number" value={amount} onChange={e => setAmount(+e.target.value)}
                            className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white text-sm font-bold text-gray-900 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all" />
                    </div>
                </div>

                {/* Duration */}
                <div>
                    <label className="text-xs font-black text-gray-700 uppercase tracking-wider mb-2 block">Duration</label>
                    <div className="grid grid-cols-3 gap-3">
                        <input type="number" value={duration} onChange={e => setDuration(+e.target.value)}
                            className="px-3 py-3 rounded-2xl border border-gray-200 bg-white text-sm font-bold text-gray-900 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-center transition-all"
                            placeholder="3 days" />
                        <div className="flex items-center justify-center gap-2 px-3 py-3 rounded-2xl border border-gray-200 bg-white">
                            <button onClick={() => setDurationAmount(a => Math.max(0, a - 1))} className="w-6 h-6 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                                <Minus className="w-3 h-3 text-gray-600" />
                            </button>
                            <span className="text-sm font-bold text-gray-900 min-w-[20px] text-center">{durationAmount}</span>
                            <button onClick={() => setDurationAmount(a => a + 1)} className="w-6 h-6 rounded-lg flex items-center justify-center text-white transition-colors" style={{ background: BLUE }}>
                                <Plus className="w-3 h-3" />
                            </button>
                        </div>
                        <input type="number" value={durationAmount} onChange={e => setDurationAmount(+e.target.value)}
                            className="px-3 py-3 rounded-2xl border border-gray-200 bg-white text-sm font-bold text-gray-900 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-center transition-all" />
                    </div>
                </div>

                {/* Demography */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <label className="text-xs font-black text-gray-700 uppercase tracking-wider">Set Demography</label>
                        <ChevronDown className="w-4 h-4 text-blue-400" />
                    </div>

                    <div className="space-y-3">
                        <div>
                            <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Location</label>
                            <div className="relative">
                                <select value={location} onChange={e => setLocation(e.target.value)}
                                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white text-sm text-gray-700 appearance-none focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all">
                                    <option value="">Abuja</option>
                                    <option>Lagos</option>
                                    <option>Port Harcourt</option>
                                    <option>Kano</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Gender</label>
                            <div className="relative">
                                <select value={gender} onChange={e => setGender(e.target.value)}
                                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white text-sm text-gray-700 appearance-none focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all">
                                    <option value="">Female</option>
                                    <option>Male</option>
                                    <option>All</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Interest</label>
                            <div className="relative">
                                <select value={interest} onChange={e => setInterest(e.target.value)}
                                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white text-sm text-gray-700 appearance-none focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all">
                                    <option value="">Female</option>
                                    <option>Tech</option>
                                    <option>Fashion</option>
                                    <option>Gaming</option>
                                    <option>Finance</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer buttons */}
                <div className="flex gap-3 pt-2">
                    <button className="flex-1 py-4 rounded-2xl text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all">
                        Preview
                    </button>
                    <button onClick={handleProceed}
                        className="flex-1 py-4 rounded-2xl text-sm font-bold text-white transition-all hover:opacity-90"
                        style={{ background: BLUE }}>
                        Proceed
                    </button>
                </div>
            </div>

            {/* Modals */}
            {modal === "guessWhat" && <GuessWhatModal onUse={handleUseCredit} onCancel={() => setModal(null)} />}
            {modal === "processing" && <ProcessingModal onClose={handleProcessingDone} />}
            {modal === "cancel" && <CancelGameModal onYes={onBack} onNo={() => setModal(null)} />}
        </div>
    );
}

// ─── Task List ─────────────────────────────────────────────────────────────────
interface TaskListPageProps {
    onCreateTask: () => void;
}

type TaskListModalType = "triviaStart" | "trivia" | null;

function TaskListPage({ onCreateTask }: TaskListPageProps) {
    const [activeModal, setActiveModal] = useState<TaskListModalType>(null);
    const [activeTask, setActiveTask] = useState<Task | null>(null);

    const handlePlay = (task: Task) => {
        setActiveTask(task);
        if (task.gameType === "trivia") setActiveModal("triviaStart");
    };

    const handleComplete = (title: string) => {
        console.log(`Complete: ${title}`);
    };

    return (
        <>
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h2 className="text-xl font-black text-gray-900">Available Tasks</h2>
                </div>
                <button onClick={onCreateTask}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-gray-400 border border-gray-400 transition-all hover:opacity-90">
                    Create Task <Plus className="w-3.5 h-3.5" />
                </button>
            </div>

            {/* Task list */}
            <div className="space-y-3">
                {MOCK_TASKS.map(task => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onPlay={handlePlay}
                        onComplete={handleComplete}
                    />
                ))}
            </div>

            {/* Modals */}
            {activeModal === "triviaStart" && (
                <TriviaStartModal
                    onStart={() => setActiveModal("trivia")}
                    onClose={() => setActiveModal(null)} />
            )}
            {activeModal === "trivia" && (
                <TriviaModal onClose={() => setActiveModal(null)} />
            )}
        </>
    );
}

// ─── Main Task Component ─────────────────────────────────────────────────────
type PageView = "list" | "create";

export default function TaskPage() {
    const [view, setView] = useState<PageView>("list");

    if (view === "create") {
        return <CreateTaskForm onBack={() => setView("list")} />;
    }

    return <TaskListPage onCreateTask={() => setView("create")} />;
}