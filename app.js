import mongoose from 'mongoose';
import app from './index';

mongoose.connect(
    process.env.NODE_ENV === 'test'
        ? process.env.MONGO_TEST_URI
        : process.env.MONGO_URI,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
    }
);

mongoose.connection.once('open', () => {
    const port = process.env.PORT || 3012;
    app.listen(port, () => {
        console.log(`App started at port ${port}`);
    });
});

mongoose.connection.on('error', (err) => {
    console.log(err);
});
