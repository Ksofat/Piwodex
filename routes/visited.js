const router = require('express').Router();
const models = require('../db/models');

// Create a new visited entry
router.post("/visited", (req, res) => {
    const { visited, user_id, store_id } = req.body;

    models.users.findByPk(user_id).then(user => {
        if (!user) {
            return res.status(400).json({ error: "Invalid user_id" });
        }

        models.stores.findByPk(store_id).then(store => {
            if (!store) {
                return res.status(400).json({ error: "Invalid store_id" });
            }

            models.visited.create({
                visited,
                user_id,
                store_id
            }).then((visitedEntry) => {
                res.status(201).json(visitedEntry);
            }).catch((err) => {
                console.error("Error creating visited entry:", err);
                res.status(500).send(err.message);
            });

        }).catch((err) => {
            console.error("Error finding store:", err);
            res.status(500).send(err.message);
        });

    }).catch((err) => {
        console.error("Error finding user:", err);
        res.status(500).send(err.message);
    });
});

// Retrieve all visited entries
router.get("/visited", (req, res) => {
    models.visited.findAll()
    .then(visitedEntries => {
        res.json(visitedEntries);
    })
    .catch(err => {
        res.status(500).send(err.message);
    });
});

// Retrieve a single visited entry by ID
router.get("/visited/:id", (req, res) => {
    const { id } = req.params;
    models.visited.findByPk(id)
    .then(visitedEntry => {
        if (visitedEntry) {
            res.json(visitedEntry);
        } else {
            res.status(404).send('Visited entry not found');
        }
    })
    .catch(err => {
        res.status(500).send(err.message);
    });
});

// Retrieve visited entries by user ID
router.get("/visited/user/:userId", (req, res) => {
    const { userId } = req.params;
    models.visited.findAll({
        where: { user_id: userId }
    })
    .then(visitedEntries => {
        res.json(visitedEntries);
    })
    .catch(err => {
        res.status(500).send(err.message);
    });
});

// Update a visited entry
router.put("/visited/:id", (req, res) => {
    const { id } = req.params;
    const { visited, user_id, store_id } = req.body;
    models.visited.update({
        visited, user_id, store_id
    }, {
        where: { visited_id: id }
    })
    .then(() => {
        res.send("Visited entry updated successfully");
    })
    .catch(err => {
        res.status(500).send(err.message);
    });
});

router.get("/stores/visited/:userId", (req, res) => {
    const { userId } = req.params;
    models.stores.findAll({
        include: [{
            model: models.visited,
            where: {
                user_id: userId,
            },
            required: false // This ensures that stores are returned even if there is no visited record
        }]
    })
    .then(stores => {
        const result = stores.map(store => ({
            ...store.get({ plain: true }),
            visited: store.visited.length > 0
        }));
        res.json(result);
    })
    .catch(err => {
        console.error("Error retrieving stores with visit info:", err);
        res.status(500).send(err.message);
    });
});


module.exports = router;