import { asyncHandler } from '../middlewares/asyncHandler';
import Post from '../models/Post';
import Boom from '@hapi/boom';
import User from '../models/User';

const findAll = asyncHandler(async (req, res, next) => {
    try {
        const posts = await Post.find();
        return res.status(200).json(posts);
    } catch (error) {
        return next(Boom.notFound('Posts not found'));
    }
});

const findOne = asyncHandler(async (req, res, next) => {
    const { postId } = req.params;
    try {
        const post = await Post.findOne({
            _id: postId,
        });
        return res.status(200).json(post);
    } catch (error) {
        return next(Boom.notFound('Post not found'));
    }
});

const findByUser = asyncHandler(async (req, res, next) => {
    const { userId } = req.params;
    try {
        const posts = await Post.find({ author: userId });
        return res.status(200).json(posts);
    } catch (error) {
        return next(Boom.notFound('Posts not found'));
    }
});

const createOne = asyncHandler(async (req, res, next) => {
    const userId = req.user._id;
    const { title, body } = req.body;
    if (!title || !body) {
        return next(Boom.badData('missing title or body'));
    }

    try {
        const newPost = new Post({
            title,
            body,
            author: userId,
        });
        await newPost.save();
        await User.findByIdAndUpdate(userId, { $push: { posts: newPost } });
        return res.status(201).json(newPost);
    } catch (error) {
        return next(Boom.badRequest('cant create post'));
    }
});

const like = asyncHandler(async (req, res, next) => {
    return res.json({});
});

const dislike = asyncHandler(async (req, res, next) => {
    return res.json({});
});

export default {
    findAll,
    findOne,
    findByUser,
    createOne,
    like,
    dislike,
};
