'use strict';

const brandsArray = [
  'React',
  'Google',
  'Javascript',
  'JAVA',
  'Redux',
  'GraphQL',
  'Angular',
  'PHP',
  'C#',
  'Code',
  'GitHub',
  'Python',
  'Ruby',
  'HTML',
  'CSS',
  'Vue',
  'Drupal',
  'Sass',
  'Bootstrap',
  'Materialize',
  'Tailwind',
  'NodeJS',
  'TypeScript',
];
const brands = brandsArray.map((brand, index) => {
  return {
    name: brand,
    image : null,
    createdAt: new Date(),
    updatedAt: new Date()
  }
});

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Brands', brands, {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Brands', null, {});

  }
};
