/**
 * @swagger
 * /purchases:
 *   get:
 *     security:
 *       - APIKeyQueryParam: []
 *       - cookieAuth: []
 *     tags:
 *       - Purchase - работа с покупками
 *     description: Возвращает список покупок для авторизированного пользователя
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: createFrom
 *        description: Дата создания от и позже
 *        in: query
 *        required: false
 *        example:
 *        schema:
 *          $ref: '#/definitions/Purchase'
 *      - name: createTo
 *        description: Дата создания до и раньше
 *        in: query
 *        required: false
 *        example:
 *        schema:
 *          $ref: '#/definitions/Purchase'
 *     responses:
 *       200:
 *         description: Array => [Purchase]
 *         schema:
 *           $ref: '#/definitions/Purchase'
 *   post:
 *     security:
 *       - APIKeyQueryParam: []
 *       - cookieAuth: []
 *     tags:
 *       - Purchase - работа с покупками
 *     description: Создает покупку для авторизированного пользователя
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: purchase
 *        description: Новый объект данных purchase
 *        in: body
 *        required: true
 *        example:
 *        schema:
 *          $ref: '#/definitions/Purchase'
 *     responses:
 *       200:
 *         description: Array => [Purchase]
 *         schema:
 *           $ref: '#/definitions/Purchase'
 * /purchases/{id}:
 *   patch:
 *     security:
 *       - APIKeyQueryParam: []
 *       - cookieAuth: []
 *     tags:
 *       - Purchase - работа с покупками
 *     description: Редактирует покупку по ее id
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: id
 *        description: id покупки
 *        in: path
 *        type: integer
 *        required: true
 *        example: 1
 *      - name: purchase
 *        description: Новый объект данных purchase
 *        in: body
 *        required: true
 *        example:
 *        schema:
 *          $ref: '#/definitions/Purchase'
 *     responses:
 *       200:
 *         description: Array => [Purchase]
 *         schema:
 *           $ref: '#/definitions/Purchase'
 *   delete:
 *     security:
 *       - APIKeyQueryParam: []
 *       - cookieAuth: []
 *     tags:
 *       - Purchase - работа с покупками
 *     description: Удаляет покупку по ее id
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: id
 *        description: id покупки
 *        in: path
 *        type: integer
 *        required: true
 *        example: 1
 *     responses:
 *       200:
 *         description: Array => [Purchase]
 *         schema:
 *           $ref: '#/definitions/Purchase'
 */
const Router = require("koa-router");
const purchase = new Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Purchase = require('../models/purchase');
const checkAuthByToken = require('../middlewares/checkAuthByToken');

purchase
    .get('purchases', '/purchases', checkAuthByToken(), async (ctx) => {
        try {
            let createFrom = ctx.request.query.createFrom;
            let createTo = ctx.request.query.createTo;
            let filter = { where: {userID: ctx.user.id} };
            if (createFrom || createTo) {
                let createdAt = {};
                if (createFrom) createdAt[Op.gte] = new Date(createFrom);
                if (createTo) createdAt[Op.lte] = new Date(createTo);
                filter.where = {
                    [Op.and]: { userID: ctx.user.id, createdAt }
                };
            }

            ctx.body = await Purchase.findAll(filter);
        } catch(err) {
            ctx.throw(422, err, {cause: {...err}});
        }
    })
    .post('purchases', '/purchases', checkAuthByToken(), async (ctx) => {
        try {
            let purchase = {
                ...ctx.request.body,
                ...{userID: ctx.user.id}
            };
            ctx.body = await Purchase.create(purchase);
        } catch(err) {
            ctx.throw(422, err, {cause: {...err}});
        }
    })
    .patch('purchases', '/purchases/:id', checkAuthByToken(), async (ctx) => {
        try {
            let purchase = await Purchase.findOne({
                where: {
                    [Op.and]: {id: ctx.params.id, userID: ctx.user.id}
                }
            });
            ctx.assert(purchase, 404, `Покупки с id:${ctx.params.id} не существует!`);

            ctx.body = await purchase.update({
                ...ctx.request.body,
                ...{id: ctx.params.id, userID: ctx.user.id}
            });
        } catch(err) {
            ctx.throw(422, err, {cause: {...err}});
        }
    })
    .delete('purchases', '/purchases/:id', checkAuthByToken(), async (ctx) => {
        try {
            let purchase = await Purchase.findOne({
                where: {
                    [Op.and]: {id: ctx.params.id, userID: ctx.user.id}
                }
            });
            ctx.assert(purchase, 404, `Покупки с id:${ctx.params.id} не существует!`);

            ctx.body = await purchase.destroy();
        } catch(err) {
            ctx.throw(422, err, {cause: {...err}});
        }
    });

module.exports = purchase;
