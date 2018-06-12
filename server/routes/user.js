/**
 * @swagger
 * /auth-user:
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
 * /users:
 *   get:
 *     security:
 *       - APIKeyQueryParam: []
 *       - cookieAuth: []
 *     tags:
 *       - User - работа с пользователями
 *     description: Возвращает список всех пользователей
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Array => [User]
 *         schema:
 *           $ref: '#/definitions/User'
 * /users/{id}:
 *   get:
 *     security:
 *       - APIKeyQueryParam: []
 *       - cookieAuth: []
 *     tags:
 *       - User - работа с пользователями
 *     description: Возвращает пользователя по его id
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: id
 *        description: id пользователя
 *        in: path
 *        type: integer
 *        required: true
 *        example: 1
 *     responses:
 *       200:
 *         description: Array => User
 *         schema:
 *           $ref: '#/definitions/User'
 *   patch:
 *     security:
 *       - APIKeyQueryParam: []
 *       - cookieAuth: []
 *     tags:
 *       - User - работа с пользователями
 *     description: Редактирование пользователя по id
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: id
 *        description: id пользователя
 *        in: path
 *        type: integer
 *        required: true
 *        example: 1
 *      - name: user
 *        description: Новый объект данных user
 *        in: body
 *        required: true
 *        example:
 *        schema:
 *          $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: Array => [User]
 *         schema:
 *           $ref: '#/definitions/User'
 *   delete:
 *     security:
 *       - APIKeyQueryParam: []
 *       - cookieAuth: []
 *     tags:
 *       - User - работа с пользователями
 *     description: Удаление пользователя по id
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: id
 *        description: id пользователя
 *        in: path
 *        type: integer
 *        required: true
 *        example: 1
 *     responses:
 *       200:
 *         description: Array => [User]
 *         schema:
 *           $ref: '#/definitions/User'
 */
const Router = require('koa-router');
const user = new Router();
const User = require('../models/user');
const isAuthenticated = require('../libs/isAuthenticated');

user
    .get('auth-user', '/auth-user', async (ctx, next) => {
        isAuthenticated(ctx);

        try {
            let user = await User.findById(ctx.session.passport.user);

            ctx.body = user.toJson();
        } catch(err) {
            ctx.throw(422, err, {cause: {...err}});
        }
    })
    .get('users', '/users', async (ctx, next) => {
        isAuthenticated(ctx);

        try {
            let users = await User.findAll({limit: 50});

            ctx.assert(user, 404, 'Пользователи не найдены!');
            ctx.body = users.map(user => user.toJson());
        } catch(err) {
            ctx.throw(422, err, {cause: {...err}});
        }
    })
    .get('user-by-id', '/users/:id', async (ctx, next) => {
        isAuthenticated(ctx);

        try {
            let user = await User.findById(ctx.params.id);

            ctx.assert(user, 404, 'Пользователь не найден!');
            ctx.body = user.toJson();
        } catch(err) {
            ctx.throw(422, err, {cause: {...err}});
        }
    })
    .patch('patch-user', '/users/:id', async (ctx, next) => {
        isAuthenticated(ctx);

        try {
            let user = await User.findById(ctx.params.id);
            user = await user.update(ctx.request.body);
            ctx.body = user.toJson();
        } catch(err) {
            ctx.throw(422, err, {cause: {...err}});
        }
    })
    .delete('delete-user', '/users/:id', async (ctx, next) => {
        isAuthenticated(ctx);

        try {
            let user = await User.findById(ctx.params.id);
            ctx.assert(user, 404, `Пользователя с id:${ctx.params.id} не существует!`);

            if (ctx.session.passport.user === ctx.params.id) ctx.logout();

            user = await user.destroy();
            ctx.body = user.toJson();
        } catch(err) {
            ctx.throw(422, err, {cause: {...err}});
        }
    });

module.exports = user;
