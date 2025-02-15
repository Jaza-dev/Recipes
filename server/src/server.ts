import express from 'express'
import userRouter from './routes/User.routes';
import recipeRouter from './routes/Recipe.routes';
import recipeCollectionRouter from './routes/RecipeCollection.routes';

const app = express();

const router = express.Router();

router.use('/user', userRouter);
router.use('/recipe', recipeRouter);
router.use('/recipeCollection', recipeCollectionRouter);

app.use('/', router);

app.listen(4000, () => console.log('Express running on port 4000'));