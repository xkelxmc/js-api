import express from 'express';
import postsController from '../controllers/posts';

// eslint-disable-next-line new-cap
export const postsRouter = express.Router();

postsRouter
    .route('/')
    .get(postsController.findAll)
    .post(postsController.createOne);
postsRouter.get('/:postId', postsController.findOne);
postsRouter.get('/user/:userId', postsController.findByUser);
postsRouter.post('/:postId/like', postsController.like);
postsRouter.post('/:postId/dislike', postsController.dislike);
