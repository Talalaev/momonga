/**
 * @swagger
 * definitions:
 *   Purchase:
 *     properties:
 *       id:
 *         type: integer
 *       userID:
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
        }
    },
    options = {};

const Purchase = sequelize.define('purchase', model, options);

module.exports = Purchase;
