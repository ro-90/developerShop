'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const productsJSON = require('../../data/products.json');
    const brands = await queryInterface.sequelize.query(
      'SELECT id, name FROM Brands;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    const categories = await queryInterface.sequelize.query(
      'SELECT id, name FROM Categories;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    const products = productsJSON.map(product => {
      const brandFound = brands.find(brand => brand.name === product.brand);
      const categoryFound = categories.find(category => category.name === product.category);
      return {
        name: product.name,
        price: (Math.floor(Math.random() * 90) + 10) * 1000,
        description: product.description,
        image: product.image,
        brandId: brandFound ? brandFound.id : null,
        categoryId: categoryFound? categoryFound.id : null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });

    await queryInterface.bulkInsert('Products', products, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
