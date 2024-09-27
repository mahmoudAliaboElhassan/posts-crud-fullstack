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
export const addPost = z.object({
  title: z
    .string({
      required_error: "title is required",
      invalid_type_error: "title should be of type string",
    })
    .min(2)
    .max(100),
  description: z
    .string({
      required_error: "description should be string",
      invalid_type_error: "description should be of type string",
    })
    .min(2)
    .max(200),
});
export const addComment = z.object({
  text: z
    .string({
      required_error: "Comment Text is required",
      invalid_type_error: "Comment Text should be of type string",
    })
    .min(2)
    .max(100),
  postId: z.number({
    required_error: "PostId is required",
    invalid_type_error: "PostId should be of type number",
  }),
});
export const updateCommentSchema = z.object({
  text: z
    .string({
      required_error: "Comment Text is required",
      invalid_type_error: "Comment Text should be of type string",
    })
    .min(2)
    .max(100),
});
export const updatePostSchema = z.object({
  title: z
    .string({
      required_error: "title is required",
      invalid_type_error: "title should be of type string",
    })
    .min(2)
    .max(100)
    .optional(),
  description: z
    .string({
      required_error: "description should be string",
      invalid_type_error: "description should be of type string",
    })
    .min(2)
    .max(200)
    .optional(),
});
export const updateUserPassword = z.object({
  currentPassword: z
    .string({
      required_error: "Current Password is required",
      invalid_type_error: "Current Password should be of type string",
    })
    .min(6, { message: "password should be at least 6 characters long" })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/, {
      message:
        "password must contain at least one letter and one number from server",
    }),
  newPassword: z
    .string({
      required_error: "New Password is required",
      invalid_type_error: "New Password should be of type string",
    })
    .min(6, { message: "password should be at least 6 characters long" })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/, {
      message:
        "password must contain at least one letter and one number from server",
    }),
});
