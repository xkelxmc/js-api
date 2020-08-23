import express from 'express';

// eslint-disable-next-line new-cap
const usersRouter = express.Router();

// /users/me
// /users/123
// /users/
usersRouter.get('/me', () => {});
usersRouter.get('/:userId', () => {});
usersRouter.get('/', () => {});

export default usersRouter;
