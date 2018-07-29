/**
 * @swagger
 * /countries:
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
 * /country-by-iso-alpha2/{code}:
 *   get:
 *     security:
 *       - APIKeyQueryParam: []
 *       - cookieAuth: []
 *     tags:
 *       - Country - работа со странами
 *     description: Возвращает страну по коду iso alpha2
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: code
 *        description: code страны iso alpha2
 *        in: path
 *        type: string
 *        required: true
 *        example: 'RU'
 *     responses:
 *       200:
 *         description: Country
 *         schema:
 *           $ref: '#/definitions/Country'
 * /country-by-id/{id}:
 *   get:
 *     security:
 *       - APIKeyQueryParam: []
 *       - cookieAuth: []
 *     tags:
 *       - Country - работа со странами
 *     description: Возвращает страну по id
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: id
 *        description: id страны
 *        in: path
 *        type: integer
 *        required: true
 *        example: 1
 *     responses:
 *       200:
 *         description: Country
 *         schema:
 *           $ref: '#/definitions/Country'
 */
const Router = require("koa-router");
const country = new Router();
const checkAuthByToken = require('../middlewares/checkAuthByToken');
const Country = require('../models/country');

country
    .get("countries", "/countries", checkAuthByToken(), async (ctx, next) => {
      ctx.body = await Country.findAll();
    })
  .get("country-by-iso-alpha2", "/country-by-iso-alpha2/:code", checkAuthByToken(), async (ctx, next) => {
    try {
      const code = ctx.params.code.toUpperCase();
      const country = await Country.findOne({ where: { code }});

      ctx.assert(country, 404, 'Страна не найдена!');

      ctx.body = country;
    } catch(err) {
      ctx.throw(422, err, {cause: {...err}});
    }
  })
  .get("country-by-id", "/country-by-id/:id", checkAuthByToken(), async (ctx, next) => {
    try {
      const country = await Country.findById(ctx.params.id);

      ctx.assert(country, 404, 'Страна не найдена!');

      ctx.body = country;
    } catch(err) {
      ctx.throw(422, err, {cause: {...err}});
    }
  });

module.exports = country;
