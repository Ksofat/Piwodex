'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserAchievements extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define associations here
      UserAchievements.belongsTo(models.users, { foreignKey: 'user_id' });
      UserAchievements.belongsTo(models.Achievements, { foreignKey: 'achievement_id' });
    }
  }
  UserAchievements.init({
    user_achievement_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    achived_date: DataTypes.DATE,
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'UserID'
      }
    },
    achievement_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Achievements',
        key: 'AchievementID'
      }
    }
  }, {
    sequelize,
    modelName: 'UserAchievements',
    tableName: 'userachievements',
    timestamps: false
  });
  return UserAchievements;
};