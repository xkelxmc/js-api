import Boom from '@hapi/boom';

export default (req, res, next) => next(Boom.notFound('missing'));
