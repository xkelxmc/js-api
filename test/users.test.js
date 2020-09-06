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

const badToken = 'badToken';

const createUser = (user) => userAgent.post('/auth/signup').send(user);

const loginUser = (user) => userAgent.post('/auth/login').send(user);

describe('USERS: Check auth query', () => {
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

    it('should not access protected resources if not logged in', (done) => {
        userAgent.get('/users/').end((err4, res4) => {
            expect(res4.status).to.equal(401);
            done();
        });
    });

    it('should not access protected resources with bad token', (done) => {
        userAgent
            .get('/users/')
            .set('Authorization', 'Bearer ' + badToken)
            .end((err4, res4) => {
                expect(res4.status).to.equal(401);
                done();
            });
    });

    it('should access to get current user if logged in', (done) => {
        createUser(dummyUser).end((err1, res1) => {
            expect(res1.status).to.equal(200);
            loginUser(dummyUser).end((err2, res2) => {
                expect(res2.status).to.equal(200);
                const { token } = res2.body;
                userAgent
                    .get('/users/me/')
                    .set('Authorization', 'Bearer ' + token)
                    .end((err4, res4) => {
                        expect(res4.status).to.equal(200);
                        done();
                    });
            });
        });
    });

    it('should access to get user by id if logged in', (done) => {
        createUser(dummyUser).end((err1, res1) => {
            expect(res1.status).to.equal(200);
            loginUser(dummyUser).end((err2, res2) => {
                expect(res2.status).to.equal(200);
                const { token, user } = res2.body;
                const { _id } = user;
                userAgent
                    .get(`/users/${_id}/`)
                    .set('Authorization', 'Bearer ' + token)
                    .end((err4, res4) => {
                        expect(res4.status).to.equal(200);
                        done();
                    });
            });
        });
    });

    it('should access to get users list if logged in', (done) => {
        createUser(dummyUser).end((err1, res1) => {
            expect(res1.status).to.equal(200);
            loginUser(dummyUser).end((err2, res2) => {
                expect(res2.status).to.equal(200);
                const { token } = res2.body;
                userAgent
                    .get('/users/')
                    .set('Authorization', 'Bearer ' + token)
                    .end((err4, res4) => {
                        expect(res4.status).to.equal(200);
                        done();
                    });
            });
        });
    });

    it('should "/users/" return users array', (done) => {
        createUser(dummyUser).end((err1, res1) => {
            expect(res1.status).to.equal(200);
            loginUser(dummyUser).end((err2, res2) => {
                expect(res2.status).to.equal(200);
                const { token } = res2.body;
                userAgent
                    .get('/users/')
                    .set('Authorization', 'Bearer ' + token)
                    .end((err4, res4) => {
                        expect(res4.status).to.equal(200);
                        const users = res4.body;
                        users.should.have.lengthOf(1);
                        done();
                    });
            });
        });
    });

    it('should "/users/me/" return current user', (done) => {
        createUser(dummyUser).end((err1, res1) => {
            expect(res1.status).to.equal(200);
            loginUser(dummyUser).end((err2, res2) => {
                expect(res2.status).to.equal(200);
                const { token, user } = res2.body;
                const { _id } = user;
                userAgent
                    .get('/users/me/')
                    .set('Authorization', 'Bearer ' + token)
                    .end((err4, res4) => {
                        expect(res4.status).to.equal(200);
                        const user2 = res4.body;
                        const { _id: _id2 } = user2;
                        expect(_id).to.equal(_id2);
                        done();
                    });
            });
        });
    });

    it('should "/users/:userId/" return user by id', (done) => {
        createUser(dummyUser).end((err1, res1) => {
            expect(res1.status).to.equal(200);
            loginUser(dummyUser).end((err2, res2) => {
                expect(res2.status).to.equal(200);
                const { token, user } = res2.body;
                const { _id } = user;
                userAgent
                    .get(`/users/${_id}/`)
                    .set('Authorization', 'Bearer ' + token)
                    .end((err4, res4) => {
                        expect(res4.status).to.equal(200);
                        const user2 = res4.body;
                        const { _id: _id2 } = user2;
                        expect(_id).to.equal(_id2);
                        done();
                    });
            });
        });
    });
});
