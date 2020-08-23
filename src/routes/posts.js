import express from 'express';

// eslint-disable-next-line new-cap
export const postsRouter = express.Router();

postsRouter
    .route('/')
    .get(() => {})
    .post(() => {});
postsRouter.get('/:postId', () => {});
postsRouter.get('/user/:userId', () => {});
postsRouter.post('/:postId/like', () => {});
postsRouter.post('/:postId/dislike', () => {});
