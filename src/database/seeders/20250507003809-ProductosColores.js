'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const productsJSON = require('../../data/products.json');
    const colors = await queryInterface.sequelize.query(
      'SELECT id, name FROM Colors;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    
    const products = await queryInterface.sequelize.query(
      'SELECT id, name FROM Products;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const productColors = [];

    productsJSON.forEach((productData) => {
      const productFound = products.find(p => p.name === productData.name);
      
      if (productFound) {
        productData.colors.forEach(colorName => {
          const colorFound = colors.find(color => color.name === colorName);
          if (colorFound) {
            productColors.push({
              productId: productFound.id,
              colorId: colorFound.id,
              createdAt: new Date(),
              updatedAt: new Date()
            });
          }
        });
      }
    });

    await queryInterface.bulkInsert('ProductColors', productColors, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ProductColors', null, {});
  }
};
