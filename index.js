import express from 'express';

const app = express();

const port = 3012;

app.get('/ping', (req, res) => {
  return res.json('pong');
});

app.listen(port, () => {
    console.log(`App started at port ${port}`)
})
