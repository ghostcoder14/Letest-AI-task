import jwt from "jsonwebtoken"


export const authBlackList = new Set();

export function authenticateToken(req, res, next){
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({message: 'No token provided'});
    }

    if (authBlackList.has(token)) {
        return res.status(401).json({message:'Token revoked'});
    }
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({message: 'Invalid Token'});
        }
         req.user ={userId: decoded.userId};
            req.token = token;
            next();

    });
}