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
 * /auth-user-by-token:
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
const passport = require('koa-passport');
const compose = require('koa-compose');
const User = require('../models/user');
const checkAuthByToken = require('../middlewares/checkAuthByToken');
const checkAdminAccess = require('../middlewares/checkAdminAccess');

const checkAccessRights = compose([
    checkAuthByToken(), // проверит валидность токена
    async (ctx, next) => { // разрешает редактировать только данные своего профиля
        if (!ctx.user.isAdmin) {
            if (ctx.user.id != ctx.params.id) ctx.throw(403, 'Ошибка доступа, Запрет на выполнение операции!');
        }
        await next();
    }
]);

user
    .get('auth-user', '/auth-user', checkAuthByToken(), async (ctx) => {
        ctx.body = ctx.user;
    })
    .get('users', '/users', compose([checkAuthByToken(), checkAdminAccess()]), async (ctx) => {
        try {
            User.findAll({limit: 50}).then(res => ctx.body = 'Hi!');
            let users = await User.findAll({limit: 50});

            ctx.assert(user, 404, 'Пользователи не найдены!');
            ctx.body = users.map(user => user.toJson());
        } catch(err) {
            ctx.throw(422, err, {cause: {...err}});
        }
    })
    .get('user-by-id', '/users/:id', checkAccessRights, async (ctx) => {
        try {
            let user = await User.findById(ctx.params.id);

            ctx.assert(user, 404, 'Пользователь не найден!');
            ctx.body = user.toJson();
        } catch(err) {
            ctx.throw(422, err, {cause: {...err}});
        }
    })
    .patch('patch-user', '/users/:id', checkAccessRights, async (ctx, next) => {
        try {
            let user = await User.findById(ctx.params.id);
            user = await user.update(ctx.request.body);
            ctx.body = user.toJson();
        } catch(err) {
            ctx.throw(422, err, {cause: {...err}});
        }
    })
    .delete('delete-user', '/users/:id', checkAccessRights, async (ctx, next) => {
        try {
            let user = await User.findById(ctx.params.id);
            ctx.assert(user, 404, `Пользователя с id:${ctx.params.id} не существует!`);

            // if (ctx.session.passport.user === ctx.params.id) ctx.logout();

            user = await user.destroy();
            ctx.body = user.toJson();
        } catch(err) {
            ctx.throw(422, err, {cause: {...err}});
        }
    });

module.exports = user;
