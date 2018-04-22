/**
 * @swagger
 * /group:
 *   get:
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