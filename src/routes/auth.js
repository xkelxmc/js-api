import express from 'express';

// eslint-disable-next-line new-cap
const authRouter = express.Router();

authRouter.post('/login', () => {});
authRouter.get('/logout', () => {});
authRouter.get('/logoutall', () => {});
authRouter.post('/signup', () => {});

export default authRouter;
