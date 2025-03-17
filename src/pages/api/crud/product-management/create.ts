import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import formschema from "@/components/pages/product-management/formschema";
import { getToken } from "next-auth/jwt";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method != "POST") {
        res.status(405).json({
            status: "error",
            message: "Method not allowed"
        })
    }
    try {

        const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

        if (!token) {
            return res.status(401).json({ status: "error", message: "Unauthorized" });
        }

        if (token.role !== "ADMIN") {
            return res.status(403).json({ status: "error", message: "Forbidden" });
        }

        const { product_name, barcode, category, purchase_price, selling_price, stock } = formschema.parse(JSON.parse(req.body))

        const prisma = new PrismaClient()

        const fixed_selling_price = parseInt(selling_price) + parseInt(selling_price) * (11 / 100)



        await prisma.product.create({ data: { product_name: product_name, barcode: barcode, purchase_price: purchase_price, selling_price: fixed_selling_price.toString(), stock: stock, category: { connect: { id: parseInt(category) } } } })

        res.status(201).json({
            "status": "success",
            "message": "Category product data successfully created"
        })
    } catch (error) {
        res.status(500).json({
            "status": "error",
            "message": error
        })
    }
}