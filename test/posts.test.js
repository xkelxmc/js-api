import mongoose from 'mongoose';
import { expect, should } from 'chai';
import request from 'supertest';

import app from '../index';

describe('POSTS: Check auth query', () => {
    it('should not access protected resources if not logged in', (done) => {
        done();
    });

    it('should not access protected resources with bad token', (done) => {
        done();
    });

    it('should get all posts', (done) => {
        done();
    });

    it('should create a post', (done) => {
        done();
    });

    it('should not create post if missing title', (done) => {
        done();
    });
    it('should not create post if missing body', (done) => {
        done();
    });

    it('should get user posts', (done) => {
        done();
    });

    it('should get created post by id', (done) => {
        done();
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
