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

const dummyPost = {
    title: 'Title',
    body: 'Body of post',
};

const userAgent = request(app);

const badToken = 'badToken';

const createUser = (user) => userAgent.post('/auth/signup').send(user);

const createPost = (post, token) =>
    userAgent
        .post('/posts/')
        .set('Authorization', 'Bearer ' + token)
        .send(post);

const loginUser = (user) => userAgent.post('/auth/login').send(user);

describe('POSTS: Check auth query', () => {
    beforeEach((done) => {
        mongoose.connection.collections.users.drop(() => done());
    });

    beforeEach((done) => {
        mongoose.connection.collections.posts.drop(() => done());
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
        mongoose.connection.collections.posts.drop(() => done());
    });

    afterEach((done) => {
        mongoose.connection.collections.users.createIndex(
            { email: 1 },
            { unique: true }
        );
        done();
    });

    it('should not access protected resources if not logged in', (done) => {
        userAgent.get('/posts/').end((err4, res4) => {
            expect(res4.status).to.equal(401);
            done();
        });
    });

    it('should not access protected resources with bad token', (done) => {
        userAgent
            .get('/posts/')
            .set('Authorization', 'Bearer ' + badToken)
            .end((err4, res4) => {
                expect(res4.status).to.equal(401);
                done();
            });
    });

    it('should get all posts', (done) => {
        createUser(dummyUser).end((err1, res1) => {
            expect(res1.status).to.equal(200);
            loginUser(dummyUser).end((err2, res2) => {
                expect(res2.status).to.equal(200);
                const { token } = res2.body;
                userAgent
                    .get('/posts/')
                    .set('Authorization', 'Bearer ' + token)
                    .end((err4, res4) => {
                        expect(res4.status).to.equal(200);
                        done();
                    });
            });
        });
    });

    it('should create a post', (done) => {
        createUser(dummyUser).end((err1, res1) => {
            expect(res1.status).to.equal(200);
            loginUser(dummyUser).end((err2, res2) => {
                expect(res2.status).to.equal(200);
                const { token } = res2.body;
                createPost(dummyPost, token).end((err4, res4) => {
                    expect(res4.status).to.equal(201);
                    done();
                });
            });
        });
    });

    it('should not create post if missing title', (done) => {
        createUser(dummyUser).end((err1, res1) => {
            expect(res1.status).to.equal(200);
            loginUser(dummyUser).end((err2, res2) => {
                expect(res2.status).to.equal(200);
                const { token } = res2.body;
                createPost({ body: dummyPost.body }, token).end(
                    (err4, res4) => {
                        expect(res4.status).to.equal(422);
                        done();
                    }
                );
            });
        });
    });
    it('should not create post if missing body', (done) => {
        createUser(dummyUser).end((err1, res1) => {
            expect(res1.status).to.equal(200);
            loginUser(dummyUser).end((err2, res2) => {
                expect(res2.status).to.equal(200);
                const { token } = res2.body;
                createPost({ title: dummyPost.title }, token).end(
                    (err4, res4) => {
                        expect(res4.status).to.equal(422);
                        done();
                    }
                );
            });
        });
    });

    it('should get user posts', (done) => {
        createUser(dummyUser).end((err1, res1) => {
            expect(res1.status).to.equal(200);
            loginUser(dummyUser).end((err2, res2) => {
                expect(res2.status).to.equal(200);
                const { token, user } = res2.body;
                const { _id } = user;
                userAgent
                    .get(`/posts/user/${_id}`)
                    .set('Authorization', 'Bearer ' + token)
                    .end((err4, res4) => {
                        expect(res4.status).to.equal(200);
                        done();
                    });
            });
        });
    });

    it('should get created post by id', (done) => {
        createUser(dummyUser).end((err1, res1) => {
            expect(res1.status).to.equal(200);
            loginUser(dummyUser).end((err2, res2) => {
                expect(res2.status).to.equal(200);
                const { token } = res2.body;
                createPost(dummyPost, token).end((err3, res3) => {
                    expect(res3.status).to.equal(201);
                    const { _id } = res3.body;
                    userAgent
                        .get(`/posts/${_id}`)
                        .set('Authorization', 'Bearer ' + token)
                        .end((err4, res4) => {
                            expect(res4.status).to.equal(200);
                            const { _id: _id2 } = res4.body;
                            expect(_id2).to.equal(_id);
                            done();
                        });
                });
            });
        });
    });
    it('should up vote created post by id', (done) => {
        done();
    });
    it('should down vote created post by id', (done) => {
        done();
    });
    it('should not up vote twice created post by id', (done) => {
        done();
    });
    it('should not down vote twice created post by id', (done) => {
        done();
    });
    it('should not find non-existent post', (done) => {
        done();
    });
});
