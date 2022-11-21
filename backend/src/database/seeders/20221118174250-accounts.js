"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    return queryInterface.bulkInsert("accounts", [
      {
        balance: 100,
      },
      {
        balance: 100,
      },
      {
        balance: 100,
      },
      {
        balance: 100,
      },
    ]);
  },

  async down(queryInterface, _Sequelize) {
    return queryInterface.bulkDelete("accounts", null, {});
  },
};
