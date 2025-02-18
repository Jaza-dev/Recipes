import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import UserModel from '../models/User.model';

export class GuestController {

    register = async (req: express.Request, res: express.Response) => {
        try {

            const { name, email, password } = req.body;

            // Check if the user already exists
            if (await UserModel.exists({ email })) {
                return res.status(400).json({ message: "User with this email already exists!" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
    
            // Create a new user
            const newUser = new UserModel({
                name,
                email,
                password: hashedPassword,
                createdAt: new Date(),
            });
    
            await newUser.save();
    
            return res.status(201).json({ message: "User registered successfully." });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    };
    
    login = async (req: express.Request, res: express.Response) => {
        try {
            const { email, password } = req.body;

            const user = await UserModel.findOne({ email });

            if(!user) return res.status(400).json({ message: "Email or password are incorrect!" });
            
            if(user.password) {
                const isMatch = await bcrypt.compare(password, user.password);
                if(!isMatch) return res.status(400).json({ message: "Email or password are incorrect!" });
            }
            
            if(!process.env.SECRET_KEY) {
                throw new Error("SECRET_KEY is missing in environment variables");
            }
            const secretKey = process.env.SECRET_KEY;

            const token = jwt.sign({userId: user._id}, secretKey, {expiresIn: "1h"});

            res.cookie("token", token, { httpOnly: true, sameSite: "strict", secure:true });

            return res.status(200).json({ message: "Successful login!" });

        } catch(err) {
            console.error(err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}