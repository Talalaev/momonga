/**
 * @swagger
 * definitions:
 *   Purchase:
 *     properties:
 *       id:
 *         type: integer
 *       userID:
 *         type: integer
 *       groupID:
 *         type: integer
 *       categoryID:
 *         type: integer
 *       currencyID:
 *         type: integer
 *       countryID:
 *         type: integer
 *       city:
 *         type: string
 *       name:
 *         type: string
 *       price:
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
        categoryID: {
            type: Sequelize.INTEGER,
            required: true
        },
        currencyID: {
            type: Sequelize.INTEGER,
            required: true
        },
        countryID: {
            type: Sequelize.INTEGER,
            required: true
        },
        city: {
            type: Sequelize.STRING,
            required: true
        },
        name: {
            type: Sequelize.STRING,
            required: true
        },
        price: {
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

const Purchase = sequelize.define('purchase', model, options);

module.exports = Purchase;
