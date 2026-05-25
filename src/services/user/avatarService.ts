// src/services/user/avatarService.ts
import { baseApi } from "@/src/config/api";
import { MODULE_ROUTE, Routes } from "@/src/config/routes";
import { APIResponse } from "@/src/types/auth";

export interface Avatar {
  id: string;
  avatarId: string;
  imageUrl: string;
  bgColor: string;
  name?: string;
}

export interface SelectAvatarPayload {
  avatarId: string;
}

export const avatarService = {
  getAvatars: async (): Promise<APIResponse<Avatar[]>> => {
    const { data } = await baseApi.get<APIResponse<Avatar[]>>(
      Routes[MODULE_ROUTE.USERS].AVATARS,
    );
    return data;
  },

  selectAvatar: async (payload: SelectAvatarPayload): Promise<APIResponse> => {
    const { data } = await baseApi.post<APIResponse>(
      Routes[MODULE_ROUTE.USERS].SELECT_AVATAR,
      payload,
    );
    return data;
  },
};
