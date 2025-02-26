import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";



export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method != "DELETE"){
        res.status(405).json({
            status: "error",
            message: "Method not allowed"
        })
    }
    try{
        const prisma = new PrismaClient()
        
        await prisma.category.delete({where: {
            id: parseInt(req.query.id as string)
        }})

        res.status(200).json({
            "status": "success",
            "message": "Category product data successfuly deleted"
        })
    }catch(error){
        res.status(500).json({
            "status": "Error!",
            "message" : error
        })
    }
}