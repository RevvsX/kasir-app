import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt"
import { editFormSchema } from "@/components/pages/user-management/EditModal";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method != "PUT") {
        res.status(405).json({
            status: "error",
            message: "Method not allowed"
        })
    }
    try {
        const { full_name, username, password, role, address, phone_number } = editFormSchema.parse(JSON.parse(req.body))

        const prisma = new PrismaClient()

        const isUserExist = await prisma.user.findUnique({ where: { username: username, AND: {id: {not: parseInt(req.query.id as string)}} } })

        if (isUserExist) {
            res.status(403).json({
                "status": "Error!",
                "message": "Username already exists"
            })
        }

        
        if(password != ""){

            const hashedPassword = await bcrypt.hash(password as string, 8)
            await prisma.user.update({ where: {id: parseInt(req.query.id as string)}, data: { full_name: full_name, username: username, password: hashedPassword, role: role, address: address as string, phone_number: phone_number as string } })
        }else{
            await prisma.user.update({where: {id: parseInt(req.query.id as string)}, data: { full_name: full_name, username: username, role: role, address: address as string, phone_number: phone_number as string }})
        }


        res.status(201).json({
            "status": "success",
            "message": "User data successfully edited"
        })
    } catch (error) {
        res.status(500).json({
            "status": "error",
            "message": error
        })
    }
}