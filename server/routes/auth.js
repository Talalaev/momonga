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

        let user = await User.findOne({_id: ctx.session.passport.user}).exec();

        if (user) {
            ctx.status = 200;
            ctx.body = {
                name: user.displayName,
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

        const user = await User.findOne({displayName: login});

        ctx.status = 200;
        if (user) {
            ctx.body = {taken: true};

            return;
        }

        ctx.body = {taken: false};
    })
    .post("/login", function (ctx, next) {
        // console.log(ctx.request.body);
        return passport.authenticate('local', function(err, user, info) {
            if (err) throw err;

            ctx.response.set('Content-Type', 'application/json');

            if (user === false) {
                ctx.status = 401;
                ctx.body = "Auth error";
                //ctx.redirect("/");

                return;
            }

            ctx.status = 200;
            ctx.body = {
                name: user.displayName,
                email: user.email
            };
            return ctx.login(user);
            // ctx.isAuthenticated()
        })(ctx, next);
    })
    .post("/regist", async (ctx, next) => {
        let user = {
            displayName: ctx.request.body.login,
            email: ctx.request.body.email,
            password: ctx.request.body.password
        };

        try {
            user = await new User(user).save();
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