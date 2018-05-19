const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index.js');
const should = chai.should();
const user = require('../routes/user');
const User = require('../models/user');

chai.use(chaiHttp);

describe('Auth user', () => {
    it('should return data', done => {
        chai
            .request(server)
            .get(user.url('auth-user'))
            .end(function(err, res) {
                should.not.exist(err);
                res.type.should.eql("application/json");
                done();
            });
    });
});

describe('Users', () => {
    it('should return data', done => {
        chai
            .request(server)
            .get(user.url('users'))
            .end(function(err, res) {
                should.not.exist(err);
                res.type.should.eql("application/json");
                done();
            });
    });
});

describe('Patch user', () => {
    it('should return data', done => {
        chai
            .request(server)
            .patch(user.url('patch-user'))
            .end(function(err, res) {
                should.not.exist(err);
                res.type.should.eql("application/json");
                done();
            });
    });
});

describe('Delete user', () => {
    it('should return data', done => {
        chai
            .request(server)
            .delete(user.url('delete-user'))
            .end(function(err, res) {
                should.not.exist(err);
                res.type.should.eql("application/json");
                done();
            });
    });
});
