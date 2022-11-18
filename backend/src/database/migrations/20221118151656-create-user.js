"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: {
        type: Sequelize.STRING,
        unique: true,
        validate: {
          min: 3,
        },
      },
      password: {
        type: Sequelize.STRING,
      },
      accountId: {
        type: Sequelize.INTEGER,
        references: {
          model: "accounts",
          key: "id",
        },
      },
    });
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable("users");
  },
};
