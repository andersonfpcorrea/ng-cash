"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    return queryInterface.bulkInsert("users", [
      {
        // id: 1,
        username: "Matthew",
        password: "123456", // Hash the passwords
        accountId: 1,
      },
      {
        // id: 2,
        username: "Mark",
        password: "123456", // Hash the passwords
        accountId: 2,
      },
      {
        // id: 3,
        username: "Luke",
        password: "123456", // Hash the passwords
        accountId: 3,
      },
      {
        // id: 4,
        username: "John",
        password: "123456", // Hash the passwords
        accountId: 4,
      },
    ]);
  },

  async down(queryInterface, _Sequelize) {
    return queryInterface.bulkDelete("users", null, {});
  },
};
