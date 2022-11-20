"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    return queryInterface.bulkInsert("transactions", [
      {
        // id: 1,
        debitedAccountId: 1,
        creditedAccountId: 2,
        value: 15,
        createdAt: new Date(),
      },
      {
        // id: 2,
        debitedAccountId: 2,
        creditedAccountId: 3,
        value: 11,
        createdAt: new Date(),
      },
      {
        // id: 3,
        debitedAccountId: 3,
        creditedAccountId: 4,
        value: 15,
        createdAt: new Date(),
      },
      {
        // id: 4,
        debitedAccountId: 4,
        creditedAccountId: 1,
        value: 20,
        createdAt: new Date(),
      },
      {
        // id: 5,
        debitedAccountId: 1,
        creditedAccountId: 4,
        value: 30,
        createdAt: new Date(),
      },
      {
        // id: 6,
        debitedAccountId: 1,
        creditedAccountId: 3,
        value: 22,
        createdAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, _Sequelize) {
    return queryInterface.bulkDelete("transactions", null, {});
  },
};
