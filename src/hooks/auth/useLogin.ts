// src/hooks/auth/useLogin.ts
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/src/services/auth/authService";
import { LoginPayload } from "@/src/types/auth";
import { useAuthStore } from "@/src/store/authStore";
import { AxiosError, isAxiosError } from "axios";

interface ErrorResponse {
  message?: string;
  error?: string;
}

export function useLogin() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (payload: LoginPayload) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.login(payload);

      if (response.success && response.data) {
        // Store tokens in localStorage for axios interceptor
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);

        // Store user info
        if (response.data.user) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }

        // Transform user data to match your store's User type
        const user = {
          id: response.data.user.id,
          name:
            `${response.data.user.firstName || ""} ${response.data.user.lastName || ""}`.trim() ||
            response.data.user.username,
          email: response.data.user.email,
          avatar: response.data.user.avatar,
          firstName: response.data.user.firstName,
          lastName: response.data.user.lastName,
          username: response.data.user.username,
          isEmailVerified: response.data.user.isEmailVerified,
          preferences: response.data.user.preferences, // This will now work
        };

        // Update auth store
        login(response.data.accessToken, user);

        // Check if user needs to complete onboarding
        const needsOnboarding =
          !user?.preferences?.interests?.length ||
          user?.preferences?.interests?.length === 0;

        if (needsOnboarding) {
          router.push("/auth/interests");
        } else {
          router.push("/dashboard");
        }
      }

      return response;
    } catch (err: unknown) {
      let message = "Login failed";

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

  return { login: handleLogin, isLoading, error };
}
