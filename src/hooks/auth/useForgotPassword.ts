// src/hooks/auth/useForgotPassword.ts
"use client";
import { useState } from "react";
import { authService } from "@/src/services/auth/authService";
import { ForgotPasswordPayload } from "@/src/types/auth";

export function useForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const forgotPassword = async (payload: ForgotPasswordPayload) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.forgotPassword(payload);
      return response;
    } catch (err: any) {
      const message =
        err.response?.data?.message || "Failed to send reset instructions";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { forgotPassword, isLoading, error };
}
