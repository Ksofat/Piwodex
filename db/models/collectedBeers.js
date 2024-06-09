'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CollectedBeers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CollectedBeers.belongsTo(models.users, { foreignKey: 'user_id' });
      CollectedBeers.belongsTo(models.Beers, { foreignKey: 'beer_id' });
    }
  }
  CollectedBeers.init({
    collected_beer_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    collected_date: DataTypes.DATE,
    points_awarded: DataTypes.INTEGER,
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    beer_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Beers',
        key: 'beer_id'
      }
    }
  }, {
    sequelize,
    modelName: 'CollectedBeers',
    tableName: 'collectedbeers',
    timestamps: false
  });
  return CollectedBeers;
};
