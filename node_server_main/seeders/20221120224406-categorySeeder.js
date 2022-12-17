'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('categories', [
      {
        name: 'Científicos',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Monografías',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Recreativos',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Ficción',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Comedia',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
