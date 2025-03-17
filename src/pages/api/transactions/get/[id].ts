import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method != "GET") {
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
        
        const prisma = new PrismaClient()
        const id = req.query.id


        const getData = await prisma.transaction.findFirst({ where: { id: { equals: id as string } }, include: { user: true, member: true, TransactionDetail: { include: { product: true } } } })

        if (getData) {
            res.status(200).json({
                "status": "success",
                "data": getData
            })
        } else {
            res.status(404).json({
                "status": "error",
                "message": "Transaction not found"
            })
        }

    } catch (error) {
        res.status(500).json({
            "status": "error",
            "message": error
        })
    }
}