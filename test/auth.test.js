import mongoose from 'mongoose';
import { expect, should } from 'chai';
import request from 'supertest';

import app from '../index';

const dummyUser = {
    name: 'Test',
    lastName: 'Test',
    email: 'test@gmail.com',
    password: '12345',
};

const userAgent = request(app);

const createUser = (user) => userAgent.post('/auth/signup').send(user);

const loginUser = (user) => userAgent.post('/auth/login').send(user);

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

    beforeEach((done) => {
        mongoose.connection.collections.users.drop(() => done());
    });

    beforeEach((done) => {
        mongoose.connection.collections.users.createIndex(
            { email: 1 },
            { unique: true }
        );
        done();
    });

    afterEach((done) => {
        mongoose.connection.collections.users.drop(() => done());
    });

    afterEach((done) => {
        mongoose.connection.collections.users.createIndex(
            { email: 1 },
            { unique: true }
        );
        done();
    });

    it('SingUp should return 200', (done) => {
        createUser(dummyUser).end((err, res) => {
            expect(res.status).to.equal(200);
            done();
        });
    });

    it('Login should return 200', (done) => {
        createUser(dummyUser).end((err1, res1) => {
            expect(res1.status).to.equal(200);
            loginUser(dummyUser).end((err2, res2) => {
                expect(res2.status).to.equal(200);
                const { token } = res2.body;
                should().exist(token);
                done();
            });
        });
    });

    it('Should not send error logged out', (done) => {
        createUser(dummyUser).end((err1, res1) => {
            expect(res1.status).to.equal(200);
            loginUser(dummyUser).end((err2, res2) => {
                expect(res2.status).to.equal(200);
                const { token } = res2.body;
                userAgent
                    .get('/auth/logout')
                    .set('Authorization', 'Bearer ' + token)
                    .end((err3, res3) => {
                        expect(res3.status).to.equal(200);
                        done();
                    });
            });
        });
    });
});
