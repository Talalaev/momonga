/**
 * @swagger
 * securityDefinitions:
 *   APIKeyQueryParam:
 *     type: apiKey
 *     in: query
 *     name: token
 *   cookieAuth:
 *     type: apiKey
 *     in: cookie
 *     name: koa.sid
 * */

const auth = require('./auth');
const category = require('./category');
const country = require('./country');
const forAll = require('./forAll');
const group = require('./group');
const invitation = require('./invitation');
const purchase = require('./purchase');
const user = require('./user');

module.exports = {
    auth,
    category,
    country,
    forAll,
    group,
    invitation,
    purchase,
    user
};