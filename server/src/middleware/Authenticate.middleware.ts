import express from 'express'
import jwt from 'jsonwebtoken'

interface AuthenticatedRequest extends express.Request {
    user?: any;
}

let authenticateUser = (req: AuthenticatedRequest, res: express.Response, next: express.NextFunction) => {
    const token = req.cookies.token; // Read token from cookie

    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        if(!process.env.SECRET_KEY) {
            throw new Error("SECRET_KEY is missing in environment variables");
        }
        const secretKey = process.env.SECRET_KEY;
        
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid token" });
    }
};

export { authenticateUser, AuthenticatedRequest };