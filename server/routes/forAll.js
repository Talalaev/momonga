/**
 * @swagger
 * /swagger.json:
 *   get:
 *     tags:
 *       - swagger JSON
 *     description: Служебный роут необходимый для работы документации
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: возвращает swagger спецификацию
 *         schema:
 *           $ref: '#/definitions/Purchase'
 */
const Router = require("koa-router");
const forAll = new Router();
const locales = require('config').locales;
const swaggerSpec = require('../libs/apiDocs');

forAll
    .get("/", async (ctx, next) => {
        try {
            await ctx.render('assets/pages/main/index.pug', {
                appName: "Momo San",
                locales: locales,
                lang: ctx.i18n.getLocale()
            });
        } catch(err) {
            // возможно путь к станице не коректный. обработать ошибку.
            ctx.body = 'server error ' + err;
        }
    })
    .get('/swagger.json', (ctx, next) => {
        ctx.response.set('Content-Type', 'application/json');
        ctx.body = swaggerSpec;
    });

module.exports = forAll;
