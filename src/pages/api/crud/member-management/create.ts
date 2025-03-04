import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import formschema from "@/components/pages/member-management/formschema";



export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method != "POST"){
        res.status(405).json({
            status: "error",
            message: "Method not allowed"
        })
    }
    try{

        const {name, address, phone_number} = formschema.parse(JSON.parse(req.body))

        const prisma = new PrismaClient()



        await prisma.member.create({data: {name: name, address:address, phone_number:phone_number }})

        res.status(201).json({
            "status": "success",
            "message": "Member data successfully created"
        })
    }catch(error){
        res.status(500).json({
            "status": "error",
            "message": error
        })
    }
}