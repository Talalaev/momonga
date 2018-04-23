/**
 * @swagger
 * /user:
 *   get:
 *     security:
 *       - APIKeyQueryParam: []
 *       - cookieAuth: []
 *     tags:
 *       - User - работа с пользователями
 *     description: Возвращает список пользователей
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

user
    .get("/user", async (ctx, next) => {
        try {
            let user = await User.findOne({
                attributes: { exclude: ["passwordHash", "salt"] }
            });
            ctx.body = user;
        } catch(err) {
            ctx.body = 'server error ' + err;
        }
    });

module.exports = user;
