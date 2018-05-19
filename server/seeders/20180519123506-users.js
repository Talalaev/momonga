const fixtures = require('../fixtures/default');

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('users', null, {})
          .then(() => queryInterface.bulkInsert('users', fixtures.users, {}));
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('users', null, {})
          .then(() => queryInterface.bulkInsert('users', [fixtures.users[0]], {}));
  }
};
