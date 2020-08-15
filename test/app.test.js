import { expect } from 'chai';
import request from 'supertest';

import app from '../index';

describe('Api main tests', () => {
    it('should return 200', (done) => {
        request(app)
            .get('/ping')
            .end((err, res) => {
                expect(res.status).to.equal(200);
                done();
            });
    });
});
