'use strict';

const categoriesArray = ['Indumentaria', 'Accesorios'];
const categories = categoriesArray.map((category, index) => {
  return {
    name: category,
    createdAt: new Date(),
    updatedAt: new Date()
  }
});

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Categories', categories, {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});

  }
};
