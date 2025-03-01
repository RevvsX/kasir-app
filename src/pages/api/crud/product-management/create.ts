import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import formschema from "@/components/pages/product-management/formschema";



export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method != "POST"){
        res.status(405).json({
            status: "error",
            message: "Method not allowed"
        })
    }
    try{

        const {product_name, barcode, category, purchase_price, selling_price, stock} = formschema.parse(JSON.parse(req.body))

        const prisma = new PrismaClient()



        await prisma.product.create({data: {product_name: product_name, barcode: barcode, purchase_price: purchase_price, selling_price: selling_price, stock: parseInt(stock),category: {connect: {id: parseInt(category)}}}})

        res.status(201).json({
            "status": "success",
            "message": "Category product data successfully created"
        })
    }catch(error){
        res.status(500).json({
            "status": "error",
            "message": error
        })
    }
}