/**
 * @swagger
 * /purchase:
 *   get:
 *     tags:
 *       - Purchase - работа с покупками
 *     description: Возвращает список покупок
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Array => [User]
 *         schema:
 *           $ref: '#/definitions/Purchase'
 */