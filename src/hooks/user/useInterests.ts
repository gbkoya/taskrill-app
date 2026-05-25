// src/hooks/user/useInterests.ts
"use client";
import { useState } from "react";
import {
  interestsService,
  InterestsPayload,
} from "@/src/services/user/interestsService";
import { AxiosError, isAxiosError } from "axios";

interface ErrorResponse {
  message?: string;
  error?: string;
}

export function useInterests() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setInterests = async (payload: InterestsPayload) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await interestsService.setInterests(payload);
      return response;
    } catch (err: unknown) {
      let message = "Failed to set interests";

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

  return { setInterests, isLoading, error };
}
