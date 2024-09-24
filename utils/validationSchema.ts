import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string({
      required_error: "username is required",
      invalid_type_error: "username should be of type string",
    })
    .min(2)
    .max(100),
  email: z
    .string({
      required_error: "email should be string",
      invalid_type_error: "email should be of type string",
    })
    .min(2)
    .email({ message: "must be of type email" }),
  password: z
    .string({
      required_error: "password is required",
      invalid_type_error: "password should be of type string",
    })
    .min(6, { message: "password should be at least 6 characters long" })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/, {
      message: "password must contain at least one letter and one number",
    }),
});
export const loginSchema = z.object({
  email: z
    .string({
      required_error: "email should be string",
      invalid_type_error: "email should be of type string",
    })
    .min(2)
    .email({ message: "must be of type email" }),
  password: z
    .string({
      required_error: "password is required",
      invalid_type_error: "password should be of type string",
    })
    .min(6, { message: "password should be at least 6 characters long" })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/, {
      message: "password must contain at least one letter and one number",
    }),
});

export const updateUserSchema = z.object({
  username: z
    .string({
      required_error: "username is required",
      invalid_type_error: "username should be of type string",
    })
    .min(2)
    .max(100)
    .optional(),
  email: z
    .string({
      required_error: "email should be string",
      invalid_type_error: "email should be of type string",
    })
    .min(2)
    .email({ message: "must be of type email" })
    .optional(),
  password: z
    .string({
      required_error: "password is required",
      invalid_type_error: "password should be of type string",
    })
    .min(6, { message: "password should be at least 6 characters long" })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/, {
      message:
        "password must contain at least one letter and one number from server",
    })
    .optional(),
});
