import { Request, Response, NextFunction } from "express";
const jwt = require('jsonwebtoken');
import { z } from 'zod';

const secretKeyAdmin = "adminS3CR3T";
const secretKeyUser = "userS3CR3T";

const authSchema = z.object({
    username: z.string().email(),
    password: z.string()

})

function validateAuthInputs(req: Request, res: Response, next: NextFunction){
    const parsedInputs = authSchema.safeParse(req.headers);
    if (!parsedInputs.success){
        res.status(403).send({message: parsedInputs.error});
        return;
    }
    next();
}

function authenticateAdmin(req: Request, res: Response, next: NextFunction){
    try {
        if (typeof req.headers.token === 'string'){
            const authToken = req.headers.token.split(" ")[1];
            const decryptedObject = jwt.verify(authToken, secretKeyAdmin);
            req.headers['username'] = decryptedObject.username;
            next();
        }
    }
    catch (err){
        res.status(403).json({ message : 'Admin authentication failed'});
    }    
}

function authenticateUser(req: Request, res: Response, next: NextFunction){
    try{
        if (typeof req.headers.token === 'string'){
            const authToken = req.headers.token.split(" ")[1];
            const decryptedObject = jwt.verify(authToken, secretKeyUser);
            req.headers["username"] = decryptedObject.username;
            next();
        }
    }
    catch {
        res.status(403).json({ message : 'User authentication failed'});
    }
}

module.exports = {
    secretKeyAdmin, secretKeyUser, authenticateAdmin, authenticateUser, validateAuthInputs
}