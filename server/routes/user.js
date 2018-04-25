/**
 * @swagger
 * /user:
 *   get:
 *     security:
 *       - APIKeyQueryParam: []
 *       - cookieAuth: []
 *     tags:
 *       - User - работа с пользователями
 *     description: Возвращает авторизованного пользователя
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Array => [User]
 *         schema:
 *           $ref: '#/definitions/User'
 */
const Router = require("koa-router");
const user = new Router();
const User = require('../models/user');
const isAuthenticated = require('../libs/isAuthenticated');

user
    .get("/user", async (ctx, next) => {
        isAuthenticated(ctx);

        try {
            let user = await User.findById(ctx.session.passport.user, {
                attributes: { exclude: ["passwordHash", "salt"] }
            });

            ctx.assert(user, 404, 'Пользователь не существует!');
            ctx.body = user;
        } catch(err) {
            ctx.throw(422, err, {cause: {...err}})
        }
    });

module.exports = user;
