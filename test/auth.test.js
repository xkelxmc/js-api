import mongoose from 'mongoose';
import { expect } from 'chai';
import request from 'supertest';

import app from '../index';

const dummyUser = {
    name: 'Test',
    lastName: 'Test',
    email: 'test@gmail.com',
    password: '12345',
};

const createUser = (user) => request(app).post('/auth/signup').send(user);

describe('AUTH: Check auth query', () => {
    before((done) => {
        mongoose.connect(process.env.MONGO_TEST_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: true,
        });
        mongoose.connection.once('open', () => done());
    });

    it('SingUp should return 200', (done) => {
        createUser(dummyUser).end((err, res) => {
            expect(res.status).to.equal(200);
            done();
        });
    });
});
