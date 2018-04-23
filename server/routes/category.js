/**
 * @swagger
 * /category:
 *   get:
 *     security:
 *       - APIKeyQueryParam: []
 *       - cookieAuth: []
 *     tags:
 *       - Category - работа с категориями
 *     description: Возвращает список категорий
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Array => [Category]
 *         schema:
 *           $ref: '#/definitions/Category'
 */
const Router = require("koa-router");
const category = new Router();
const Category = require('../models/category');

category
    .get("/category", async (ctx, next) => {
        try {
            console.log(ctx.isAuthenticated());
            let category = await Category.findOne();
            ctx.body = category;
        } catch(err) {
            ctx.body = 'server error ' + err;
        }
    });

module.exports = category;
