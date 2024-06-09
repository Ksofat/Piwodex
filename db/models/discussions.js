'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class discussions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define associations here
      discussions.belongsTo(models.users, { foreignKey: 'user_id' });
      discussions.belongsTo(models.stores, { foreignKey: 'store_id' });
    }
  }
  discussions.init({
    discussion_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    message: DataTypes.TEXT,
    modified_date: DataTypes.DATE,
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    store_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'stores',
        key: 'store_id'
      }
    }
  }, {
    sequelize,
    modelName: 'discussions',
    tableName: 'discussions',
    timestamps: false
  });
  return discussions;
};