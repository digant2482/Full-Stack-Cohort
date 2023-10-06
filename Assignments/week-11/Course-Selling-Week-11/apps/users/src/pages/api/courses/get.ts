import { NextApiRequest, NextApiResponse } from "next";
import { Courses } from "db";
import dbConnect from '@/lib/db'
import { getUser } from "@/lib/middleware";
import { JwtPayload } from "jsonwebtoken";

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse
) {
    await dbConnect();
    const authHeader = req.headers.token;
    if (typeof authHeader === 'string') {
        const token = authHeader.split(" ")[1];
        getUser(token, async (userId: string | JwtPayload)=>{
            if (!userId) {
                res.status(403).json({});
            } else {
                const courses = await Courses.find({published : true});
                res.json(courses);
            }
        })
    }
}