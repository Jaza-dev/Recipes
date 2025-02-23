import express from 'express'
import bcrypt from 'bcrypt'
import UserModel from '../models/User.model';
import { AuthenticatedRequest } from '../middleware/Authenticate.middleware';

export class UserController {

    getUserData = async (req: AuthenticatedRequest, res: express.Response) => {
        try {
            const user = await UserModel.findById(req.user.userId);

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            return res.json({ name: user.name, email: user.email });
        } catch (err) {
            res.status(500).json({ message: "Server error" });
        }
    }

    editProfile = async (req: AuthenticatedRequest, res: express.Response) => {
        try {
            const { name, newPassword, oldPassword } = req.body;
    
            if (!name && !newPassword) {
                return res.status(400).json({ message: "No data provided for update." });
            }
    
            const user = await UserModel.findById(req.user.userId);
            if (!user) {
                return res.status(404).json({ message: "User not found." });
            }
    
            const isMatch = await bcrypt.compare(oldPassword, user.password as string);
            if (!isMatch) {
                return res.status(401).json({ message: "Old password is incorrect." });
            }
    
            const updateFields: any = {};
            if (name) updateFields.name = name;
            if (newPassword) {
                updateFields.password = await bcrypt.hash(newPassword, 10);
            }
    
            const updatedUser = await UserModel.findByIdAndUpdate(
                req.user.userId, 
                updateFields, 
                { new: true, runValidators: true }
            );
    
            res.json({ message: "Your profile has been updated." });
    
        } catch (err) {
            res.status(500).json({ message: "Server error." });
        }
    };
    

    delete = async (req: AuthenticatedRequest, res: express.Response) => {
        try {
            const password = req.body.password;

            const user = await UserModel.findById(req.user.userId); 
            if (!user) {
                return res.status(404).json({ message: "User not found." });
            }
    
            const isMatch = await bcrypt.compare(password, user.password as string);
            if (!isMatch) {
                return res.status(401).json({ message: "Password is incorrect." });
            }

            const deletedUser = await UserModel.findByIdAndDelete(req.user.userId);
            if (!deletedUser) {
                return res.status(404).json({ message: "User not found" });
            }

            res.clearCookie("token", {
                httpOnly: true,
                sameSite: "strict",
                secure: true
            });

            res.json({ message: "User deleted successfully" });
        } catch (err) {
            res.status(500).json({ message: "Server error." });
        }
    }

    logout = async (req: AuthenticatedRequest, res: express.Response) => {
        try {

            res.clearCookie("token", {
                httpOnly: true,
                sameSite: "strict",
                secure: true
            });

            res.json({ message: "Successfull logout" });
        } catch (err) {
            res.status(500).json({ message: "Server error." });
        }
    }
}