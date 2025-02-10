import { z } from "zod";

const formschema = z.object({
  category_name: z
    .string()
    .min(3, "Category name field must be at least 3 characters"),
});

export default formschema;
