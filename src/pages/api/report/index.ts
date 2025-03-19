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

        const { startDate, endDate } = req.query

        const prisma = new PrismaClient()

        const result = await prisma.$queryRaw`
            CALL GetTotalProfit(${startDate}, ${endDate});
        `;

        type RowData = Record<string, unknown>;

        const convertBigInt = <T extends RowData>(data: T[] | unknown): T[] => {
            if (!Array.isArray(data)) {
                throw new Error("Invalid data format: Expected an array");
            }

            return data.map((row) =>
                Object.fromEntries(
                    Object.entries(row).map(([key, value]) =>
                        [key, typeof value === "bigint" ? Number(value) : value]
                    )
                ) as T
            );
        };

        return res.status(200).json({
            "status": "success",
            "data": convertBigInt(result)[0]
        });
    } catch (error) {
        res.status(500).json({
            "status": "error",
            "message": error
        })
    }
}