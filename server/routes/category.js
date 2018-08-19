/**
 * @swagger
 * /categories:
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
const checkAuthByToken = require('../middlewares/checkAuthByToken');

category
    .get('categories', '/categories', checkAuthByToken(), async (ctx) => {
        try {
            ctx.body = await Category.findAll();
        } catch(err) {
            ctx.throw(422, err, {cause: {...err}});
        }
    });

module.exports = category;
