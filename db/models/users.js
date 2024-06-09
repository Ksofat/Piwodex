'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      users.hasMany(models.CollectedBeers, { foreignKey: 'user_id' });
    }
  }
  users.init({
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nickname: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    created_date: DataTypes.DATE,
    user_type: DataTypes.STRING,
    pointssum: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'users',
    tableName: 'users',
    timestamps: false
  });
  return users;
};
