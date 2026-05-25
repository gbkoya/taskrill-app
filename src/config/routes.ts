// src/config/routes.ts
enum MODULE_ROUTE {
  AUTH = "v1/auth",
  USERS = "v1/users", 
}

const Routes = {
  [MODULE_ROUTE.AUTH]: {
    REGISTER: `${MODULE_ROUTE.AUTH}/register`,
    LOGIN: `${MODULE_ROUTE.AUTH}/login`,
    REFRESH: `${MODULE_ROUTE.AUTH}/refresh`,
    LOGOUT: `${MODULE_ROUTE.AUTH}/logout`,
    FORGOT_PASSWORD: `${MODULE_ROUTE.AUTH}/forgot-password`,
    VERIFY_FORGOT_PASSWORD_OTP: `${MODULE_ROUTE.AUTH}/verify-forgot-password-otp`,
    RESET_PASSWORD: `${MODULE_ROUTE.AUTH}/reset-password`,
    VERIFY_EMAIL: `${MODULE_ROUTE.AUTH}/verify-email`,
    VERIFY_EMAIL_TOKEN: `${MODULE_ROUTE.AUTH}/verify-email-token`,
    RESEND_VERIFICATION: `${MODULE_ROUTE.AUTH}/resend-verification`,
    ACCOUNT_STATUS: `${MODULE_ROUTE.AUTH}/account-status`,
    VERIFY_OTP: `${MODULE_ROUTE.AUTH}/verify-email`,
    RESEND_OTP: `${MODULE_ROUTE.AUTH}/resend-verification`,
    APPLE: `${MODULE_ROUTE.AUTH}/apple`,
    GOOGLE: `${MODULE_ROUTE.AUTH}/google`,
  },
  [MODULE_ROUTE.USERS]: {
    INTERESTS: `${MODULE_ROUTE.USERS}/interests`,
    AVATARS: `${MODULE_ROUTE.USERS}/avatars`,
    SELECT_AVATAR: `${MODULE_ROUTE.USERS}/avatar/select`,
  },
}; ;

export { MODULE_ROUTE, Routes };
