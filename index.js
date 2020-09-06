import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';
import notFound from './src/middlewares/notFound';
import errorHandler from './src/middlewares/errorHandler';
import usersRouter from './src/routes/users';
import authRouter from './src/routes/auth';
import { postsRouter } from './src/routes/posts';
import authMiddleware from './src/middlewares/auth';

const app = express();

app.use(compression());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/auth', authRouter);
app.use('/users', authMiddleware, usersRouter);
app.use('/posts', authMiddleware, postsRouter);

app.get('/ping', (req, res) => {
    return res.status(200).json('pong');
});

app.use(notFound);
app.use(errorHandler);

export default app;
