/**
 * @swagger
 * definitions:
 *   Invitation:
 *     properties:
 *       id:
 *         type: integer
 *       userID:
 *         type: integer
 *       groupID:
 *         type: integer
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
        userID: {
            type: Sequelize.INTEGER,
            required: true
        },
        groupID: {
            type: Sequelize.INTEGER,
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

const Invitation = sequelize.define('invitation', model, options);

module.exports = Invitation;
