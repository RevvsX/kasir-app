import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import formschema from "@/components/pages/product-management/formschema";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method != "PUT") {
        res.status(405).json({
            status: "error",
            message: "Method not allowed"
        })
    }
    try {
        const { product_name, barcode, category, purchase_price, selling_price, stock } = formschema.parse(JSON.parse(req.body))

        const prisma = new PrismaClient()

        
        
        await prisma.product.update({where: {id: parseInt(req.query.id as string)}, data: { product_name: product_name, barcode: barcode, purchase_price: purchase_price, selling_price: selling_price, stock: stock, categoryId: parseInt(category) }})


        res.status(201).json({
            "status": "success",
            "message": "Product data successfully edited"
        })
    } catch (error) {
        res.status(500).json({
            "status": "error",
            "message": error
        })
    }
}