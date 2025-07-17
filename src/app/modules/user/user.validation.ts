import z from "zod";
import { IsActive, Role } from "./user.interface";

export const createdUserZodSchema = z.object({
  name: z
    .string({ invalid_type_error: "Name must be string" })
    .min(2, { message: "Name too sort. Minimum 2 character log" })
    .max(50, { message: "Name too long" }),
  email: z.string().email({ message: "Email must be required" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/^(?=.*[a-z])/, { message: " At least one lowercase letter" })
    .regex(/^(?=.*[A-Z])/, { message: "At least one uppercase letter" })
    .regex(/^(?=.*\d)/, { message: "At least one digit" })
    .regex(/^(?=.*[^A-Za-z\d])/, {
      message: "At least one special character (non-letter, non-digit)",
    }),

  address: z
    .string({ invalid_type_error: "Address myst be string" })
    .max(200, { message: "Address exceed 200 characters" })
    .optional(),

  phone: z
    .string()
    .regex(/^(?:\+8801|01)[3-9]\d{8}$/, {
      message: "Invalid Bangladeshi phone number",
    })
    .optional(),
});

//Update zod user schema
export const updatedUserZodSchema = z.object({
  name: z
    .string({ invalid_type_error: "Name must be string" })
    .min(2, { message: "Name too sort. Minimum 2 character log" })
    .max(50, { message: "Name too long" })
    .optional(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/^(?=.*[a-z])/, { message: " At least one lowercase letter" })
    .regex(/^(?=.*[A-Z])/, { message: "At least one uppercase letter" })
    .regex(/^(?=.*\d)/, { message: "At least one digit" })
    .regex(/^(?=.*[^A-Za-z\d])/, {
      message: "At least one special character (non-letter, non-digit)",
    })
    .optional(),

  address: z
    .string({ invalid_type_error: "Address myst be string" })
    .max(200, { message: "Address exceed 200 characters" })
    .optional(),

  phone: z
    .string()
    .regex(/^(?:\+8801|01)[3-9]\d{8}$/, {
      message: "Invalid Bangladeshi phone number",
    })
    .optional(),
  isDeleted: z
    .boolean({ invalid_type_error: "isDeleted must be true or false" })
    .optional(),
  isActive: z.enum(Object.values(IsActive) as [string]),
  isVerified: z
    .boolean({ invalid_type_error: "isDeleted must be true or false" })
    .optional(),

  role: z.enum(Object.values(Role) as [string]),
});
