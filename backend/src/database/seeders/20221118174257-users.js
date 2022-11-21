"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    return queryInterface.bulkInsert("users", [
      {
        username: "Matthew",
        password: "123456", // Hash the passwords
        accountId: 1,
      },
      {
        username: "Mark",
        password: "123456", // Hash the passwords
        accountId: 2,
      },
      {
        username: "Luke",
        password: "123456", // Hash the passwords
        accountId: 3,
      },
      {
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
