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
    it('should do request successfully', done => {
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

    it('should do check typeof id, login and email', done => {
        const agent = chai.request.agent(server);
        agent
            .post(auth.url('login'))
            .send({email: 'momo@momonga.ru', password: '123456'})
            .end(function(err, res) {
                return agent
                    .get(user.url('users'))
                    .end(function(err, res) {
                        res.should.have.status(200);
                        expect(res.body[5].id).to.be.a('number');
                        expect(res.body[42].login).to.be.a('string');
                        expect(res.body[7].email).to.be.a('string');
                        done();
                    });
            });
    });

    it('should get user with id 57', done => {
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
});

describe('Patch user', () => {
    it('should create new name for user id 77', done => {
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
                            .send({ login: chance.word() })
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
});

describe('Delete user', () => {
    it('should create and then delete user id 100000', done => {
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

    /**
     * 1. проверить создание пользователя, вход под этим пользователем, удаление и далее
     * 2. патчинг и удаление должно быть только для себя.
     * 3. а удаление по id нужно только для администраторов приложения, которые пока не планируются
     * */
});
