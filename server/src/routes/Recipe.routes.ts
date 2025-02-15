import express from 'express'
import { RecipeController } from '../controllers/Recipe.controller';

const recipeRouter = express.Router();

recipeRouter.route('/create').post(
    (req, res) => { new RecipeController().create(req, res); }
)

recipeRouter.route('/delete').delete(
    (req, res) => { new RecipeController().delete(req, res); }
)

recipeRouter.route('/edit').patch(
    (req, res) => { new RecipeController().edit(req, res); }
)

recipeRouter.route('/createSection').post(
    (req, res) => { new RecipeController().createSection(req, res); }
)

recipeRouter.route('/deleteSection').delete(
    (req, res) => { new RecipeController().deleteSection(req, res); }
)

recipeRouter.route('/editSection').patch(
    (req, res) => { new RecipeController().editSection(req, res); }
)

export default recipeRouter;