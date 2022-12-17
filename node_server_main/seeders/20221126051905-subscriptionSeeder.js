'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('subscriptions', [
      {
        name: 'Diario',
        price: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Mensual',
        price:10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Anual',
        price:50,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
