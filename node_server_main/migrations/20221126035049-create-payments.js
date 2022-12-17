'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('payments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      begin: {
        type: Sequelize.DATE
      },
      end: {
        type: Sequelize.DATE
      },
      total: {
        type: Sequelize.DECIMAL
      },
      subscription_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model:'subscriptions',
          key: 'id'
        },
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model:'users',
          key: 'id'
        },
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
      },
      state: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('payments');
  }
};