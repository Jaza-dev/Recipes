import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors'
import cookieParser from "cookie-parser";

import guestRouter from './routes/Guest.routes';
import userRouter from './routes/User.routes';
import recipeRouter from './routes/Recipe.routes';
import recipeCollectionRouter from './routes/RecipeCollection.routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

mongoose.connect('mongodb://127.0.0.1:27017/Recipes');

const router = express.Router();

router.use('/guest', guestRouter);
router.use('/user', userRouter);
router.use('/recipe', recipeRouter);
router.use('/recipeCollection', recipeCollectionRouter);

app.use('/', router);

app.listen(4000, () => console.log('Express running on port 4000'));