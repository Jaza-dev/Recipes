import express from 'express'
import { DashboardController } from '../controllers/Dashboard.controller';

const recipeCollectionRouter = express.Router();

recipeCollectionRouter.route('/create').post(
    (req, res) => { new DashboardController().create(req, res); }
)

recipeCollectionRouter.route('/edit').patch(
    (req, res) => { new DashboardController().edit(req, res); }
)

recipeCollectionRouter.route('/delete').delete(
    (req, res) => { new DashboardController().delete(req, res); }
)

export default recipeCollectionRouter;