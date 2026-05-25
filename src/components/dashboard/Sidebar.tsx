"use client"
import { Bell, ChevronRight, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BLUE, navItems, Avatar } from "../Shared";

export default function Sidebar() {
    const pathname = usePathname();
    // Remove '/dashboard' from the path to get the active tab
    const active = pathname.replace("/dashboard/", "") || "home";

    return (
        <aside className="hidden lg:flex flex-col w-64 h-screen sticky top-0 flex-shrink-0 bg-white border-r border-gray-100 overflow-y-auto">
            {/* Logo */}
            <div className="px-6 py-6 border-b border-gray-100">
                <Link href="/dashboard">
                    <div className="flex items-center gap-3 cursor-pointer">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-lg" style={{ background: BLUE }}>T</div>
                        <span className="font-black text-xl text-gray-900" style={{ fontFamily: "'Syne', sans-serif" }}>Taskrill</span>
                    </div>
                </Link>
            </div>

            {/* User card */}
            <div className="px-4 py-4 border-b border-gray-100">
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50">
                    <Avatar initials="EJ" color={BLUE} size={40} />
                    <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold text-gray-900 truncate">Hi Eljay</div>
                        <div className="text-xs text-gray-400">Welcome back 👋</div>
                    </div>
                    <button className="w-7 h-7 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors">
                        <Bell className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                {navItems.map(({ id, label, icon: Icon }) => {
                    const isActive = active === id;
                    const href = id === "home" ? "/dashboard" : `/dashboard/${id}`;
                    return (
                        <Link key={id} href={href}>
                            <div
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 cursor-pointer ${isActive
                                    ? "text-white shadow-lg"
                                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                                    }`}
                                style={isActive ? { background: BLUE } : {}}
                            >
                                <Icon className="w-4.5 h-4.5 flex-shrink-0" style={{ width: 18, height: 18 }} />
                                {label}
                                {isActive && <ChevronRight className="w-4 h-4 ml-auto opacity-70" />}
                            </div>
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom actions */}
            <div className="px-3 py-4 border-t border-gray-100 space-y-1">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-gray-500 hover:bg-gray-50 hover:text-gray-800 transition-all">
                    <Settings style={{ width: 18, height: 18 }} /> Settings
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-red-400 hover:bg-red-50 transition-all">
                    <LogOut style={{ width: 18, height: 18 }} /> Log out
                </button>
            </div>
        </aside>
    );
}