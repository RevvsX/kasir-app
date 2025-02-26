import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import formschema from "@/components/pages/categoryproduct-management/formschema";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method != "PUT") {
        res.status(405).json({
            status: "error",
            message: "Method not allowed"
        })
    }
    try {
        const { category_name } = formschema.parse(JSON.parse(req.body))

        const prisma = new PrismaClient()

        
        
        await prisma.category.update({where: {id: parseInt(req.query.id as string)}, data: { category_name: category_name }})


        res.status(201).json({
            "status": "success",
            "message": "Category product data successfully edited"
        })
    } catch (error) {
        res.status(500).json({
            "status": "error",
            "message": error
        })
    }
}