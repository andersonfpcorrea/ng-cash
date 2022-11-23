"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    return queryInterface.bulkInsert("users", [
      {
        username: "John",
        password:
          "$2a$12$Ny1jsng2pAHp5p4.my0b9O8FAljpSRnyMevZmSmp8M.WXlXrxc8Ia",
        accountId: 1,
      },
      {
        username: "Luke",
        password:
          "$2a$12$6rQtcmGD9SkiMaE/wX/yQOc9iqeOIREWgAhSoQFH08J5oH8GEaf8.",
        accountId: 2,
      },
      {
        username: "Mark",
        password:
          "$2a$12$xSqDXCuJct.XedX4P7npOuFTRKwm.l5d.VShyHiBYnVCksu7RIAU6",
        accountId: 3,
      },
      {
        username: "Matthew",
        password:
          "$2a$12$85vQx0EvYLBDpNaOwLOVcOtIIx0d/SgW4beRcdhZDpX18lV5gqYdi",
        accountId: 4,
      },
    ]);
  },

  async down(queryInterface, _Sequelize) {
    return queryInterface.bulkDelete("users", null, {});
  },
};
