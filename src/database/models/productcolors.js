'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductColors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProductColors.init({
    productId: DataTypes.INTEGER,
    colorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProductColors',
  });
  return ProductColors;
};