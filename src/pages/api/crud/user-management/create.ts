import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt"
import formschema from "@/components/pages/user-management/formschema";



export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method != "POST"){
        res.status(405).json({
            status: "error",
            message: "Method not allowed"
        })
    }
    try{

        const {full_name, username, password, role, address, phone_number} = formschema.parse(JSON.parse(req.body))

        const prisma = new PrismaClient()

        const isUserExist = await prisma.user.findUnique({where: {username: username}})

        if(isUserExist){
            res.status(403).json({
                "status": "Error!",
                "message" : "Username already exists"
            })
        }


        const hashedPassword = await bcrypt.hash(password, 8)


        await prisma.user.create({data: {full_name: full_name, username: username, password: hashedPassword, role: role, address: address as string, phone_number: phone_number as string}})

        res.status(201).json({
            "status": "success",
            "message": "User data successfully created"
        })
    }catch(error){
        res.status(500).json({
            "status": "error",
            "message": error
        })
    }
}