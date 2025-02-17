import express from 'express'
import { GuestController } from '../controllers/Guest.controller';

const guestRouter = express.Router();

guestRouter.route('/register').post(
    (req, res) => { new GuestController().register(req,res); }
)

guestRouter.route('/login').post(
    (req, res) => { new GuestController().login(req,res); }
)

export default guestRouter;