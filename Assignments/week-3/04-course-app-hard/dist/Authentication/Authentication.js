"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
const zod_1 = require("zod");
const secretKeyAdmin = "adminS3CR3T";
const secretKeyUser = "userS3CR3T";
const authSchema = zod_1.z.object({
    username: zod_1.z.string().email(),
    password: zod_1.z.string()
});
function validateAuthInputs(req, res, next) {
    const parsedInputs = authSchema.safeParse(req.headers);
    if (!parsedInputs.success) {
        res.status(403).send({ message: parsedInputs.error });
        return;
    }
    next();
}
function authenticateAdmin(req, res, next) {
    try {
        if (typeof req.headers.token === 'string') {
            const authToken = req.headers.token.split(" ")[1];
            const decryptedObject = jwt.verify(authToken, secretKeyAdmin);
            req.headers['username'] = decryptedObject.username;
            next();
        }
    }
    catch (err) {
        res.status(403).json({ message: 'Admin authentication failed' });
    }
}
function authenticateUser(req, res, next) {
    try {
        if (typeof req.headers.token === 'string') {
            const authToken = req.headers.token.split(" ")[1];
            const decryptedObject = jwt.verify(authToken, secretKeyUser);
            req.headers["username"] = decryptedObject.username;
            next();
        }
    }
    catch (_a) {
        res.status(403).json({ message: 'User authentication failed' });
    }
}
module.exports = {
    secretKeyAdmin, secretKeyUser, authenticateAdmin, authenticateUser, validateAuthInputs
};
