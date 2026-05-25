
// src/services/user/interestsService.ts
import { baseApi } from "@/src/config/api";
import { MODULE_ROUTE, Routes } from "@/src/config/routes";
import { APIResponse } from "@/src/types/auth";

export interface InterestsPayload {
  interests: string[];
}

export const interestsService = {
  setInterests: async (payload: InterestsPayload): Promise<APIResponse> => {
    const { data } = await baseApi.post<APIResponse>(
      Routes[MODULE_ROUTE.USERS].INTERESTS,
      payload,
    );
    return data;
  },
};