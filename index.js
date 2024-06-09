const express = require("express");
const beerRoutes = require("./routes/beer.js");
const achievementRoutes = require("./routes/achievements.js");
const collectedBeerRoutes = require("./routes/collectedBeers.js");
const userRoutes = require("./routes/users.js");
const storeRoutes = require("./routes/stores.js");
const userAchievementRoutes = require("./routes/userAchievements.js");
const discussionRoutes = require("./routes/discussions.js");
const visitedRoutes = require("./routes/visited.js");

const swaggerDocs = require('./docs/swaggerConfig');

const app = express();

// middleware
app.use(express.json());

// define all routes
app.use('/api', beerRoutes);
app.use('/api', achievementRoutes);
app.use('/api', collectedBeerRoutes);
app.use('/api', userRoutes);
app.use('/api', storeRoutes);
app.use('/api', userAchievementRoutes);
app.use('/api', discussionRoutes);
app.use('/api', visitedRoutes);

app.use('/api-docs', swaggerDocs.serve, swaggerDocs.setup);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
