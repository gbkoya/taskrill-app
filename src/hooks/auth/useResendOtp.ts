// src/hooks/auth/useResendOtp.ts
"use client";
import { useState } from "react";
import { authService } from "@/src/services/auth/authService";

export function useResendOtp() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resendOtp = async (email?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.resendOtp(
        email ? { email } : undefined,
      );
      return response;
    } catch (err: unknown) {
      const message = (err as { response?: { data?: { message?: string } } }).response?.data?.message || "Failed to resend OTP";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { resendOtp, isLoading, error };
}
