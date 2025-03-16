import { z } from "zod";

const formschema = z.object({
  product_name: z.string().min(1, "Product name is required"),
  purchase_price: z
    .string()
    .min(3, "Purchase price must be at least 3 characters"),
  selling_price: z
    .string()
    .min(3, "Selling price must be at least 3 characters"),
  stock: z.coerce.number().min(1, "Stock is required"),
  category: z.string().min(1, "Category is required"),
  barcode: z.string().min(1, "Barcode is required"),
});

export default formschema;
