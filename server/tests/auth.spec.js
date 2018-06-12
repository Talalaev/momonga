const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index.js');
const should = chai.should();
const expect = chai.expect();
const assert = require('assert');
const auth = require('../routes/auth');
const User = require('../models/user');

chai.use(chaiHttp);

describe('Is login taken', () => {
    it('should done without errors', done => {
        chai
            .request(server)
            .get(auth.url('is-login-taken', {query: {login: 'test'}}))
            .end(function(err, res) {
                should.not.exist(err);
                done();
            });
    });
    it('should have property taken in response', done => {
        chai
            .request(server)
            .get(auth.url('is-login-taken', {query: {login: 'test'}}))
            .end(function(err, res) {
                res.type.should.eql("application/json");
                res.body.should.have.property('taken');
                done();
            });
    });
    it('property taken should be boolean type', done => {
        chai
            .request(server)
            .get(auth.url('is-login-taken', {query: {login: 'test'}}))
            .end(function(err, res) {
                assert(typeof res.body.taken === 'boolean');
                done();
            });
    });
    it('login "momo" should be taken', done => {
        chai
            .request(server)
            .get(auth.url('is-login-taken', {query: {login: 'momo'}}))
            .end(function(err, res) {
                assert(res.body.taken === true);
                done();
            });
    });
    it('login "freeLogin" should be free', done => {
        chai
            .request(server)
            .get(auth.url('is-login-taken', {query: {login: 'freeLogin'}}))
            .end(function(err, res) {
                assert(res.body.taken === false);
                done();
            });
    });
});

describe('Logout', () => {
    it('should return "ok"', done => {
        chai
            .request(server)
            .get(auth.url('logout'))
            .end(function(err, res) {
                assert(res.body.res === 'ok');
                done();
            });
    });
});

describe('Login', () => {
    it('should return user with email "momo@momonga.ru"', done => {
        chai
            .request(server)
            .post(auth.url('login'))
            .send({email: 'momo@momonga.ru', password: '123456'})
            .end(function(err, res) {
                assert(res.body.email === 'momo@momonga.ru');
                done();
            });
    });
    it('should return auth error 401', done => {
        chai
            .request(server)
            .post(auth.url('login'))
            .send({email: 'momo@momonga.ru', password: 'wrong password'})
            .end(function(err, res) {
                res.should.have.status(401);
                assert(res.body.message === 'Нет такого пользователя или пароль неверен!');
                done();
            });
    });
});

describe('Register', () => {
    it('should return error 422 short password', done => {
        chai
            .request(server)
            .post(auth.url('register'))
            .send({
                login: "test4",
                email: "some@mail.ru",
                password: "short"
            })
            .end(function(err, res) {
                res.should.have.status(422);
                assert(
                    res.body.message === 'Минимальная длинна паролья 6 символов!',
                    'Не верное сообщение об ошибке короткого пароль'
                );
                done();
            });
    });

    it('should return error 422 duplicate email', done => {
        let email = "momo@momonga.ru";
        chai
            .request(server)
            .post(auth.url('register'))
            .send({
                login: "test4",
                email,
                password: "normal password"
            })
            .end(function(err, res) {
                res.should.have.status(422);
                assert(
                    res.body.message === `E-mail: ${email} уже зарегистрирован!`,
                    'Не верное сообщение об ошибке занятого email'
                );
                done();
            });
    });

    it('should return error 422 duplicate login', done => {
        let login = 'momo';
        chai
            .request(server)
            .post(auth.url('register'))
            .send({
                login,
                email: "somenew@mail.ru",
                password: "normal password"
            })
            .end(function(err, res) {
                res.should.have.status(422);
                assert(
                    res.body.message === `Login: ${login} уже зарегистрирован!`,
                    'Не верное сообщение об ошибке занятого login'
                );
                done();
            });
    });

    it('should register successfully', async () => {
        let
            email = 'unusedemail@mail.ru',
            login = 'unusedlogin',
            user = await User.findOne({where: { email }});

        if (user) await user.destroy();

        let res = await chai
            .request(server)
            .post(auth.url('register'))
            .send({
                login,
                email,
                password: 'normal password'
            });

        res.should.have.status(200);
        assert(
            res.body.login === login,
            `User c login: ${login} не зарегистрирован`
        );
        assert(
            res.body.email === email,
            `User c email: ${email} не зарегистрирован`
        );
    });
});
