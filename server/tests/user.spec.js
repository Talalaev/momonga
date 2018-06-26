const chance = new (require('chance').Chance);
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index.js');
const expect = chai.expect;
const should = chai.should();
const auth = require('../routes/auth');
const user = require('../routes/user');
const User = require('../models/user');

chai.use(chaiHttp);

describe('Auth user', () => {
    it('user should be authorized', (done) => {
        const agent = chai.request.agent(server);
        agent
            .post(auth.url('login'))
            .send({email: 'momo@momonga.ru', password: '123456'})
            .end(function(err, res) {
                return agent
                    .get(user.url('auth-user'))
                    .end(function(err, res) {
                        should.not.exist(err);
                        res.should.have.status(200);
                        expect(res.body.login).to.equal('momo');
                        done();
                    });
            });
    });

    it('user should be not authorized', (done) => {
        const agent = chai.request.agent(server);
        agent
            .get(user.url('auth-user'))
            .end(function(err, res) {
                res.should.have.status(401);
                done();
            });
    });
});

describe('Users', () => {
    it('admin should get all users list successfully', done => {
        const agent = chai.request.agent(server);
        agent
            .post(auth.url('login'))
            .send({email: 'momo@momonga.ru', password: '123456'})
            .end(function(err, res) {
                return agent
                    .get(user.url('users'))
                    .end(function(err, res) {
                        should.not.exist(err);
                        res.type.should.eql("application/json");
                        res.should.have.status(200);
                        done();
                    });
            });
    });

    it('usual user should not be able to get all users list', done => {
        const agent = chai.request.agent(server);
        agent
            .post(auth.url('login'))
            .send({email: 'usualUser@gmail.ru', password: '123456'})
            .end(function(err, res) {
                return agent
                    .get(user.url('users'))
                    .end(function(err, res) {
                        should.not.exist(err);
                        res.type.should.eql("application/json");
                        res.should.have.status(403);
                        done();
                    });
            });
    });

    it('admin should get anyone user by id successfully', done => {
        const agent = chai.request.agent(server);
        agent
            .post(auth.url('login'))
            .send({email: 'momo@momonga.ru', password: '123456'})
            .end(function(err, res) {
                return agent
                    .get(user.url('user-by-id', 57))
                    .end(function(err, res) {
                        res.should.have.status(200);
                        expect(res.body.id).to.be.a('number');
                        expect(res.body.id).to.equal(57);
                        expect(res.body.login).to.be.a('string');
                        expect(res.body.email).to.be.a('string');
                        done();
                    });
            });
    });

    it('admin should get himself by id', done => {
        const agent = chai.request.agent(server);
        agent
            .post(auth.url('login'))
            .send({email: 'momo@momonga.ru', password: '123456'})
            .end(function(err, res) {
                return agent
                    .get(user.url('user-by-id', 1))
                    .end(function(err, res) {
                        res.should.have.status(200);
                        expect(res.body.id).to.be.a('number');
                        expect(res.body.id).to.equal(1);
                        expect(res.body.login).to.be.a('string');
                        expect(res.body.email).to.be.a('string');
                        done();
                    });
            });
    });

    it('usual user should get by id successfully himself', done => {
        const agent = chai.request.agent(server);
        agent
            .post(auth.url('login'))
            .send({email: 'usualUser@gmail.ru', password: '123456'})
            .end(function(err, res) {
                return agent
                    .get(user.url('user-by-id', 2))
                    .end(function(err, res) {
                        res.should.have.status(200);
                        expect(res.body.id).to.be.a('number');
                        expect(res.body.id).to.equal(2);
                        expect(res.body.login).to.be.a('string');
                        expect(res.body.email).to.be.a('string');
                        done();
                    });
            });
    });

    it('usual user should not get anyone user by id successfully', done => {
        const agent = chai.request.agent(server);
        agent
            .post(auth.url('login'))
            .send({email: 'usualUser@gmail.ru', password: '123456'})
            .end(function(err, res) {
                return agent
                    .get(user.url('user-by-id', 57))
                    .end(function(err, res) {
                        res.should.have.status(403);
                        done();
                    });
            });
    });
});

describe('Patch user', () => {
    it('admin should be able to edit any user', done => {
        const agent = chai.request.agent(server);
        agent
            .post(auth.url('login'))
            .send({email: 'momo@momonga.ru', password: '123456'})
            .end(function(err, res) {
                let oldLogin, newLogin;
                return agent
                    .get(user.url('user-by-id', 77))
                    .end(function(err, res) {
                        oldLogin = res.body.login;
                        return agent
                            .patch(user.url('user-by-id', 77))
                            .send({ login: chance.word({ length: 7 }) })
                            .end(function(err, res) {
                                res.should.have.status(200);
                                res.type.should.eql("application/json");
                                newLogin = res.body.login;
                                expect(oldLogin).to.be.a('string');
                                expect(newLogin).to.be.a('string');
                                expect(newLogin).to.not.equal(oldLogin);
                                done();
                            })
                    });
            });
    });

    it('usual user should be able to edit himself', done => {
        const agent = chai.request.agent(server);
        agent
            .post(auth.url('login'))
            .send({email: 'usualUser@gmail.ru', password: '123456'})
            .end(function(err, res) {
                let oldLogin, newLogin;
                return agent
                    .get(user.url('user-by-id', 2))
                    .end(function(err, res) {
                        oldLogin = res.body.login;
                        return agent
                            .patch(user.url('user-by-id', 2))
                            .send({ login: chance.word({ length: 7 }) })
                            .end(function(err, res) {
                                res.should.have.status(200);
                                res.type.should.eql("application/json");
                                newLogin = res.body.login;
                                expect(oldLogin).to.be.a('string');
                                expect(newLogin).to.be.a('string');
                                expect(newLogin).to.not.equal(oldLogin);
                                done();
                            })
                    });
            });
    });

    it('usual user should not be able to edit another user', done => {
        const agent = chai.request.agent(server);
        agent
            .post(auth.url('login'))
            .send({email: 'usualUser@gmail.ru', password: '123456'})
            .end(function(err, res) {
                return agent
                    .patch(user.url('user-by-id', 77))
                    .send({ login: chance.word({ length: 7 }) })
                    .end(function(err, res) {
                        res.should.have.status(403);
                        done();
                    });
            });
    });
});

describe('Delete user', () => {
    it('admin should be able to delete any user', done => {
        const agent = chai.request.agent(server);
        agent
            .post(auth.url('login'))
            .send({email: 'momo@momonga.ru', password: '123456'})
            .end(function(err, res) {
                return agent
                    .post(auth.url('register'))
                    .send({
                        id: 100000,
                        login: "test-deleting",
                        email: "test-deleting@mail.ru",
                        password: "123456"
                    })
                    .end(function(err, res) {
                        should.not.exist(err);
                        res.should.have.status(200);
                        res.type.should.eql("application/json");
                        expect(res.body.id).to.equal(100000);
                        return agent
                            .delete(user.url('delete-user', 100000))
                            .end(function(err, res) {
                                should.not.exist(err);
                                res.should.have.status(200);
                                res.type.should.eql("application/json");
                                expect(res.body.id).to.equal(100000);
                                done();
                            });
                    });
            });
    });

    it('usual user should be able to delete himself', done => {
        const agent = chai.request.agent(server);
        agent
            .post(auth.url('register'))
            .send({
                id: 100000,
                login: "test-deleting",
                email: "test-deleting@mail.ru",
                password: "123456"
            })
            .end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(200);
                res.type.should.eql("application/json");
                expect(res.body.id).to.equal(100000);
                return agent
                    .delete(user.url('delete-user', 100000))
                    .end(function(err, res) {
                        should.not.exist(err);
                        res.should.have.status(200);
                        res.type.should.eql("application/json");
                        expect(res.body.id).to.equal(100000);
                        done();
                    });
            });
    });

    it('usual user should not be able to delete another user', done => {
        const agent = chai.request.agent(server);
        agent
            .post(auth.url('login'))
            .send({email: 'usualUser@gmail.ru', password: '123456'})
            .end(function(err, res) {
                return agent
                    .delete(user.url('delete-user', 1))
                    .end(function(err, res) {
                        should.not.exist(err);
                        res.should.have.status(403);
                        done();
                    });
            });
    });
});
