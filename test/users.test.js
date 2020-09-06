import mongoose from 'mongoose';
import { expect, should } from 'chai';
import request from 'supertest';

import app from '../index';

describe('USERS: Check auth query', () => {
    it('should not access protected resources if not logged in', (done) => {
        done();
    });

    it('should not access protected resources with bad token', (done) => {
        done();
    });

    it('should access to get current user if logged in', (done) => {
        done();
    });

    it('should access to get user by id if logged in', (done) => {
        done();
    });

    it('should access to get users list if logged in', (done) => {
        done();
    });

    it('should "/users/" return users array', (done) => {
        done();
    });

    it('should "/users/me/" return current user', (done) => {
        done();
    });

    it('should "/users/:userId/" return user by id', (done) => {
        done();
    });
});
