'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Roles', [
      {
        type: 'Admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: 'User',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {});

  }
};
