// components/MobileHeader.tsx
"use client"
import { Bell, User } from "lucide-react";
import { BLUE, Avatar } from "../Shared";

export default function MobileHeader() {
    return (
        <div className="flex items-center justify-between px-4 pt-4 pb-2 lg:hidden">
            <div className="flex items-center gap-3">
                <Avatar initials="EJ" color={BLUE} size={40} />
                <div>
                    <div className="text-sm font-black text-gray-900">Hi Eljay</div>
                    <div className="text-xs text-gray-400">Welcome</div>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <button className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors">
                    <Bell className="w-4 h-4" />
                </button>
                <button className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors">
                    <User className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}