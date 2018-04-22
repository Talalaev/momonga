/**
 * @swagger
 * definitions:
 *   Country:
 *     properties:
 *       id:
 *         type: integer
 *       nameRU:
 *         type: string
 *       nameEN:
 *         type: string
 *       code:
 *         type: string
 */
const Sequelize = require('sequelize');
const sequelize = require('../libs/sequelize');

let
    model = {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nameRU: {
            type: Sequelize.STRING,
            required: true
        },
        nameEN: {
            type: Sequelize.STRING,
            required: true
        },
        code: {
            type: Sequelize.STRING,
            required: true
        }
    },
    options = {};

const Country = sequelize.define('country', model, options);

module.exports = Country;
