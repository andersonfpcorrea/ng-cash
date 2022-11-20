"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    return queryInterface.bulkInsert("accounts", [
      {
        // id: 1,
        balance: 100,
      },
      {
        // id: 2,
        balance: 100,
      },
      {
        // id: 3,
        balance: 100,
      },
      {
        // id: 4,
        balance: 100,
      },
    ]);
  },

  async down(queryInterface, _Sequelize) {
    return queryInterface.bulkDelete("accounts", null, {});
  },
};
