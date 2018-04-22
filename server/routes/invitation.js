/**
 * @swagger
 * /invitation:
 *   get:
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