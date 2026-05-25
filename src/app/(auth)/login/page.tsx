"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, Easing } from "framer-motion";
import { Eye, EyeOff, AtSign, Lock, Loader2, AlertCircle } from "lucide-react";
import { useLogin } from "@/src/hooks/auth/useLogin";
import { useSocialAuth } from "@/src/hooks/auth/useSocialAuth";

declare global {
    interface Window {
        google?: {
            accounts: {
                oauth2: {
                    initTokenClient: (config: {
                        client_id: string;
                        scope: string;
                        callback: (response: GoogleTokenResponse) => void;
                    }) => {
                        requestAccessToken: () => void;
                    };
                };
            };
        };
        AppleID?: {
            auth: {
                init: (config: {
                    clientId: string;
                    scope: string;
                    redirectURI: string;
                    usePopup: boolean;
                }) => void;
                signIn: () => Promise<AppleSignInResponse>;
            };
        };
    }
}

interface GoogleTokenResponse {
    access_token: string;
    expires_in: number;
    scope: string;
    token_type: string;
}

interface AppleSignInResponse {
    authorization: {
        id_token: string;
        code: string;
        state: string;
    };
    user?: {
        name?: {
            firstName?: string;
            lastName?: string;
        };
        email?: string;
    };
}

const field = (delay: number) => ({
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.35, ease: "easeOut" as Easing | Easing[] },
});

const getStorage = (key: string): string =>
    typeof window !== "undefined" ? (localStorage.getItem(key) ?? "") : "";

export default function LoginPage() {
    const router = useRouter();
    const { login, isLoading: isLoginLoading, error: loginError } = useLogin();
    const { handleSocialLogin, isLoading: isSocialLoading, error: socialError } = useSocialAuth();
    const [showPassword, setShowPassword] = useState(false);

    const [rememberMe, setRememberMe] = useState<boolean>(
        () => !!getStorage("rememberedUsername")
    );

    const [form, setForm] = useState(() => ({
        username: getStorage("rememberedUsername"),
        password: "",
    }));

    const isLoading = isLoginLoading || isSocialLoading;
    const error = loginError || socialError;

    // Only generates deviceId on the client — no setState, no lint warning
    useEffect(() => {
        if (!localStorage.getItem("deviceId")) {
            const deviceId = `web_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
            localStorage.setItem("deviceId", deviceId);
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await login({
            emailOrUsername: form.username,
            password: form.password,
        });
    };

    const handleRememberMeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        setRememberMe(isChecked);
        if (isChecked && form.username) {
            localStorage.setItem("rememberedUsername", form.username);
        } else if (!isChecked) {
            localStorage.removeItem("rememberedUsername");
        }
    };

    const handleGoogleLogin = async () => {
        const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
        if (!clientId) {
            console.error("Google Client ID not configured");
            return;
        }

        const initGoogleAuth = () => {
            if (typeof window !== "undefined" && window.google) {
                const client = window.google.accounts.oauth2.initTokenClient({
                    client_id: clientId,
                    scope: "email profile",
                    callback: async (response: GoogleTokenResponse) => {
                        if (response.access_token) {
                            await handleSocialLogin("google", {
                                token: response.access_token,
                                deviceId: localStorage.getItem("deviceId") || undefined,
                                deviceType: "web",
                                deviceName: navigator.userAgent,
                            });
                        }
                    },
                });
                client.requestAccessToken();
            }
        };

        if (typeof window !== "undefined" && window.google) {
            initGoogleAuth();
        } else {
            const script = document.createElement("script");
            script.src = "https://accounts.google.com/gsi/client";
            script.async = true;
            script.defer = true;
            script.onload = initGoogleAuth;
            document.body.appendChild(script);
        }
    };

    const handleAppleLogin = async () => {
        const clientId = process.env.NEXT_PUBLIC_APPLE_CLIENT_ID;
        if (!clientId) {
            console.error("Apple Client ID not configured");
            return;
        }

        const initAppleAuth = () => {
            if (typeof window !== "undefined" && window.AppleID) {
                window.AppleID.auth.init({
                    clientId: clientId,
                    scope: "name email",
                    redirectURI: window.location.origin + "/auth/callback",
                    usePopup: true,
                });

                window.AppleID.auth
                    .signIn()
                    .then(async (response: AppleSignInResponse) => {
                        if (response.authorization?.id_token) {
                            await handleSocialLogin("apple", {
                                token: response.authorization.id_token,
                                deviceId: localStorage.getItem("deviceId") || undefined,
                                deviceType: "web",
                                deviceName: navigator.userAgent,
                                fullName: response.user?.name
                                    ? `${response.user.name.firstName || ""} ${response.user.name.lastName || ""}`.trim()
                                    : undefined,
                            });
                        }
                    })
                    .catch((err: Error) => {
                        console.error("Apple sign in failed:", err);
                    });
            }
        };

        if (typeof window !== "undefined" && window.AppleID) {
            initAppleAuth();
        } else {
            const script = document.createElement("script");
            script.src =
                "https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js";
            script.async = true;
            script.defer = true;
            script.onload = initAppleAuth;
            document.body.appendChild(script);
        }
    };

    const inputClass =
        "w-full h-11 rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-[#1a7cd4] focus:ring-2 focus:ring-[#1a7cd4]/10 transition-all disabled:bg-gray-50 disabled:cursor-not-allowed";

    return (
        <div>
            <motion.div {...field(0)}>
                <h1 className="text-2xl font-bold text-center text-gray-900 mb-1">Sign In</h1>
                <p className="text-sm text-center text-gray-500 mb-7">
                    Sign in to access your account
                </p>
            </motion.div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-50 border border-red-200 rounded-xl p-3"
                    >
                        <div className="flex items-start gap-2">
                            <AlertCircle size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-red-600">{error}</p>
                        </div>
                    </motion.div>
                )}

                <motion.div {...field(0.05)}>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                        Username or Email
                    </label>
                    <div className="relative">
                        <AtSign
                            size={15}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                            type="text"
                            placeholder="username or email"
                            className={`${inputClass} pl-9`}
                            value={form.username}
                            onChange={(e) => setForm({ ...form, username: e.target.value })}
                            required
                            disabled={isLoading}
                        />
                    </div>
                </motion.div>

                <motion.div {...field(0.1)}>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                        Password
                    </label>
                    <div className="relative">
                        <Lock
                            size={15}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className={`${inputClass} pl-9 pr-10`}
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            required
                            disabled={isLoading}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            disabled={isLoading}
                        >
                            {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                    </div>
                </motion.div>

                <motion.div {...field(0.15)} className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={handleRememberMeChange}
                            className="w-4 h-4 rounded accent-[#1a7cd4]"
                            disabled={isLoading}
                        />
                        <span className="text-xs text-gray-500">Remember me</span>
                    </label>
                    <Link
                        href="/forgot-password"
                        className="text-xs text-[#1a7cd4] hover:underline font-medium"
                    >
                        Forgot password?
                    </Link>
                </motion.div>

                <motion.button
                    {...field(0.2)}
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-11 rounded-xl bg-[#1a7cd4] text-white text-sm font-semibold mt-1 hover:bg-[#1568bb] active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <Loader2 size={16} className="animate-spin" />
                            Signing in...
                        </>
                    ) : (
                        "Sign In"
                    )}
                </motion.button>

                <motion.div {...field(0.25)} className="flex items-center gap-3 my-1">
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="text-xs text-gray-400">Or sign in with</span>
                    <div className="flex-1 h-px bg-gray-200" />
                </motion.div>

                <motion.div {...field(0.3)} className="flex gap-3">
                    <button
                        type="button"
                        onClick={handleAppleLogin}
                        disabled={isLoading}
                        className="flex-1 h-11 rounded-xl flex items-center justify-center gap-2 text-sm text-gray-700 font-medium hover:bg-gray-50 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.39.07 2.35.77 3.16.83 1.2-.25 2.35-.98 3.63-.84 1.54.19 2.7.81 3.46 2.02-3.17 1.87-2.42 5.98.69 7.14-.55 1.39-1.27 2.77-2.94 3.73zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                        </svg>
                        Apple
                    </button>
                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        disabled={isLoading}
                        className="flex-1 h-11 rounded-xl flex items-center justify-center gap-2 text-sm text-gray-700 font-medium hover:bg-gray-50 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24">
                            <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                            />
                            <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                            />
                            <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                fill="#EA4335"
                            />
                        </svg>
                        Google
                    </button>
                </motion.div>

                <motion.p {...field(0.35)} className="text-center text-xs text-gray-500">
                    New member?{" "}
                    <Link href="/register" className="text-[#1a7cd4] font-medium hover:underline">
                        Register Now
                    </Link>
                </motion.p>
            </form>
        </div>
    );
}