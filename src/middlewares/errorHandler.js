export default (err, req, res, next) => {
    if (err.isServer) {
        console.log(err);
    }

    return res.status(err.output.statusCode).json(err.output.payload);
};
