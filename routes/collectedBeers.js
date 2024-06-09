const router = require('express').Router();
const models = require('../db/models');

// Create a new collected beer entry
router.post("/collectedBeers", (req, res) => {
    const { collected_date, points_awarded, user_id, beer_id } = req.body;
    models.CollectedBeers.create({
        collected_date,
        points_awarded,
        user_id,
        beer_id
    }).then((collectedBeer) => {
        res.status(201).json(collectedBeer);
    }).catch((err) => {
        res.status(500).send(err.message);
    });
});

// Retrieve all collected beers
router.get("/collectedBeers", (req, res) => {
    models.CollectedBeers.findAll()
    .then(collectedBeers => {
        res.json(collectedBeers);
    })
    .catch(err => {
        res.status(500).send(err.message);
    });
});

// Retrieve a single collected beer by ID
router.get("/collectedBeers/:id", (req, res) => {
    const { id } = req.params;
    models.CollectedBeers.findByPk(id)
    .then(collectedBeer => {
        if (collectedBeer) {
            res.json(collectedBeer);
        } else {
            res.status(404).send('Collected Beer not found');
        }
    })
    .catch(err => {
        res.status(500).send(err.message);
    });
});

// Retrieve all collected beers by user_id
router.get("/collectedBeers/user/:user_id", (req, res) => {
    const { user_id } = req.params;
    models.CollectedBeers.findAll({
        where: { user_id }
    })
    .then(collectedBeers => {
        res.json(collectedBeers);
    })
    .catch(err => {
        res.status(500).send(err.message);
    });
});

// Update a collected beer
router.put("/collectedBeers/:id", (req, res) => {
    const { id } = req.params;
    const { CollectedDate, PointsAwarded, UserID, BeerID } = req.body;
    models.CollectedBeers.update({
        CollectedDate, PointsAwarded, UserID, BeerID
    }, {
        where: { CollectedBeerID: id }
    })
    .then(() => {
        res.send("Collected Beer updated successfully");
    })
    .catch(err => {
        res.status(500).send(err.message);
    });
});

module.exports = router;

