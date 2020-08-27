import { asyncHandler } from '../middlewares/asyncHandler';
import User from '../models/User';
import Boom from '@hapi/boom';
import { secureUserParams } from '../helpers';

const getCurrent = asyncHandler((req, res, next) => {
    return res.status(200).json(secureUserParams(req.user));
});

const findOne = asyncHandler(async (req, res, next) => {
    const { userId } = req.params;
    try {
        const user = await User.findOne({
            _id: userId,
        });
        if (!user) {
            throw new Error();
        }
        return res.status(200).json(secureUserParams(user));
    } catch (e) {
        return next(Boom.notFound('User not found'));
    }
});

const findAll = asyncHandler(async (req, res, next) => {
    try {
        const users = await User.find();
        return res
            .status(200)
            .json(users.map((user) => secureUserParams(user)));
    } catch (e) {
        return next(Boom.internal('Users not found'));
    }
});

export default {
    getCurrent,
    findOne,
    findAll,
};
