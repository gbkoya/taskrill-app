// src/types/auth.ts
export interface APIResponse<T = unknown> {
  success: boolean;
  data: T;
  message: string;
  error: string;
  error_code: string;
  errors: Record<string, string>;
  timestamp: string;
}

export interface RegisterPayload {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: "male" | "female" | "other";
  referredBy?: string;
  ageConsent: boolean;
  timezone?: string;
}

export interface LoginPayload {
  emailOrUsername: string;
  password: string;
  deviceId?: string;
  deviceType?: "ios" | "android" | "web";
  deviceName?: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    isEmailVerified: boolean;
    avatar?: string;
    preferences?: {
      interests?: string[];
      pushNotifications?: boolean;
      emailNotifications?: boolean;
      smsNotifications?: boolean;
    };
  };
}

export interface VerifyOtpPayload {
  email?: string;
  code: string;
}

export interface ResendOtpPayload {
  email?: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface VerifyForgotPasswordOtpPayload {
  email: string;
  otp: string;
}

export interface ResetPasswordPayload {
  email: string;
  otp: string;
  newPassword: string;
}

export interface LogoutPayload {
  refreshToken: string;
  logoutAllDevices?: boolean;
}
