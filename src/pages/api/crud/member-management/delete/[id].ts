import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method != "DELETE") {
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
        const prisma = new PrismaClient()

        await prisma.member.delete({
            where: {
                id: parseInt(req.query.id as string)
            }
        })

        res.status(200).json({
            "status": "success",
            "message": "Member data successfuly deleted"
        })
    } catch (error) {
        res.status(500).json({
            "status": "Error!",
            "message": error
        })
    }
}