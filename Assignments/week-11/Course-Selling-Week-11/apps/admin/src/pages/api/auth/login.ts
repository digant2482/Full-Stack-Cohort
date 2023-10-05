import { NextApiRequest, NextApiResponse } from "next";
import { Admins } from "db";
import jwt from "jsonwebtoken";
import { secretKeyAdmin } from "@/lib/middleware";
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
    const admin = await Admins.findOne({username, password});
    if (!admin){
        res.status(403).json({ message : 'Admin authentication failed'});
        return;
    }
    const token = jwt.sign({username}, secretKeyAdmin, { expiresIn: '1h'});
    res.send({message : "Logged in successfully", token});
}