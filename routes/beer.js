const router = require('express').Router();
const models = require('../db/models');

// Create a new beer
router.post("/beers", (req, res) => {
    const { BeerName, BarCode, Tier, BeerImage, AlcoholContent } = req.body;
    models.Beers.create({
        BeerName,
        BarCode,
        Tier,
        BeerImage,
        AlcoholContent
    }).then((beer) => {
        res.status(201).json(beer);
    }).catch((err) => {
        res.status(500).send(err.message);
    });
});

// Get all beers
router.get("/beers", (req, res) => {
    models.Beers.findAll()
    .then((beers) => {
        res.json(beers);
    }).catch((err) => {
        res.status(500).send(err.message);
    })
});

// Get a single beer by ID
router.get("/beers/:id", (req, res) => {
    const { id } = req.params;
    models.Beers.findByPk(id)
    .then((beer) => {
        if (beer) {
            res.json(beer);
        } else {
            res.status(404).send('Beer not found');
        }
    }).catch((err) => {
        res.status(500).send(err.message);
    })
});

// Get all beers by ID
router.get("/beers_all/:beer_id", async (req, res) => {
    try {
        const beer = await models.Beers.findByPk(req.params.beer_id);
        if (beer) {
            // Convert BLOB to Base64 (assuming the image is stored as a buffer in BLOB)
            const base64Image = beer.beer_image.toString('base64');
            beer.beer_image = `data:image/jpeg;base64,${base64Image}`;
            res.json(beer);
        } else {
            res.status(404).send("Beer not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});


// Get a single beer by Bar Code
router.get("/beer_code/:bar_code", (req, res) => {
    const { bar_code } = req.params;
    models.Beers.findOne({ where: { bar_code: bar_code } })
    .then((beer) => {
        if (beer) {
            res.json(beer);
        } else {
            res.status(404).send('Beer not found');
        }
    }).catch((err) => {
        res.status(500).send(err.message);
    })
});

// Update a beer by ID
router.put("/beers/:id", (req, res) => {
    const { id } = req.params;
    const { BeerName, BarCode, Tier, BeerImage, AlcoholContent } = req.body;
    models.Beers.update({
        BeerName, BarCode, Tier, BeerImage, AlcoholContent
    }, {
        where: { id }
    }).then(() => {
        res.send("Beer updated successfully");
    }).catch((err) => {
        res.status(500).send(err.message);
    })
});

// Delete a beer by ID
router.delete("/beers/:id", (req, res) => {
    const { id } = req.params;
    models.Beers.destroy({
        where: { id }
    }).then(() => {
        res.send("Beer deleted successfully");
    }).catch((err) => {
        res.status(500).send(err.message);
    })
});

module.exports = router;