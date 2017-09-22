'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    var sequelize = queryInterface.sequelize;
    return sequelize.transaction(function (t) {
      return queryInterface.addColumn('users', 'age', Sequelize.INTEGER.UNSIGNED, {transaction: t})
        .then(function () {
          return queryInterface.addColumn('users', 'created_at', Sequelize.DATE, {transaction: t});
        })
        .then(function () {
          return queryInterface.addColumn('users', 'updated_at', Sequelize.DATE, {transaction: t});
        });
    });
  },

  down: function (queryInterface, Sequelize) {
    var sequelize = queryInterface.sequelize;
    return sequelize.transaction(function (t) {
      return queryInterface.removeColumn('users', 'age', {transaction: t})
        .then(function () {
          return queryInterface.removeColumn('users', 'created_at', {transaction: t});
        })
        .then(function () {
          return queryInterface.removeColumn('users', 'updated_at', {transaction: t});
        })
    });
  }
};
