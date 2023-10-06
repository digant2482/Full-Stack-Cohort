import { NextApiRequest, NextApiResponse } from "next";
import { Users } from "db";
import jwt from "jsonwebtoken";
import { secretKeyUser } from "@/lib/middleware";
import dbConnect from "@/lib/db";

type Data = {
    token?: string,
    message?: string
}
export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    await dbConnect();
    const {username, password} = req.headers;
    const user = await Users.findOne({username, password});
    if (!user){
        res.status(403).json({ message : 'User authentication failed'});
        return;
    }
    const token = jwt.sign({username}, secretKeyUser, { expiresIn: '1h'});
    res.send({message : "User logged in successfully", token});
}