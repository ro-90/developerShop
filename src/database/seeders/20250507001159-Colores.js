'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const colors = [
      {
        name: 'Blanco',
        hexa: '#FFFFFF',  // Correcto
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Rojo',
        hexa: '#FF0000',  // Correcto
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Azul',
        hexa: '#0000FF',  // Correcto
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Marron',
        hexa: '#8B4513',  // Correcto
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Negro',
        hexa: '#000000',  // Correcto
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Verde',
        hexa: '#00FF00',  // Actualizado para un verde más vivo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Gris',
        hexa: '#808080',  // Correcto
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Morado',
        hexa: '#800080',  // Correcto
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Bordo',
        hexa: '#800000',  // Correcto
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Naranja',
        hexa: '#FFA500',  // Correcto
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Amarillo',
        hexa: '#FFFF00',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Celeste',
        hexa: '#87CEEB',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('Colors', colors, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Colors', null, {});
  }
};