const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const beer = require('./beers'); // Import the Beers model
const achievements = require('./achievements'); // Import the Achievements model
const collectedBeers = require('./collectedBeers'); // Import the CollectedBeers model
const users = require('./users'); // Import the Users model
const stores = require('./stores'); // Import the Stores model
const userAchievements = require('./userAchievements'); // Import the UserAchievements model
const discussions = require('./discussions'); // Import the Discussions model
const visited = require('./visited'); // Import the Visited model

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const modelExports = [
  beer, // Add the Beers model to the array
  achievements, // Add the Achievements model to the array
  collectedBeers, // Add the CollectedBeers model to the array
  users, // Add the Users model to the array
  stores, // Add the Stores model to the array
  userAchievements, // Add the UserAchievements model to the array
  discussions, // Add the Discussions model to the array
  visited,
];

modelExports.forEach(exportedModel => {
  const model = exportedModel(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
});

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
