import express from 'express';
import authController from '../controllers/auth';

// eslint-disable-next-line new-cap
const authRouter = express.Router();

authRouter.post('/signup', authController.signUp);
authRouter.post('/login', authController.login);
authRouter.get('/logout', authController.logout);
authRouter.get('/logoutall', authController.logoutAll);

export default authRouter;
