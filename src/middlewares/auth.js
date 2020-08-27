import { asyncHandler } from './asyncHandler';
import Boom from '@hapi/boom';
import { User } from '../models/User';
import jwt from 'jsonwebtoken';

const auth = asyncHandler(async (req, res, next) => {
    try {
        // Bearer tokenString
        // const token = req.header('Authorization').split(' ')[1];
        // const token = req.header.authorization.split(' ')[1];
        const token = req.header('Authorization').replace('Bearer ', '');
        const data = jwt.verify(token, process.env.JWT_KEY);
        if (!data._id) {
            throw new Error();
        }
        const user = await User.findOne({
            _id: data._id,
            'tokens.token': token,
        });
        if (!user) {
            throw new Error();
        }
        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        return next(Boom.unauthorized('Not access. Need authorized.'));
    }
});

export default auth;
