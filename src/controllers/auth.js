import { asyncHandler } from '../middlewares/asyncHandler';
import Boom from '@hapi/boom';
import { User } from '../models/User';

const signUp = asyncHandler(async (req, res, next) => {
    const { email, password, name, lastName } = req.body;
    try {
        const newUser = new User({ email, password, name, lastName });
        await newUser.save();
        return res.json({ newUser });
    } catch (err) {
        return next(Boom.badRequest(err.message));
    }
});
const login = () => {};
const logout = () => {};
const logoutAll = () => {};

export default {
    signUp,
    login,
    logout,
    logoutAll,
};
