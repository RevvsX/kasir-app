import formschema from "@/components/pages/transactions/formschema";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({
            status: "error",
            message: "Method not allowed",
        });
    }

    const session = await getServerSession(req, res, authOptions);
    if (!session) {
        return res.status(401).json({
            status: "error",
            message: "Unauthorized",
        });
    }

    try {
        const prisma = new PrismaClient();
        const {
            change,
            discount,
            fixed_total_price,
            memberId,
            paid,
            ppn,
            products,
            total_price,
        } = formschema.parse(JSON.parse(req.body));

        const TransactionDetailData = products.map((el) => ({
            productId: el.id,
            quantity: el.quantity,
            selling_price: el.selling_price,
            sub_total: el.total_price,
        }));

        await prisma.$transaction(async (tx) => {
            const transaction = await tx.transaction.create({
                data: {
                    change,
                    discount,
                    fixed_total_price,
                    memberId,
                    money_paid: paid,
                    ppn,
                    total_price,
                    userId: session?.user.id as number,
                    TransactionDetail: {
                        createMany: {
                            data: TransactionDetailData,
                        },
                    },
                },
            });

            for (const product of products) {
                await tx.product.update({
                    where: { id: product.id },
                    data: {
                        stock: {
                            decrement: product.quantity,
                        },
                    },
                });
            }

            return transaction;
        });

        return res.status(201).json({
            status: "success",
            message: "Transaction data successfully created",
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error instanceof Error ? error.message : "Internal Server Error",
        });
    }
}
