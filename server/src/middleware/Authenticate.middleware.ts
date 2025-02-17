import express from 'express'
import jwt from 'jsonwebtoken'
import { secretKey } from '../controllers/Guest.controller'

interface AuthenticatedRequest extends express.Request {
    user?: any; // Use `any` or define a specific type
}

let authenticateUser = (req: AuthenticatedRequest, res: express.Response, next: express.NextFunction) => {
    const token = req.cookies.token; // Read token from cookie

    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid token" });
    }
};

export { authenticateUser, AuthenticatedRequest };