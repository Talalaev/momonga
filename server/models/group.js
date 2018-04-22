/**
 * @swagger
 * definitions:
 *   Group:
 *     properties:
 *       id:
 *         type: integer
 *       name:
 *         type: string
 *       description:
 *         type: string
 *       createdAt:
 *         type: date
 *       updatedAt:
 *         type: date
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
        name: {
            type: Sequelize.STRING,
            required: true
        },
        description: {
            type: Sequelize.STRING,
            required: true
        },
        createdAt: {
            type: Sequelize.DATE
        },
        updatedAt: {
            type: Sequelize.DATE
        }
    },
    options = {};

const Group = sequelize.define('group', model, options);

module.exports = Group;
