/**
 * @swagger
 * /country:
 *   get:
 *     tags:
 *       - Country - работа со странами
 *     description: Возвращает список стран
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Array => [Country]
 *         schema:
 *           $ref: '#/definitions/Country'
 */