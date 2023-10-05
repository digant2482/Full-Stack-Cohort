import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import { z } from 'zod';


export const secretKeyAdmin = "adminS3CR3T";

export const getUser = (token: string, cb:(user: JwtPayload | string)=>void) => {
    jwt.verify(token, secretKeyAdmin, (err, user) => {
        if (err) {
            return cb("");
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
