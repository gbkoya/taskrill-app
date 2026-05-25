// components/layout/Footer.tsx
import Image from "next/image";
import { TbBrandX, TbBrandInstagram, TbBrandLinkedin } from "react-icons/tb";

const BRAND_BLUE = "#0C84FD";

const socials = [
    { icon: TbBrandX, href: "#", label: "X / Twitter" },
    { icon: TbBrandInstagram, href: "#", label: "Instagram" },
    { icon: TbBrandLinkedin, href: "#", label: "LinkedIn" },
];

const links = ["Privacy", "Terms", "Contact"];

export function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100 transition-colors duration-300">
            <div className="mx-auto px-6 md:px-16 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Logo */}
                <Image
                    src="/images/taskrill-logo.png"
                    alt="Taskrill"
                    width={90}
                    height={22}
                    priority
                />

                {/* Center: copyright + links */}
                <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-400 transition-colors duration-300">
                    <span>© {new Date().getFullYear()} Taskrill. All rights reserved.</span>
                    <span className="hidden sm:inline text-gray-200">·</span>
                    <div className="flex gap-5">
                        {links.map((l) => (
                            <a
                                key={l}
                                href="#"
                                className="hover:text-gray-900 transition-colors duration-200"
                            >
                                {l}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Social icons */}
                <div className="flex items-center gap-3">
                    {socials.map(({ icon: Icon, href, label }) => (
                        <a
                            key={label}
                            href={href}
                            aria-label={label}
                            className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 border border-gray-100 hover:border-gray-300 hover:text-gray-900 bg-white transition-all duration-200 hover:scale-110"
                        >
                            <Icon className="w-4 h-4" />
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}