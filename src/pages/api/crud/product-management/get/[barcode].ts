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

        if (token.role !== "ADMIN") {
            return res.status(403).json({ status: "error", message: "Forbidden" });
        }
        const prisma = new PrismaClient()
        const barcode = req.query.barcode


        const getData = await prisma.product.findFirst({ where: { barcode: { equals: barcode as string }, stock: { not: 0 } } })

        if (getData) {
            res.status(200).json({
                "status": "success",
                "data": getData
            })
        } else {
            res.status(404).json({
                "status": "error",
                "message": "Product not found or out of stock"
            })
        }

    } catch (error) {
        res.status(500).json({
            "status": "error",
            "message": error
        })
    }
}