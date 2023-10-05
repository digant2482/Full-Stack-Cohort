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
    const { username, password } = req.headers; 
    const admin = await Admins.findOne({ username });
    if (admin){
        res.status(403).send({message: "Username is taken, please try another username"});
        return;
    }

    const newAdmin = new Admins({username, password});
    await newAdmin.save();

    //Send authorization token
    const token = jwt.sign({username, role: 'admin'}, secretKeyAdmin, {expiresIn : '1h'});
    res.send({message : "Admin created successfully", token});
}