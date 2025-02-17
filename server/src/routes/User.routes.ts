import express from 'express'
import { UserController } from '../controllers/User.controller';
import { authenticateUser } from '../middleware/Authenticate.middleware';

const userRouter = express.Router();

userRouter.use(
    (req, res, next) => { authenticateUser(req,res, next) }
)

userRouter.route('/changePassword').patch(
    (req, res) => { new UserController().changePassword(req,res); }
)

userRouter.route('/delete').delete(
    (req, res) => { new UserController().delete(req,res); }
)

userRouter.route('/logout').post(
    (req, res) => { new UserController().logout(req,res); }
)

export default userRouter;