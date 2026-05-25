// src/hooks/user/useAvatar.ts
"use client";
import { useState } from "react";
import {
  avatarService,
  Avatar,
  SelectAvatarPayload,
} from "@/src/services/user/avatarService";
import { AxiosError, isAxiosError } from "axios";

interface ErrorResponse {
  message?: string;
  error?: string;
}

export function useAvatar() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAvatars = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await avatarService.getAvatars();
      return response;
    } catch (err: unknown) {
      let message = "Failed to fetch avatars";

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

  const selectAvatar = async (payload: SelectAvatarPayload) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await avatarService.selectAvatar(payload);

      // Store selected avatar info if needed
      if (response.success) {
        localStorage.setItem("selectedAvatarId", payload.avatarId);
      }

      return response;
    } catch (err: unknown) {
      let message = "Failed to select avatar";

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

  return { getAvatars, selectAvatar, isLoading, error };
}
