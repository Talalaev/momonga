const fixtures = require('../fixtures/default');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('invitations', fixtures.invitations, {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('invitations', null, {});
    }
};