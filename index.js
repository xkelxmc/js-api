import express from 'express';

const app = express();

app.get('/ping', (req, res) => {
    return res.status(200).json('pong');
});

export default app;
