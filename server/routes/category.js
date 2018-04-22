/**
 * @swagger
 * /category:
 *   get:
 *     tags:
 *       - Category - работа с категориями
 *     description: Возвращает список категорий
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Array => [Category]
 *         schema:
 *           $ref: '#/definitions/Category'
 */