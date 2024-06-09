const router = require('express').Router();
const models = require('../db/models');

// Create a new user achievement
router.post("/userAchievements", (req, res) => {
    const { AchivedDate, UserID, AchivementID } = req.body; // Corrected spelling for AchievementID
    models.UserAchievements.create({
        AchievedDate,
        UserID,
        AchivementID // Corrected spelling
    }).then((userAchievement) => {
        res.status(201).json(userAchievement);
    }).catch((err) => {
        res.status(500).send(err.message);
    });
});

// Get all user achievements
router.get("/userAchievements", (req, res) => {
    models.UserAchievements.findAll()
    .then((userAchievements) => {
        res.json(userAchievements);
    }).catch((err) => {
        res.status(500).send(err.message);
    });
});

// Get a single user achievement by ID
router.get("/userAchievements/:id", (req, res) => {
    const { id } = req.params;
    models.UserAchievements.findByPk(id)
    .then((userAchievement) => {
        if (userAchievement) {
            res.json(userAchievement);
        } else {
            res.status(404).send('User Achievement not found');
        }
    }).catch((err) => {
        res.status(500).send(err.message);
    });
});

// Update a user achievement by ID
router.put("/userAchievements/:id", (req, res) => {
    const { id } = req.params;
    const { AchivedDate, UserID, AchivementID } = req.body;
    models.UserAchievements.update({
        AchievedDate, UserID, AchivementID
    }, {
        where: { UserAchievementID: id }
    }).then(() => {
        res.send("User Achievement updated successfully");
    }).catch((err) => {
        res.status(500).send(err.message);
    });
});

// Delete a user achievement by ID
router.delete("/userAchievements/:id", (req, res) => {
    const { id } = req.params;
    models.UserAchievements.destroy({
        where: { UserAchievementID: id }
    }).then(() => {
        res.send("User Achievement deleted successfully");
    }).catch((err) => {
        res.status(500).send(err.message);
    });
});

module.exports = router;