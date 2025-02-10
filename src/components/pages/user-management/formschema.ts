import { z } from "zod";

const formschema = z.object({
  username: z.string().min(4, {
    message: "Username must be at least 4 characters",
  }),
  email: z.string().email({
    message: "Email is invalid",
  }),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters" }),
  address: z.string(),
  phone_number: z.string(),
});

export default formschema;
