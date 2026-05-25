// app/auth/register/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, Easing } from "framer-motion";
import { Eye, EyeOff, User, Mail, Phone, Lock, AtSign, AlertCircle, Loader2, Calendar, Users } from "lucide-react";
import { useRegister } from "@/src/hooks/auth/useRegister";
import { ValidationError } from "yup";
import { registerSchema, RegisterFormData } from "./registerationSchema";

interface FormErrors {
    [key: string]: string;
}

const field = (delay: number) => ({
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: {
        delay,
        duration: 0.35,
        ease: "easeOut" as Easing | Easing[]
    },
});

export default function RegisterPage() {
    const router = useRouter();
    const { register, isLoading, error } = useRegister();
    const [showPassword, setShowPassword] = useState(false);
    const [formErrors, setFormErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
    const [form, setForm] = useState<RegisterFormData>({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        phone: "",
        dateOfBirth: "",
        gender: "male",
        referredBy: "",
        ageConsent: false,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });

    const validateField = async (fieldName: keyof RegisterFormData, value: string | boolean | null | undefined) => {
        try {
            await registerSchema.validateAt(fieldName, { [fieldName]: value });
            setFormErrors(prev => ({ ...prev, [fieldName]: "" }));
            return true;
        } catch (err) {
            if (err instanceof ValidationError) {
                setFormErrors(prev => ({ ...prev, [fieldName]: err.message }));
                return false;
            }
            return true;
        }
    };

    const validateForm = async () => {
        try {
            await registerSchema.validate(form, { abortEarly: false });
            setFormErrors({});
            return true;
        } catch (err) {
            if (err instanceof ValidationError) {
                const errors: FormErrors = {};
                err.inner.forEach((validationErr) => {
                    if (validationErr.path) {
                        errors[validationErr.path] = validationErr.message;
                    }
                });
                setFormErrors(errors);
            }
            return false;
        }
    };

    const handleBlur = (fieldName: keyof RegisterFormData) => {
        setTouched(prev => ({ ...prev, [fieldName]: true }));
        validateField(fieldName, form[fieldName]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Check terms agreement using form.ageConsent
        if (!form.ageConsent) {
            setFormErrors(prev => ({ ...prev, ageConsent: "You must agree to the terms and conditions" }));
            return;
        }

        // Mark all fields as touched
        const allTouched = Object.keys(form).reduce((acc, key) => {
            acc[key] = true;
            return acc;
        }, {} as { [key: string]: boolean });
        setTouched(allTouched);

        // Validate form
        const isValid = await validateForm();

        if (!isValid) {
            return;
        }

        // Check required fields
        if (!form.firstName || !form.lastName || !form.username || !form.email || !form.password) {
            return;
        }

        try {
            const response = await register({
                email: form.email,
                username: form.username,
                password: form.password,
                firstName: form.firstName,
                lastName: form.lastName,
                phone: form.phone || undefined,
                dateOfBirth: form.dateOfBirth || undefined,
                gender: form.gender || undefined,
                referredBy: form.referredBy || undefined,
                ageConsent: true,
                timezone: form.timezone || undefined,
            });

            if (response.success) {
                sessionStorage.setItem("registerEmail", form.email);
                router.push("/verify-otp");
            }
        } catch (err) {
            // Error is handled by the hook and displayed via the error state
        }
    };

    const inputClass = "w-full h-11 rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-[#1a7cd4] focus:ring-2 focus:ring-[#1a7cd4]/10 transition-all disabled:bg-gray-50 disabled:cursor-not-allowed";
    const inputErrorClass = "border-red-300 focus:border-red-500 focus:ring-red-500/10";

    return (
        <div className="max-h-[80vh] overflow-y-auto px-1">
            <motion.div {...field(0)}>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">Create Account</h1>
                <p className="text-sm text-gray-500 mb-7">Create your account to get started</p>
            </motion.div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Error Message from API */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, ease: "easeOut" as Easing | Easing[] }}
                        className="bg-red-50 border border-red-200 rounded-xl p-3"
                    >
                        <div className="flex items-start gap-2">
                            <AlertCircle size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                                <p className="text-sm font-medium text-red-700 mb-1">Registration Failed</p>
                                <p className="text-xs text-red-600">{error}</p>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* First Name & Last Name - Side by side */}
                <div className="grid grid-cols-2 gap-3">
                    <motion.div {...field(0.05)}>
                        <label className="block text-xs font-medium text-gray-600 mb-1.5">
                            First Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="John"
                                className={`${inputClass} pl-9 ${touched.firstName && formErrors.firstName ? inputErrorClass : ""}`}
                                value={form.firstName}
                                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                                onBlur={() => handleBlur("firstName")}
                                required
                                disabled={isLoading}
                            />
                        </div>
                        {touched.firstName && formErrors.firstName && (
                            <p className="text-xs text-red-500 mt-1">{formErrors.firstName}</p>
                        )}
                    </motion.div>

                    <motion.div {...field(0.07)}>
                        <label className="block text-xs font-medium text-gray-600 mb-1.5">
                            Last Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Doe"
                                className={`${inputClass} pl-9 ${touched.lastName && formErrors.lastName ? inputErrorClass : ""}`}
                                value={form.lastName}
                                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                                onBlur={() => handleBlur("lastName")}
                                required
                                disabled={isLoading}
                            />
                        </div>
                        {touched.lastName && formErrors.lastName && (
                            <p className="text-xs text-red-500 mt-1">{formErrors.lastName}</p>
                        )}
                    </motion.div>
                </div>

                {/* Username */}
                <motion.div {...field(0.1)}>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                        Username <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <AtSign size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="john_doe"
                            className={`${inputClass} pl-9 ${touched.username && formErrors.username ? inputErrorClass : ""}`}
                            value={form.username}
                            onChange={(e) => setForm({ ...form, username: e.target.value.toLowerCase().replace(/\s/g, '_') })}
                            onBlur={() => handleBlur("username")}
                            required
                            disabled={isLoading}
                        />
                    </div>
                    {touched.username && formErrors.username && (
                        <p className="text-xs text-red-500 mt-1">{formErrors.username}</p>
                    )}
                </motion.div>

                {/* Email */}
                <motion.div {...field(0.15)}>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                        Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="email"
                            placeholder="john@example.com"
                            className={`${inputClass} pl-9 ${touched.email && formErrors.email ? inputErrorClass : ""}`}
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            onBlur={() => handleBlur("email")}
                            required
                            disabled={isLoading}
                        />
                    </div>
                    {touched.email && formErrors.email && (
                        <p className="text-xs text-red-500 mt-1">{formErrors.email}</p>
                    )}
                </motion.div>

                {/* Phone */}
                <motion.div {...field(0.2)}>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                        Phone Number <span className="text-gray-400 text-xs">(E.164 format)</span>
                    </label>
                    <div className="relative">
                        <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="tel"
                            placeholder="+2348165131008"
                            className={`${inputClass} pl-9 ${touched.phone && formErrors.phone ? inputErrorClass : ""}`}
                            value={form.phone || ""}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            onBlur={() => handleBlur("phone")}
                            disabled={isLoading}
                        />
                    </div>
                    {touched.phone && formErrors.phone && (
                        <p className="text-xs text-red-500 mt-1">{formErrors.phone}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-1">Format: +[country code][number] (e.g., +2348165131008)</p>
                </motion.div>

                {/* Password */}
                <motion.div {...field(0.25)}>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                        Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a strong password"
                            className={`${inputClass} pl-9 pr-10 ${touched.password && formErrors.password ? inputErrorClass : ""}`}
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            onBlur={() => handleBlur("password")}
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
                    {touched.password && formErrors.password && (
                        <p className="text-xs text-red-500 mt-1">{formErrors.password}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-1">Must contain uppercase, lowercase, number & special character</p>
                </motion.div>

                {/* Date of Birth & Gender - Optional */}
                <div className="grid grid-cols-2 gap-3">
                    <motion.div {...field(0.3)}>
                        <label className="block text-xs font-medium text-gray-600 mb-1.5">Date of Birth</label>
                        <div className="relative">
                            <Calendar size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="date"
                                className={`${inputClass} pl-9`}
                                value={form.dateOfBirth || ""}
                                onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })}
                                disabled={isLoading}
                            />
                        </div>
                    </motion.div>

                    <motion.div {...field(0.32)}>
                        <label className="block text-xs font-medium text-gray-600 mb-1.5">Gender</label>
                        <div className="relative">
                            <Users size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                            <select
                                className={`${inputClass} pl-9 appearance-none`}
                                value={form.gender || ""}
                                onChange={(e) => setForm({ ...form, gender: e.target.value as "male" | "female" | "other" })}
                                disabled={isLoading}
                            >
                                <option value="">Select gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </motion.div>
                </div>

                {/* Referral Code */}
                <motion.div {...field(0.35)}>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Referral Code (Optional)</label>
                    <div className="relative">
                        <AtSign size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Enter referral code"
                            className={inputClass}
                            value={form.referredBy || ""}
                            onChange={(e) => setForm({ ...form, referredBy: e.target.value.toUpperCase() })}
                            disabled={isLoading}
                        />
                    </div>
                </motion.div>

                {/* Terms Checkbox */}
                <motion.label {...field(0.4)} className="flex items-start gap-2.5 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={form.ageConsent}
                        onChange={(e) => {
                            const isChecked = e.target.checked;
                            setForm(prev => ({ ...prev, ageConsent: isChecked }));
                            if (formErrors.ageConsent) {
                                setFormErrors(prev => ({ ...prev, ageConsent: "" }));
                            }
                        }}
                        className="mt-0.5 w-4 h-4 rounded accent-[#1a7cd4] cursor-pointer"
                        disabled={isLoading}
                    />
                    <span className="text-xs text-gray-500 leading-relaxed">
                        By clicking on the box you agree to{" "}
                        <Link href="/terms" className="text-[#1a7cd4] hover:underline">terms</Link>
                        {" "}and{" "}
                        <Link href="/conditions" className="text-[#1a7cd4] hover:underline">conditions</Link>
                    </span>
                </motion.label>

                {/* Age Consent Error */}
                {formErrors.ageConsent && (
                    <p className="text-xs text-red-500 -mt-2">{formErrors.ageConsent}</p>
                )}

                {/* Submit Button */}
                <motion.button
                    {...field(0.45)}
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-11 rounded-xl bg-[#1a7cd4] text-white text-sm font-semibold mt-1 hover:bg-[#1568bb] active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <Loader2 size={16} className="animate-spin" />
                            Creating Account...
                        </>
                    ) : (
                        "Create Account"
                    )}
                </motion.button>

                {/* Login Link */}
                <motion.p {...field(0.5)} className="text-center text-xs text-gray-500">
                    Already have an account?{" "}
                    <Link href="/login" className="text-[#1a7cd4] font-medium hover:underline">
                        Log in
                    </Link>
                </motion.p>
            </form>
        </div>
    );
}