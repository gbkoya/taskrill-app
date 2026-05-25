// src/hooks/auth/useResetPassword.ts
"use client";
import { useState } from "react";
import { authService } from "@/src/services/auth/authService";
import { ResetPasswordPayload } from "@/src/types/auth";

export function useResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetPassword = async (payload: ResetPasswordPayload) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.resetPassword(payload);
      return response;
    } catch (err: any) {
      const message = err.response?.data?.message || "Password reset failed";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { resetPassword, isLoading, error };
}
