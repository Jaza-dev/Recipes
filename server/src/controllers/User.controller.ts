import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import UserModel from '../models/User.model';

interface AuthenticatedRequest extends express.Request {
    user?: any; // Use `any` or define a specific type
}

const secretKey:string = "a4d9f3c9e7e8e3b0b8d1b8e93c88c8baf6f0b5c6e2d9f7a5e3a9b7d8e2b1c9f6";

export class UserController {

    authenticateUser = (req: AuthenticatedRequest, res: express.Response, next: express.NextFunction) => {
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

    register = async (req: express.Request, res: express.Response) => {
        try {

            const { name, surename, email, password } = req.body;

            // Check if the user already exists
            if (await UserModel.exists({ email })) {
                return res.status(400).json({ error: "User with this email already exists!" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
    
            // Create a new user
            const newUser = new UserModel({
                name,
                surename,
                email,
                password: hashedPassword,
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

            const user = await UserModel.findOne({ email });

            if(!user) return res.status(400).json({ error: "Email or password are incorrect!" });
            
            if(user.password) {
                const isMatch = await bcrypt.compare(password, user.password);
                if(!isMatch) return res.status(400).json({ error: "Email or password are incorrect!" });
            }

            const token = jwt.sign({userId: user._id}, secretKey, {expiresIn: "1h"});

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

            const hashedNewPassword = await bcrypt.hash(newPassword, 10);

            const updatedUser = await UserModel.findByIdAndUpdate(req.user.userId, { password:hashedNewPassword }, {new:true, runValidators:true});

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

    logout = async (req: AuthenticatedRequest, res: express.Response) => {
        try {

            res.clearCookie("token", {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
            });

            res.json({ message: "Successfull logout" });
        } catch (err) {
            res.status(500).json({ error: "Server error" });
        }
    }
}