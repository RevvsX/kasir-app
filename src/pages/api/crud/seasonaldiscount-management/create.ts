import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import formschema from "@/components/pages/seasonaldiscount-management/formschema";
import { getToken } from "next-auth/jwt";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method != "POST") {
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


        const { event_name, discount, minimal_purchase_price, end_date, start_date, category } = formschema.parse({
            ...JSON.parse(req.body),
            start_date: new Date(JSON.parse(req.body).start_date),
            end_date: new Date(JSON.parse(req.body).end_date),
        })


        const prisma = new PrismaClient()



        await prisma.seasonalDiscount.create({ data: { event_name: event_name, discount: discount, categoryId: parseInt(category), minimal_purchase_price: minimal_purchase_price, end_date: end_date, start_date: start_date } })

        res.status(201).json({
            "status": "success",
            "message": "Category product data successfully created"
        })
    } catch (error) {
        res.status(500).json({
            "status": "error",
            "message": error
        })
    }
}