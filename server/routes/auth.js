/**
 * @swagger
 * securityDefinitions:
 *   APIKeyQueryParam:
 *     type: apiKey
 *     in: query
 *     name: token
 *   cookieAuth:
 *     type: apiKey
 *     in: cookie
 *     name: koa.sid
 * /login:
 *   post:
 *     tags:
 *       - Auth - работа с авторизацией и регистрацией
 *     description: Вход в учетную запись
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: body
 *        description: Почта
 *        in: body
 *        required: true
 *        example: {email: 'momo@momonga.ru', password: '123456'}
 *     responses:
 *       200:
 *         description: объект с именем и почтой
 * /regist:
 *   post:
 *     tags:
 *       - Auth - работа с авторизацией и регистрацией
 *     description: Регистрация новой учетной записи
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: "ok"
 * /logout:
 *   get:
 *     tags:
 *       - Auth - работа с авторизацией и регистрацией
 *     description: Выйти из учетной записи
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: "ok"
 */
const Router = require("koa-router");
const auth = new Router();
const passport = require('koa-passport');
const User = require('../models/user');

auth
    .get("/verify-auth", async (ctx, next) => {
        if (!ctx.session.passport) {
            ctx.status = 401;
            ctx.body = { msg: "Auth error" };

            return;
        }

        let user = await User.findOne({where: {id: ctx.session.passport.user}});

        if (user) {
            ctx.status = 200;
            ctx.body = {
                name: user.login,
                email: user.email
            };

            return;
        }

        ctx.status = 401;
        ctx.body = { msg: "Auth error" };
    })
    .get('/logout', (ctx, next) => {
        ctx.status = 200;
        ctx.logout();
    })
    .get('/is-login-taken', async (ctx, next) => {
        const login = ctx.request.query.login;

        const user = await User.findOne({where: {login}});

        ctx.status = 200;
        if (user) {
            ctx.body = {taken: true};

            return;
        }

        ctx.body = {taken: false};
    })
    .post("/login", function (ctx, next) {
        return passport.authenticate('local', async function(err, user, info) {
            if (err) throw err;

            ctx.assert(user, 401, info.message);
            ctx.body = user;
            ctx.login(user);
        })(ctx, next);
    })
    .post("/regist", async (ctx, next) => {
        let user = {
            login: ctx.request.body.login,
            email: ctx.request.body.email,
            password: ctx.request.body.password
        };

        try {
            user = await User.create(user);

            ctx.status = 200;
            ctx.body = "ok";
            ctx.login(user);
        } catch(e) {
            ctx.status = 400;
            if (11000 === e.code || 11001 === e.code) {
                return ctx.body = {
                    status: 409,
                    msgs: ['Duplicate Email']
                };
            }

            ctx.body = {
                code: e.code,
                msg: e.errmsg
            };
        }
    });

module.exports = auth;
