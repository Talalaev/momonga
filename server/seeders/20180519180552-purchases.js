const fixtures = require('../fixtures/default');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('purchases', fixtures.purchases, {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('purchases', null, {});
    }
};
