import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import { z } from 'zod';

export const secretKeyUser = "userS3CR3T";

export type decryptedUserType = {
    username?: string,
    iat?: number,
    exp?: number
}

export const getUser = (token: string, cb:(user: decryptedUserType)=>void) => {
    jwt.verify(token, secretKeyUser, (err, user) => {
        if (err) {
            return cb({});
        }
        if (user)
            return cb(user);
    });
}

//Input validation
export const inputValidationCourseSchema = z.object({
    title: z.string().max(20),
    description: z.string().max(100),
    price: z.string().max(8),
    published: z.boolean(),
    imageLink: z.string().max(1000)
})
