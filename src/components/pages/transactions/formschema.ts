import { z } from "zod";

const formschema = z.object({
  total_price: z.coerce.number().positive().min(1, "Total price is required"),
  discount: z.coerce.number(),
  fixed_total_price: z.coerce.number().positive().min(1, "Fixed total price is required"),
  memberId: z.coerce.number().nullable(),
  paid: z.coerce.number().positive().min(1, "Money paid is required"),
  change: z.coerce.number().positive().min(1),
  products: z.array(
    z.object({
      id: z.number(),
      product_name: z.string(),
      purchase_price: z.string(),
      selling_price: z.string(),
      stock: z.number(),
      barcode: z.string(),
      quantity: z.number(),
      total_price: z.number(),
    })
  )
});

export default formschema;
