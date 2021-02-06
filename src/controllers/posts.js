import { asyncHandler } from '../middlewares/asyncHandler';
import Post from '../models/Post';
import Boom from '@hapi/boom';
import User from '../models/User';
import { secureUserParams } from '../helpers';

const findAll = asyncHandler(async (req, res, next) => {
    try {
        const posts = await Post.find().populate({
            path: 'author',
            select: 'name lastName email',
        });
        return res.status(200).json(posts.map(secureUserParams));
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
        const user = await User.findById(post.author);
        return res
            .status(200)
            .json({ ...post.toObject(), author: secureUserParams(user) });
    } catch (error) {
        return next(Boom.notFound('Post not found'));
    }
});

const findByUser = asyncHandler(async (req, res, next) => {
    const { userId } = req.params;
    try {
        const posts = await Post.find({ author: userId }).populate({
            path: 'author',
            select: 'name lastName email',
        });
        return res.status(200).json(posts.map(secureUserParams));
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
        const user = await User.findById(userId);
        newPost.author = secureUserParams(user);
        return res.status(201).json(newPost);
    } catch (error) {
        return next(Boom.badRequest('cant create post'));
    }
});

const like = asyncHandler(async (req, res, next) => {
    const userId = req.user._id;
    const { postId } = req.params;
    try {
        let post;
        try {
            post = await Post.findById(postId);
            if (!post) {
                throw new Error('');
            }
        } catch (notFound) {
            return next(Boom.notFound('Post not found'));
        }
        const isLiked = post
            .toObject()
            .userLikes.find((id) => id.toString() === userId.toString());

        if (isLiked) {
            return next(Boom.badRequest('User already like this post'));
        }

        const user = await User.findById(userId);

        post.userLikes.push(userId);
        post.likes++;
        user.likes.push(postId);
        await post.save();
        await user.save();
        return res.status(200).json(post);
    } catch (e) {
        return next(Boom.badRequest('error'));
    }
});

const dislike = asyncHandler(async (req, res, next) => {
    const userId = req.user._id;
    const { postId } = req.params;
    try {
        let post;
        try {
            post = await Post.findById(postId);
            if (!post) {
                throw new Error('');
            }
        } catch (notFound) {
            return next(Boom.notFound('Post not found'));
        }
        const isLiked = post
            .toObject()
            .userDislikes.find((id) => id.toString() === userId.toString());

        if (isLiked) {
            return next(Boom.badRequest('User already dislike this post'));
        }

        const user = await User.findById(userId);

        post.userDislikes.push(userId);
        post.dislikes++;
        user.dislikes.push(postId);
        await post.save();
        await user.save();
        return res.status(200).json(post);
    } catch (e) {
        console.log(e);
        return next(Boom.badRequest('error'));
    }
});

export default {
    findAll,
    findOne,
    findByUser,
    createOne,
    like,
    dislike,
};
