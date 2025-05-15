'use strict';
require('dotenv').config();
const {hashSync} = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Users', [
      {
        userName: 'admin',
        email: 'admin@gmail.com',
        password: hashSync(process.env.PASSWORD_ADMIN, 10),
        address : "Calle falsa 123",
        zipCode : "1234",
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userName: 'user',
        email: 'user@gmail.com',
        password: hashSync("123123", 10),
        address : "Calle falsa 123",
        zipCode : "1234",
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});

  }
};
