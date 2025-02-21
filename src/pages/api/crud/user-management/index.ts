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

        let user;
        let count;

        if (search == "") {
            user = await prisma.user.findMany({ skip: skipping, take: parseInt(pagelimit as string), orderBy: {id: "desc"} })
            count = await prisma.user.count()
        } else {
            user = await prisma.user.findMany({
                skip: skipping, take: parseInt(pagelimit as string), where: {
                    username: {
                        contains: search as string
                    }
                },
                orderBy: {id: "desc"}
            })

            count = await prisma.user.count({ where: { username: { contains: search as string } } })
        }

        count = Math.ceil(count / parseInt(pagelimit as string))



        res.status(200).json({
            "status": "success",
            "data": user,
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