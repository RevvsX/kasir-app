import { z } from "zod";

const formschema = z.object({
  full_name: z.string().trim().min(1, "Full name is required"),
  username: z
    .string()
    .trim()
    .min(4, { message: "Username must be at least 4 characters" }),
  password: z
    .string()
    .trim()
    .min(4, { message: "Password must be at least 4 characters" }),
  role: z.enum(["ADMIN", "OFFICER"]),
  address: z.string().trim().optional(),
  phone_number: z
    .string()
    .trim()
    .regex(/^(\+62|0)[0-9]{9,13}$/, {
      message: "Invalid phone number format (must be 10-14 digits)",
    })
    .optional(),
});

export default formschema;
