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
    const { username, password } = req.headers; 
    const user = await Users.findOne({ username });
    if (user){
        res.status(403).send({message: "Username is taken, please try another username"});
        return;
    }

    const newUser = new Users({username, password});
    await newUser.save();

    //Send authorization token
    const token = jwt.sign({username, role: 'user'}, secretKeyUser, {expiresIn : '1h'});
    res.send({message : "User created successfully", token});
}