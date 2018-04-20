/**
 * @desc - Test модель является примером использования
 * @example
 * // app.js
 * const Test = require('./models/test');
 * Test
 *   .findOne()
 *   .then(test => {
 *      console.log(test.toJSON());
 *   });
 * Test
 *   .create({name: 'имя 2'})
 *   .spread((test, created) => {
 *      console.log(test.toJSON());
 *      console.log(created);
 *   });
 * */
const Sequelize = require('sequelize');
const sequelize = require('../libs/sequelize');
let
    model = {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        }
    },
    options = {
        timestamps: false
    };
const Test = sequelize.define('test', model, options);

module.exports = Test;
