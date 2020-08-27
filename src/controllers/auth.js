import { asyncHandler } from '../middlewares/asyncHandler';
import Boom from '@hapi/boom';
import { User } from '../models/User';

const signUp = asyncHandler(async (req, res, next) => {
    const { email, password, name, lastName } = req.body;
    try {
        const newUser = new User({ email, password, name, lastName });
        await newUser.save();
        const token = await newUser.generateAuthToken();
        return res.json({ user: newUser, token });
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
        return res.json({ user, token });
    } catch (error) {
        return next(Boom.unauthorized(error));
    }
});
const logout = asyncHandler(async (req, res, next) => {
    try {
        console.log(req.user);
        return res.json({});
    } catch (error) {
        return next(Boom.internal(error));
    }
});
const logoutAll = () => {};

export default {
    signUp,
    login,
    logout,
    logoutAll,
};
