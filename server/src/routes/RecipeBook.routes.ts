import express from 'express'
import { RecipeBookController } from '../controllers/RecipeBook.controller';
import { authenticateUser } from '../middleware/Authenticate.middleware';

const recipeBookRouter = express.Router();

recipeBookRouter.use(
    (req, res, next) => { authenticateUser(req,res, next) }
)

recipeBookRouter.route('/create').post(
    (req, res) => { new RecipeBookController().create(req, res); }
)

recipeBookRouter.route('/edit').patch(
    (req, res) => { new RecipeBookController().edit(req, res); }
)

recipeBookRouter.route('/delete').delete(
    (req, res) => { new RecipeBookController().delete(req, res); }
)

export default recipeBookRouter;