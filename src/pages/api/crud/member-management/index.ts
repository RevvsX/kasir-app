import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method != "GET") {
        res.status(405).json({
            status: "error",
            message: "Method not allowed"
        })
    }
    try {
        const { pagenumber, pagelimit, search } = req.query
        const prisma = new PrismaClient()

        const skipping = parseInt(pagelimit as string) * (parseInt(pagenumber as string) - 1)

        let member;
        let count;

        if (search == "") {
            member = await prisma.member.findMany({ skip: skipping, take: parseInt(pagelimit as string), orderBy: { id: "desc" } })
            count = await prisma.member.count()
        } else {
            member = await prisma.member.findMany({
                skip: skipping, take: parseInt(pagelimit as string), where: {
                    OR: [{
                        name: {
                            contains: search as string
                        },
                    }, {
                        id: {
                            equals: parseInt(search as string)
                        }
                    }]
                },
                orderBy: { id: "desc" }
            })

            count = await prisma.member.count({
                where: {
                    OR: [
                        {
                            name: { contains: search as string }
                        },
                        {
                            id: { equals: parseInt(search as string) }
                        }
                    ]
                }
            })
        }

        count = Math.ceil(count / parseInt(pagelimit as string))



        res.status(200).json({
            "status": "success",
            "data": member,
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