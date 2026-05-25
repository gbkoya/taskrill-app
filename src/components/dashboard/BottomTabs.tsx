"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BLUE, navItems } from "./../Shared";

export default function BottomTabs() {
    const pathname = usePathname();
    const active = pathname.replace("/dashboard/", "") || "home";

    return (
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-100 flex">
            {navItems.map(({ id, label, icon: Icon }) => {
                const isActive = active === id;
                const href = id === "home" ? "/dashboard" : `/dashboard/${id}`;
                return (
                    <Link key={id} href={href} className="flex-1">
                        <div className="flex-1 flex flex-col items-center justify-center py-2.5 gap-0.5 transition-all">
                            <div
                                className="w-8 h-8 rounded-xl flex items-center justify-center transition-all"
                                style={isActive ? { background: `${BLUE}15` } : {}}
                            >
                                <Icon
                                    style={{ width: 20, height: 20, color: isActive ? BLUE : "#9CA3AF" }}
                                />
                            </div>
                            <span
                                className="text-[10px] font-semibold"
                                style={{ color: isActive ? BLUE : "#9CA3AF" }}
                            >
                                {label}
                            </span>
                        </div>
                    </Link>
                );
            })}
        </nav>
    );
}