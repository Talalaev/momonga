const fixtures = require('../fixtures/default');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('groups', fixtures.groups, {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('groups', null, {});
    }
};