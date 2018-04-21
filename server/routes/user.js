/**
 * @swagger
 * /user:
 *   get:
 *     tags:
 *       - User - работа с пользователями
 *     description: Возвращает список пользователей
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Array => [User]
 *         schema:
 *           $ref: '#/definitions/User'
 */