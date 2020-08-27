import express from 'express';
import authController from '../controllers/auth';
import authMiddleware from '../middlewares/auth';

// eslint-disable-next-line new-cap
const authRouter = express.Router();

authRouter.post('/signup', authController.signUp);
authRouter.post('/login', authController.login);
authRouter.get('/logout', authMiddleware, authController.logout);
authRouter.get('/logoutall', authMiddleware, authController.logoutAll);

export default authRouter;
