import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method != "GET"){
        res.status(405).json({
            status: "error",
            message: "Method not allowed"
        })
    }

    try{
        const prisma = new PrismaClient()
        const barcode = req.query.barcode


        const getData = await prisma.product.findFirst({where: {barcode: {equals: barcode as string}}})
        
        if(getData){
            res.status(200).json({
                "status": "success",
                "data": getData
            })
        }else{
            res.status(404).json({
                "status" : "error",
                "message" : "Product not found"
            })
        }
        
    }catch(error){
        res.status(500).json({
            "status": "error",
            "message": error
        })
    }
}