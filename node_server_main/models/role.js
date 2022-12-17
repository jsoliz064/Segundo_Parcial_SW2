'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class role extends Model {
    
    // hide protected fields
    toJSON() {
      const PROTECTED_ATTRIBUTES = ['createdAt', 'updatedAt']
      let attributes = Object.assign({}, this.get())
      for (let a of PROTECTED_ATTRIBUTES) {
        delete attributes[a]
      }
      return attributes
    }
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      role.hasMany(models.user,{
        foreignKey:'role_id'
      })
    }
  }
  role.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'role',
  });
  return role;
};