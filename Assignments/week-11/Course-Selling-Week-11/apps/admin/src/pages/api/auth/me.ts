import type { NextApiRequest, NextApiResponse } from 'next';
import { getUser } from '@/lib/middleware';
import dbConnect from '@/lib/db';
import { JwtPayload } from 'jsonwebtoken';

type Data = {
  username?: string | JwtPayload,
  message?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    await dbConnect();
    const authHeader = req.headers.token;
    if (typeof authHeader === 'string') {
        const token = authHeader.split(" ")[1];
        getUser(token, (userId: string | JwtPayload)=>{
            if (!userId) {
                res.status(403).json({});
            } else {
                res.json({username: userId});
            }
        })
    } else {
        res.status(403).json({message: "Invalid credentials"})
    }
}
