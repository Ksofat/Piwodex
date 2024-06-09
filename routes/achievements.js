const router = require('express').Router();
const models = require('../db/models');

// Create a new achievement
router.post("/achievements", (req, res) => {
    const { Description, TierRequired } = req.body;
    models.Achievements.create({
        Description,
        TierRequired
    }).then((achievement) => {
        res.status(201).json(achievement);
    }).catch((err) => {
        res.status(500).send(err.message);
    });
});

// Get all achievements
router.get("/achievements", (req, res) => {
    models.Achievements.findAll()
    .then((achievements) => {
        res.json(achievements);
    }).catch((err) => {
        res.status(500).send(err.message);
    })
});

// Get a single achievement by ID
router.get("/achievements/:id", (req, res) => {
    const { id } = req.params;
    models.Achievements.findByPk(id)
    .then((achievement) => {
        if (achievement) {
            res.json(achievement);
        } else {
            res.status(404).send('Achievement not found');
        }
    }).catch((err) => {
        res.status(500).send(err.message);
    })
});

// Update an achievement by ID
router.put("/achievements/:id", (req, res) => {
    const { id } = req.params;
    const { Description, TierRequired } = req.body;
    models.Achievements.update({
        Description, TierRequired
    }, {
        where: { id }
    }).then(() => {
        res.send("Achievement updated successfully");
    }).catch((err) => {
        res.status(500).send(err.message);
    })
});

// Delete an achievement by ID
router.delete("/achievements/:id", (req, res) => {
    const { id } = req.params;
    models.Achievements.destroy({
        where: { id }
    }).then(() => {
        res.send("Achievement deleted successfully");
    }).catch((err) => {
        res.status(500).send(err.message);
    })
});

module.exports = router;