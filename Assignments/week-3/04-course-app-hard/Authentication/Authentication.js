const jwt = require('jsonwebtoken');

const secretKeyAdmin = "adminS3CR3T";
const secretKeyUser = "userS3CR3T";

function authenticateAdmin(req, res, next){
    const authToken = req.headers.token.split(" ")[1];
    try {
        const decryptedObject = jwt.verify(authToken, secretKeyAdmin);
        req.user = decryptedObject;
        next();
    }
    catch (err){
        res.status(403).json({ message : 'Admin authentication failed'});
    }    
}

function authenticateUser(req, res, next){
    const authToken = req.headers.token.split(" ")[1];
    try{
        const decryptedObject = jwt.verify(authToken, secretKeyUser);
        req.user = decryptedObject;
        next();
    }
    catch {
        res.status(403).json({ message : 'User authentication failed'});
    }
}

module.exports = {
    secretKeyAdmin, secretKeyUser, authenticateAdmin, authenticateUser
}