/**
 * @swagger
 * /purchase:
 *   get:
 *     security:
 *       - APIKeyQueryParam: []
 *       - cookieAuth: []
 *     tags:
 *       - Purchase - работа с покупками
 *     description: Возвращает список покупок
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Array => [User]
 *         schema:
 *           $ref: '#/definitions/Purchase'
 */
const Router = require("koa-router");
const purchase = new Router();
const Purchase = require('../models/purchase');

purchase
    .get("/purchase", async (ctx, next) => {
        try {
            let purchase = await Purchase.findOne();
            ctx.body = purchase;
        } catch(err) {
            ctx.body = 'server error ' + err;
        }
    });

module.exports = purchase;
