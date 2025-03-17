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
        const { pagenumber, pagelimit, search } = req.query
        const prisma = new PrismaClient()

        const skipping = parseInt(pagelimit as string) * (parseInt(pagenumber as string) - 1)

        let product;
        let count;

        if (search == "") {
            product = await prisma.product.findMany({ skip: skipping, take: parseInt(pagelimit as string), include: { category: true }, orderBy: { id: "desc" } })
            count = await prisma.product.count()
        } else {
            product = await prisma.product.findMany({
                skip: skipping, take: parseInt(pagelimit as string), where: {
                    product_name: {
                        contains: search as string
                    }
                },
                include: { category: true },
                orderBy: { id: "desc" }
            })

            count = await prisma.product.count({ where: { product_name: { contains: search as string } } })
        }

        count = Math.ceil(count / parseInt(pagelimit as string))



        res.status(200).json({
            "status": "success",
            "data": product,
            "meta": {
                "pagecount": count
            }
        })
    } catch (error) {
        res.status(500).json({
            "status": "error",
            "message": error
        })
    }
}