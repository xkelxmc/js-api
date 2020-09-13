import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';

import app from '../index';

describe('Api main tests', () => {
    before((done) => {
        mongoose.connect(process.env.MONGO_TEST_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        mongoose.connection.once('open', () => done());
    });

    it('should return 200', (done) => {
        request(app)
            .get('/ping')
            .end((err, res) => {
                expect(res.status).to.equal(200);
                done();
            });
    });
    it('should throw 404 error if route undefined', (done) => {
        request(app)
            .get('/dsmfkbsdfsdjfbjsdbfjksdfjsdn')
            .end((err, res) => {
                expect(res.status).to.equal(404);
                expect(res.body.statusCode).to.equal(404);
                done();
            });
    });
});
