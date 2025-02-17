import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors'
import cookieParser from "cookie-parser";
import dotenv from 'dotenv'

import guestRouter from './routes/Guest.routes';
import userRouter from './routes/User.routes';
import recipeRouter from './routes/Recipe.routes';
import recipeCollectionRouter from './routes/RecipeCollection.routes';

const app = express();

app.use(cors({ origin: "http://localhost:4200" }));
app.use(express.json());
app.use(cookieParser());

dotenv.config(); // loading env variables

mongoose.connect(process.env.DATABASE_URL as string);

const router = express.Router();

router.use('/guest', guestRouter);
router.use('/user', userRouter);
router.use('/recipe', recipeRouter);
router.use('/recipeCollection', recipeCollectionRouter);

app.use('/', router);

app.listen(4000, () => console.log('Express running on port 4000'));