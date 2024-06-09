'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class stores extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here if necessary
    }
  }
  stores.init({
    store_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    store_name: DataTypes.STRING,
    location_x: DataTypes.FLOAT,
    location_y: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'stores',
    tableName: 'stores',
    timestamps: false
  });
  return stores;
};