import { z } from "zod";

const formschema = z.object({
  event_name: z
    .string()
    .min(3, "Event name field must be at least 3 characters"),
  category: z.string(),
  discount: z.coerce.number(),
  minimal_purchase_price: z.coerce.number(),
  start_date: z.date(),
  end_date: z.date(),
});

export default formschema;
