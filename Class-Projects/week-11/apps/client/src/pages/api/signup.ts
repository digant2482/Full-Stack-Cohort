
import { ensureDbconnection } from '@/lib/dbConnect';
import { Admins } from 'db';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
const secretKeyAdmin = "SECRET";

type Data = {
    token?: string,
    message?: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
){
    await ensureDbconnection();
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
};