import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors'
import cookieParser from "cookie-parser";
import dotenv from 'dotenv'
import morgan from 'morgan'

import guestRouter from './routes/Guest.routes';
import userRouter from './routes/User.routes';
import recipeRouter from './routes/Recipe.routes';
import recipeBookRouter from './routes/RecipeBook.routes';

const app = express();

app.use(cors({ 
    origin: "http://localhost:4200",
    credentials: true
}));

app.use(express.json());

app.use(cookieParser());
app.use(morgan('dev'));

dotenv.config(); // loading env variables

mongoose.connect(process.env.DATABASE_URL as string);

const router = express.Router();

router.use('/guest', guestRouter);
router.use('/user', userRouter);
router.use('/recipeBook', recipeBookRouter);
router.use('/recipe', recipeRouter);

app.use('/', router);

app.listen(4000, () => console.log('Express running on port 4000'));