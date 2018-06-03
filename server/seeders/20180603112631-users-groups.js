const fixtures = require('../fixtures/default');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('users_groups', fixtures.usersGroups, {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('users_groups', null, {});
    }
};
