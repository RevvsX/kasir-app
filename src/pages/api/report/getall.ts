import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({
            status: "error",
            message: "Method not allowed",
        });
    }

    try {
        const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

        if (!token) {
            return res.status(401).json({ status: "error", message: "Unauthorized" });
        }

        if (token.role !== "ADMIN") {
            return res.status(403).json({ status: "error", message: "Forbidden" });
        }

        const { startDate, endDate } = req.query;

        if (!startDate || !endDate) {
            return res.status(400).json({ status: "error", message: "Missing date range" });
        }

        const prisma = new PrismaClient();

        const result = await prisma.$queryRaw`
            CALL GetTotalProfit(${startDate}, ${endDate});
        `;

        const transactions = await prisma.transaction.findMany({
            where: {
                created_at: {
                    gte: new Date(startDate as string),
                    lte: new Date(endDate as string),
                }
            },
            orderBy: { id: "desc" },
            include: { user: true, member: true },
        });

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
            status: "success",
            totalProfit: convertBigInt(result)[0],
            transactions: transactions,
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error instanceof Error ? error.message : "Internal server error",
        });
    }
}
