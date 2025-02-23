import express from 'express'
import RecipeBookModel from '../models/RecipeBook.model';
import { AuthenticatedRequest } from '../middleware/Authenticate.middleware';

export class RecipeBookController {

    create = async (req: AuthenticatedRequest, res: express.Response) => {
        try {
            const { name, description, color } = req.body;

            // Create new recipe book
            const newRecipeBook = new RecipeBookModel({
                name,
                description,
                color,
                createdAt: new Date(),
                userId:req.user.userId
            });
    
            await newRecipeBook.save();
    
            return res.status(200).json({ message: "Recipe book created." });

        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
    
    delete = (req: express.Request, res: express.Response) => {
        res.send("Hello World! recipe Book");
    }

    edit = (req: express.Request, res: express.Response) => {
        res.send("Hello World! recipe Book");
    }
}