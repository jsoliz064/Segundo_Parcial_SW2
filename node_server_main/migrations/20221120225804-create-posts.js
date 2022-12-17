'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      file_path: {
        type: Sequelize.STRING
      },
      file_id: {
        type: Sequelize.STRING
      },
      category_id: {
        type: Sequelize.INTEGER,
        references:{
          model:'categories',
          key: 'id'
        },
        onDelete:'SET NULL',
        onUpdate:'CASCADE'
      },
      user_id: {
        type: Sequelize.INTEGER,
        references:{
          model:'users',
          key: 'id'
        },
        onDelete:'SET NULL',
        onUpdate:'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('posts');
  }
};