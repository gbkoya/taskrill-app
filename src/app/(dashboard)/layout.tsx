"use client"
import Sidebar from "@/src/components/dashboard/Sidebar";
import BottomTabs from "@/src/components/dashboard/BottomTabs";
import MobileHeader from "@/src/components/dashboard/MobileHeader";
import DesktopTopBar from "@/src/components/dashboard/DesktopTopBar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <div className="flex min-h-screen">
                <Sidebar />
                <div className="flex-1 min-w-0 min-h-screen">
                    <main className="min-h-screen">
                        <div className="lg:hidden sticky top-0 z-20 bg-gray-50 border-b border-gray-100">
                            <MobileHeader />
                        </div>
                        <div className="px-4 lg:px-8 pt-4 lg:pt-8 mx-auto">
                            <DesktopTopBar />
                            <div className="pb-24 lg:pb-8">
                                {children}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
            <BottomTabs />
        </div>
    );
}