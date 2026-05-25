// components/DesktopTopBar.tsx
"use client"
import { Bell } from "lucide-react";
import { BLUE, Avatar } from "./../Shared";

export default function DesktopTopBar() {
    return (
        <div className="hidden lg:flex items-center justify-between mb-6">
            <div>
                <h1 className="text-2xl font-black text-gray-900" style={{ fontFamily: "'Syne', sans-serif" }}>Dashboard</h1>
                <p className="text-sm text-gray-400 mt-0.5">Welcome back, Eljay 👋</p>
            </div>
            <div className="flex items-center gap-3">
                <button className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-500 hover:border-gray-200 transition-all shadow-sm">
                    <Bell className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-2 bg-white border border-gray-100 rounded-2xl px-3 py-2 shadow-sm">
                    <Avatar initials="EJ" color={BLUE} size={32} />
                    <div>
                        <div className="text-sm font-bold text-gray-900">Eljay</div>
                        <div className="text-[10px] text-gray-400">Premium user</div>
                    </div>
                </div>
            </div>
        </div>
    );
}