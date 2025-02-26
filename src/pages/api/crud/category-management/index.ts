import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method != "GET"){
        res.status(405).json({
            status: "error",
            message: "Method not allowed"
        })
    }
    try {
        const { pagenumber, pagelimit, search } = req.query
        const prisma = new PrismaClient()

        const skipping = parseInt(pagelimit as string) * (parseInt(pagenumber as string) - 1)

        let category;
        let count;

        if (search == "") {
            category = await prisma.category.findMany({ skip: skipping, take: parseInt(pagelimit as string), orderBy: {id: "desc"} })
            count = await prisma.category.count()
        } else {
            category = await prisma.category.findMany({
                skip: skipping, take: parseInt(pagelimit as string), where: {
                    category_name: {
                        contains: search as string
                    }
                },
                orderBy: {id: "desc"}
            })

            count = await prisma.category.count({ where: { category_name: { contains: search as string } } })
        }

        count = Math.ceil(count / parseInt(pagelimit as string))



        res.status(200).json({
            "status": "success",
            "data": category,
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