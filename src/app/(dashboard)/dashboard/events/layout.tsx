import DesktopTopBar from "@/src/components/dashboard/DesktopTopBar";

export default function EventsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <div className="">
                {children}
            </div>
        </>
    );
}