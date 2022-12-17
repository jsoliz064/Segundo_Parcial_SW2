'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class payments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  payments.init({
    begin: DataTypes.DATE,
    end: DataTypes.DATE,
    total: DataTypes.DECIMAL,
    subscription_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    state: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'payments',
  });
  return payments;
};