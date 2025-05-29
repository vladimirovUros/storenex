import z from "zod";

export const registerSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters long" })
    .max(100, {
      message: "Password must be at most 100 characters long",
    }),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(50, { message: "Username must be at most 50 characters long" })
    .regex(
      /^[a-z0-9][a-z0-9-]*[a-z0-9]$/,
      "Username must start and end with a letter or number, and can only contain letters, numbers, and hyphens"
    )
    .refine((value) => !value.includes("--"), {
      message: "Username cannot contain consecutive hyphens",
    })
    .refine((value) => !value.startsWith("-") && !value.endsWith("-"), {
      message: "Username cannot start or end with a hyphen",
    })
    .refine((value) => !value.includes(" "), {
      message: "Username cannot contain spaces",
    })
    .transform((value) => value.toLowerCase()),
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string({ message: "Password is required" }),
});
