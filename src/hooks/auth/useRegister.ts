// src/hooks/auth/useRegister.ts
"use client";
import { useState } from "react";
import { authService } from "@/src/services/auth/authService";
import { RegisterPayload } from "@/src/types/auth";
import { AxiosError, isAxiosError } from "axios";

interface ErrorResponse {
  message?: string;
  error?: string;
}

interface RegisterResponse {
  success: boolean;
  data?: {
    tokens?: {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
    };
    user?: unknown;
  };
  message?: string;
}

export function useRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (payload: RegisterPayload) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = (await authService.register(
        payload,
      )) as RegisterResponse;

      // Store tokens if they exist in the response
      if (response.success && response.data?.tokens) {
        localStorage.setItem("accessToken", response.data.tokens.accessToken);
        localStorage.setItem("refreshToken", response.data.tokens.refreshToken);

        // Store user info if needed
        if (response.data.user) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }
      }

      return response;
    } catch (err: unknown) {
      let message = "Registration failed";

      if (isAxiosError<ErrorResponse>(err)) {
        message =
          err.response?.data?.message || err.response?.data?.error || message;
      } else if (err instanceof Error) {
        message = err.message;
      }

      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading, error };
}
