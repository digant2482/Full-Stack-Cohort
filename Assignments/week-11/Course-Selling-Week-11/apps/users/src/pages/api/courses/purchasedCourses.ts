import { NextApiRequest, NextApiResponse } from "next";
import { Users } from "db";
import dbConnect from '@/lib/db'
import { decryptedUserType, getUser } from "@/lib/middleware";

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse
) {
    await dbConnect();
    const authHeader = req.headers.token;
    if (typeof authHeader === 'string') {
        const token = authHeader.split(" ")[1];
        getUser(token, async (userInfo: decryptedUserType)=>{
            if (!userInfo) {
                res.status(403).json({});
            } else {
                const user = await Users.findOne({username : userInfo.username}).populate("purchasedCourses");
                if (user){
                    res.json({purchasedCourses: user.purchasedCourses || []});
                } else {
                    res.status(403).json({message : "User not found"});
                }    
            }
        })
    }
}