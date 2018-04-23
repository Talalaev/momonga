/**
 * @swagger
 * /country:
 *   get:
 *     security:
 *       - APIKeyQueryParam: []
 *       - cookieAuth: []
 *     tags:
 *       - Country - работа со странами
 *     description: Возвращает список стран
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Array => [Country]
 *         schema:
 *           $ref: '#/definitions/Country'
 */
const Router = require("koa-router");
const country = new Router();
const Country = require('../models/country');

country
    .get("/country", async (ctx, next) => {
        try {
            let country = await Country.findOne();
            ctx.body = country;
        } catch(err) {
            ctx.body = 'server error ' + err;
        }
    });

module.exports = country;
