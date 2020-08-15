import express from 'express';
import notFound from './src/middlewares/notFound';
import errorHandler from './src/middlewares/errorHandler';

const app = express();

app.get('/ping', (req, res) => {
    return res.status(200).json('pong');
});

app.use(notFound);
app.use(errorHandler);

export default app;
