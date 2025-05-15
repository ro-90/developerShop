'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const productsJSON = require('../../data/products.json');
    const sizes = await queryInterface.sequelize.query(
      'SELECT id, value FROM Sizes;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    
    const products = await queryInterface.sequelize.query(
      'SELECT id, name FROM Products;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const productSizes = [];

    productsJSON.forEach((productData) => {
      const productFound = products.find(p => p.name === productData.name);
      
      if (productFound) {
        productData.sizes.forEach(sizeValue => {
          const sizeFound = sizes.find(size => size.value === sizeValue);
          if (sizeFound) {
            productSizes.push({
              productId: productFound.id,
              sizeId: sizeFound.id,
              createdAt: new Date(),
              updatedAt: new Date()
            });
          }
        });
      }
    });

    await queryInterface.bulkInsert('ProductSizes', productSizes, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ProductSizes', null, {});
  }
};
