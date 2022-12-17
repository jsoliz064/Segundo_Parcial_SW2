'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class posts extends Model {
    
    // hide protected fields
    toJSON() {
      const PROTECTED_ATTRIBUTES = ['file_id']
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
      posts.belongsTo(models.categories,{
        foreignKey:'category_id',
        target_key: 'id'
      }),
      posts.belongsTo(models.user,{
        foreignKey:'user_id',
        target_key: 'id'
      }),
      posts.hasMany(models.comment,{
        foreignKey:'post_id'
      })
    }
  }
  posts.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    file_path: DataTypes.STRING,
    file_id: DataTypes.STRING,
    category_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'posts',
  });
  return posts;
};