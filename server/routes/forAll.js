const Router = require("koa-router");
const forAll = new Router();
const locales = require('config').locales;
const swaggerJSDoc = require('swagger-jsdoc');

// initialize swagger-jsdoc
let swaggerSpec = swaggerJSDoc({
    // import swaggerDefinitions
    swaggerDefinition: {
        info: {
            title: 'Node Swagger API',
            version: '1.0.0',
            description: 'Demonstrating how to describe a RESTful API with Swagger',
        },
        host: 'localhost:3000',
        basePath: '/',
    },
    // path to the API docs
    apis: ['./server/routes/*.js'],
});

/**
 * @swagger
 * /swagger.json:
 *   get:
 *     tags:
 *       - Puppies
 *     description: Returns all puppies
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of puppies
 *         schema:
 *           $ref: '#/definitions/Puppy'
 */
/**
 * @swagger
 * definitions:
 *   Puppy:
 *     properties:
 *       name:
 *         type: string
 *       breed:
 *         type: string
 *       age:
 *         type: integer
 *       sex:
 *         type: string
 */
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