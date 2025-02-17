import express from 'express'
import bcrypt from 'bcrypt'
import UserModel from '../models/User.model';
import { AuthenticatedRequest } from '../middleware/Authenticate.middleware';

export class UserController {

    changePassword = async (req: AuthenticatedRequest, res: express.Response) => {
        try {
            const { password:newPassword } = req.body;

            const hashedNewPassword = await bcrypt.hash(newPassword, 10);

            const updatedUser = await UserModel.findByIdAndUpdate(req.user.userId, { password:hashedNewPassword }, {new:true, runValidators:true});

            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" });
            }

            res.json({ message: "Password changed successfully" });
        } catch (err) {
            res.status(500).json({ message: "Server error" });
        }
    }

    delete = async (req: AuthenticatedRequest, res: express.Response) => {
        try {
            const deletedUser = await UserModel.findByIdAndDelete(req.user.userId);
            if (!deletedUser) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json({ message: "User deleted successfully" });
        } catch (err) {
            res.status(500).json({ message: "Server error" });
        }
    }

    logout = async (req: AuthenticatedRequest, res: express.Response) => {
        try {

            res.clearCookie("token", {
                httpOnly: true,
                sameSite: "strict",
            });

            res.json({ message: "Successfull logout" });
        } catch (err) {
            res.status(500).json({ message: "Server error" });
        }
    }
}