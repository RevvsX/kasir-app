import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import formschema from "@/components/pages/member-management/formschema";
import { getToken } from "next-auth/jwt";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method != "PUT") {
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
        const { name, address, phone_number } = formschema.parse(JSON.parse(req.body))

        const prisma = new PrismaClient()



        await prisma.member.update({ where: { id: parseInt(req.query.id as string) }, data: { name: name, address: address, phone_number: phone_number, updated_at: new Date() } })


        res.status(201).json({
            "status": "success",
            "message": "Member data successfully edited"
        })
    } catch (error) {
        res.status(500).json({
            "status": "error",
            "message": error
        })
    }
}