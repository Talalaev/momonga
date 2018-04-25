/**
 * @swagger
 * /group:
 *   get:
 *     security:
 *       - APIKeyQueryParam: []
 *       - cookieAuth: []
 *     tags:
 *       - Group - работа с группами
 *     description: Возвращает список групп
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Array => [Group]
 *         schema:
 *           $ref: '#/definitions/Group'
 */
const Router = require("koa-router");
const group = new Router();
const Group = require('../models/group');
const isAuthenticated = require('../libs/isAuthenticated');

group
    .get("/group", async (ctx, next) => {
        try {
            let group = await Group.findOne();
            ctx.body = group;
        } catch(err) {
            ctx.body = 'server error ' + err;
        }
    });

module.exports = group;
