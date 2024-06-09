'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Beers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Beers.hasMany(models.CollectedBeers, { foreignKey: 'beer_id' });
    }
  }
  Beers.init({
    beer_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true // Assuming BeerID is also auto-incremented
    },
    beer_name: DataTypes.STRING,
    bar_code: DataTypes.STRING,
    tier: DataTypes.STRING,
    beer_image: DataTypes.BLOB,
    alcohol_content: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Beers',
    tableName: 'beers', // Ensure the table name is correctly specified if it's case-sensitive
    timestamps: false // Assuming no createdAt or updatedAt columns
  });
  return Beers;
};
