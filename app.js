import app from './index';

const port = process.env.PORT || 3012;
app.listen(port, () => {
    console.log(`App started at port ${port}`);
});
