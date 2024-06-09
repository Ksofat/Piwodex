'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class visited extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      visited.belongsTo(models.users, { foreignKey: 'user_id' });
      visited.belongsTo(models.stores, { foreignKey: 'store_id' });
    }
  }
  visited.init({
    visited_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    visited: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    store_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'stores',
        key: 'store_id'
      }
    }
  }, {
    sequelize,
    modelName: 'visited',
    tableName: 'visited',
    timestamps: false
  });
  return visited;
};