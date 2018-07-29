/**
 * @swagger
 * /currencies:
 *   get:
 *     security:
 *       - APIKeyQueryParam: []
 *       - cookieAuth: []
 *     tags:
 *       - Currency - работа с валютой
 *     description: Возвращает список валют
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Array => [Currency]
 *         schema:
 *           $ref: '#/definitions/Currency'
 * /currency-by-iso-alpha3/{code}:
 *   get:
 *     security:
 *       - APIKeyQueryParam: []
 *       - cookieAuth: []
 *     tags:
 *       - Currency - работа с валютой
 *     description: Возвращает данные по запрошенной валюте
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: code
 *        description: code страны Alpha-2 ISO 3166-1
 *        in: path
 *        type: string
 *        required: true
 *        example: 'RUB'
 *     responses:
 *       200:
 *         description: Currency
 *         schema:
 *           $ref: '#/definitions/Currency'
 */
const Router = require('koa-router');
const currency = new Router();
const checkAuthByToken = require('../middlewares/checkAuthByToken');
const curencies = require('../libs/currency');

currency
  .get('currencies', '/currencies', checkAuthByToken(), async (ctx) => {
    ctx.body = curencies.list;
  })
  .get('currency-by-iso-alpha3', '/currency-by-iso-alpha3/:code', checkAuthByToken(), async (ctx) => {
    try {
      const code = ctx.params.code.toUpperCase();
      const currency = curencies[code];

      ctx.assert(currency, 404, 'Указанная валюта не найдена!');

      ctx.body = currency;
    } catch(err) {
      ctx.throw(422, err, {cause: {...err}});
    }
  });

module.exports = currency;
