import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import UserModel from '../models/User.model';

export const secretKey:string = "a4d9f3c9e7e8e3b0b8d1b8e93c88c8baf6f0b5c6e2d9f7a5e3a9b7d8e2b1c9f6";

export class GuestController {

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
}