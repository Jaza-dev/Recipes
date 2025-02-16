import express from 'express'
import { UserController } from '../controllers/User.controller';

const userRouter = express.Router();

userRouter.route('/register').post(
    (req, res) => { new UserController().register(req,res); }
)

userRouter.route('/login').post(
    (req, res) => { new UserController().login(req,res); }
)

userRouter.route('/edit').patch(
    (req, res, next) => { new UserController().authenticateUser(req,res, next) },
    (req, res) => { new UserController().changePassword(req,res); }
)

userRouter.route('/delete').delete(
    (req, res, next) => { new UserController().authenticateUser(req,res, next) },
    (req, res) => { new UserController().delete(req,res); }
)

export default userRouter;