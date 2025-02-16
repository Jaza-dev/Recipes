import express from 'express'
import jwt from 'jsonwebtoken'
import UserModel from '../models/User.model';

interface AuthenticatedRequest extends express.Request {
    user?: any; // Use `any` or define a specific type
}

export class UserController {

    authenticateUser = (req: AuthenticatedRequest, res: express.Response, next: express.NextFunction) => {
        const token = req.cookies.token; // Read token from cookie
    
        if (!token) {
            return res.status(401).json({ error: "Unauthorized" });
        }
    
        try {
            const decoded = jwt.verify(token, "your_secret_key");
            req.user = decoded;
            next();
        } catch (error) {
            return res.status(401).json({ error: "Invalid token" });
        }
    };

    register = async (req: express.Request, res: express.Response) => {
        try {
            // Check if the user already exists
            if (await UserModel.exists({ email: req.body.email })) {
                return res.status(400).json({ error: "User with this email already exists!" });
            }
    
            // Create a new user
            const newUser = new UserModel({
                name: req.body.name,
                surename: req.body.surename,
                email: req.body.email,
                password: req.body.password,
                createdAt: new Date(),
            });
    
            await newUser.save();
    
            return res.status(201).json({ message: "User registered successfully." });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    };
    
    login = async (req: express.Request, res: express.Response) => {
        try {
            const { email, password } = req.body;

            const user = await UserModel.findOne({ email, password });

            if(!user) return res.status(400).json({ error: "Email or password are incorrect!" });

            const token = jwt.sign({userId: user._id}, "your_secret_key", {expiresIn: "1h"});

            res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "strict" });

            return res.status(200).json({ message: "Successful login! "});

        } catch(err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    changePassword = async (req: AuthenticatedRequest, res: express.Response) => {
        try {
            const { password:newPassword } = req.body;

            const updatedUser = await UserModel.findByIdAndUpdate(req.user.userId, { password:newPassword }, {new:true, runValidators:true});

            if (!updatedUser) {
                return res.status(404).json({ error: "User not found" });
            }

            res.json({ message: "Password changed successfully" });
        } catch (err) {
            res.status(500).json({ error: "Server error" });
        }
    }

    delete = async (req: AuthenticatedRequest, res: express.Response) => {
        try {
            const deletedUser = await UserModel.findByIdAndDelete(req.user.userId);
            if (!deletedUser) {
                return res.status(404).json({ error: "User not found" });
            }
            res.json({ message: "User deleted successfully" });
        } catch (err) {
            res.status(500).json({ error: "Server error" });
        }
    }
}