// app/auth/register/registerationSchema.ts
import * as yup from "yup";

export const registerSchema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),

  username: yup
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must not exceed 20 characters")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores",
    )
    .required("Username is required"),

  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    )
    .required("Password is required"),

  firstName: yup
    .string()
    .min(1, "First name is required")
    .max(50, "First name must not exceed 50 characters")
    .required("First name is required"),

  lastName: yup
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name must not exceed 50 characters")
    .required("Last name is required"),

  phone: yup
    .string()
    .matches(
      /^\+[1-9]\d{1,14}$/,
      "Phone number must be in E.164 format (e.g., +2348165131008)",
    )
    .nullable()
    .optional(),

  dateOfBirth: yup.string().nullable().optional(),

  gender: yup
    .string()
    .oneOf(["male", "female", "other"], "Please select a valid gender")
    .nullable()
    .optional(),

  referredBy: yup.string().nullable().optional(),

  ageConsent: yup
    .boolean()
    .oneOf([true], "You must confirm that you are of legal age")
    .required("Age consent is required"),

  timezone: yup.string().nullable().optional(),
});

export type RegisterFormData = yup.InferType<typeof registerSchema>;
