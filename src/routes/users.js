import express from 'express';
import usersController from '../controllers/users';

// eslint-disable-next-line new-cap
const usersRouter = express.Router();

usersRouter.get('/me', usersController.getCurrent);
usersRouter.get('/:userId', usersController.findOne);
usersRouter.get('/', usersController.findAll);

export default usersRouter;
