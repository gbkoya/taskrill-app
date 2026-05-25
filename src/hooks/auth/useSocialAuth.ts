// src/hooks/auth/useSocialAuth.ts
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  authService,
  SocialLoginPayload,
} from "@/src/services/auth/authService";
import { useAuthStore } from "@/src/store/authStore";
import { AxiosError, isAxiosError } from "axios";

interface ErrorResponse {
  message?: string;
  error?: string;
}

export function useSocialAuth() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSocialLogin = async (
    provider: "apple" | "google",
    payload: SocialLoginPayload,
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const response =
        provider === "apple"
          ? await authService.loginWithApple(payload)
          : await authService.loginWithGoogle(payload);

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
            `${response.data.user.firstName} ${response.data.user.lastName}`.trim() ||
            response.data.user.username,
          email: response.data.user.email,
          avatar: response.data.user.avatar,
        };

        // Update auth store
        login(response.data.accessToken, user);

        // Check if user needs to complete onboarding
        const needsOnboarding =
          !response.data.user?.preferences?.interests?.length ||
          response.data.user?.preferences?.interests?.length === 0 ||
          !response.data.user?.avatar;

        if (needsOnboarding) {
          router.push("/auth/interests");
        } else {
          router.push("/dashboard");
        }
      }

      return response;
    } catch (err: unknown) {
      let message = `${provider} login failed`;

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

  return { handleSocialLogin, isLoading, error };
}
