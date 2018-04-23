/**
 * @swagger
 * /invitation:
 *   get:
 *     security:
 *       - APIKeyQueryParam: []
 *       - cookieAuth: []
 *     tags:
 *       - Invitation - работа с приглашениями
 *     description: Возвращает список приглашений
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Array => [Invitation]
 *         schema:
 *           $ref: '#/definitions/Invitation'
 */
const Router = require("koa-router");
const invitation = new Router();
const Invitation = require('../models/user');

invitation
    .get("/invitation", async (ctx, next) => {
        try {
            let invitation = await Invitation.findOne();
            ctx.body = invitation;
        } catch(err) {
            ctx.body = 'server error ' + err;
        }
    });

module.exports = invitation;
