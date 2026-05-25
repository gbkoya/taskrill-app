// src/services/auth/authService.ts
import { baseApi } from "@/src/config/api";
import { MODULE_ROUTE, Routes } from "@/src/config/routes"; // Add MODULE_ROUTE import
import {
  APIResponse,
  RegisterPayload,
  LoginPayload,
  LoginResponse,
  VerifyOtpPayload,
  ResendOtpPayload,
  ForgotPasswordPayload,
  VerifyForgotPasswordOtpPayload,
  ResetPasswordPayload,
  LogoutPayload,
} from "@/src/types/auth";

export interface SocialLoginPayload {
  token: string;
  deviceId?: string;
  deviceType?: string;
  deviceName?: string;
  fullName?: string;
}


export const authService = {
  register: async (payload: RegisterPayload): Promise<APIResponse> => {
    const { data } = await baseApi.post<APIResponse>(
      Routes[MODULE_ROUTE.AUTH].REGISTER,
      payload,
    );
    return data;
  },

  login: async (payload: LoginPayload): Promise<APIResponse<LoginResponse>> => {
    const { data } = await baseApi.post<APIResponse<LoginResponse>>(
      Routes[MODULE_ROUTE.AUTH].LOGIN,
      payload,
    );
    return data;
  },

  loginWithApple: async (
    payload: SocialLoginPayload,
  ): Promise<APIResponse<LoginResponse>> => {
    const { data } = await baseApi.post<APIResponse<LoginResponse>>(
      Routes[MODULE_ROUTE.AUTH].APPLE,
      payload,
    );
    return data;
  },

  loginWithGoogle: async (
    payload: SocialLoginPayload,
  ): Promise<APIResponse<LoginResponse>> => {
    const { data } = await baseApi.post<APIResponse<LoginResponse>>(
      Routes[MODULE_ROUTE.AUTH].GOOGLE,
      payload,
    );
    return data;
  },

  verifyOtp: async (payload: VerifyOtpPayload): Promise<APIResponse> => {
    const { data } = await baseApi.post<APIResponse>(
      Routes[MODULE_ROUTE.AUTH].VERIFY_OTP,
      payload,
    );
    return data;
  },

  resendOtp: async (payload?: ResendOtpPayload): Promise<APIResponse> => {
    const { data } = await baseApi.post<APIResponse>(
      Routes[MODULE_ROUTE.AUTH].RESEND_OTP,
      payload || {},
    );
    return data;
  },

  forgotPassword: async (
    payload: ForgotPasswordPayload,
  ): Promise<APIResponse> => {
    const { data } = await baseApi.post<APIResponse>(
      Routes[MODULE_ROUTE.AUTH].FORGOT_PASSWORD,
      payload,
    );
    return data;
  },

  verifyForgotPasswordOtp: async (
    payload: VerifyForgotPasswordOtpPayload,
  ): Promise<APIResponse> => {
    const { data } = await baseApi.post<APIResponse>(
      Routes[MODULE_ROUTE.AUTH].VERIFY_FORGOT_PASSWORD_OTP,
      payload,
    );
    return data;
  },

  resetPassword: async (
    payload: ResetPasswordPayload,
  ): Promise<APIResponse> => {
    const { data } = await baseApi.post<APIResponse>(
      Routes[MODULE_ROUTE.AUTH].RESET_PASSWORD,
      payload,
    );
    return data;
  },

  logout: async (payload: LogoutPayload): Promise<void> => {
    await baseApi.post(Routes[MODULE_ROUTE.AUTH].LOGOUT, payload);
  },
};
