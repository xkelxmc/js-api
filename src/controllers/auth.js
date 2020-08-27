import { asyncHandler } from '../middlewares/asyncHandler';
import Boom from '@hapi/boom';
import User from '../models/User';
import { secureUserParams } from '../helpers';

const signUp = asyncHandler(async (req, res, next) => {
    const { email, password, name, lastName } = req.body;
    try {
        if (!name) {
            return next(Boom.badData('missing name'));
        }
        if (!lastName) {
            return next(Boom.badData('missing lastName'));
        }
        if (!email || !password) {
            return next(Boom.badData('missing email or password'));
        }
        const newUser = new User({ email, password, name, lastName });
        await newUser.save();
        const token = await newUser.generateAuthToken();
        return res.status(200).json({ user: secureUserParams(newUser), token });
    } catch (err) {
        return next(Boom.badRequest(err.message));
    }
});
const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return next(Boom.badData('missing email or password'));
        }
        const user = await User.findByCredentials(email, password);
        if (!user) {
            return next(Boom.unauthorized('invalid email or password'));
        }
        const token = await user.generateAuthToken();
        return res.status(200).json({ user: secureUserParams(user), token });
    } catch (error) {
        return next(Boom.unauthorized(error));
    }
});
const logout = asyncHandler(async (req, res, next) => {
    try {
        req.user.tokens = req.user.tokens.filter(
            (token) => token.token !== req.token
        );
        await req.user.save();
        return res.status(200).json({});
    } catch (error) {
        return next(Boom.internal(error));
    }
});
const logoutAll = asyncHandler(async (req, res, next) => {
    try {
        req.user.tokens.splice(0, req.user.tokens.length);
        await req.user.save();
        return res.status(200).json({});
    } catch (error) {
        return next(Boom.internal(error));
    }
});

export default {
    signUp,
    login,
    logout,
    logoutAll,
};
