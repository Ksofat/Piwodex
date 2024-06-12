const express = require("express");
const cors = require("cors");
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
app.use(cors()); // Dodaj to, aby zezwolić na CORS
app.use(express.json());

// define all routes
app.use('/api/beers', beerRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/collectedBeers', collectedBeerRoutes);
app.use('/api/users', userRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/userAchievements', userAchievementRoutes);
app.use('/api/discussions', discussionRoutes);
app.use('/api/visited', visitedRoutes);

app.use('/api-docs', swaggerDocs.serve, swaggerDocs.setup);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
