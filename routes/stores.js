const router = require('express').Router();
const models = require('../db/models');

// Create a new store
router.post("/stores", (req, res) => {
    const { StoreName, LocationX, LocationY } = req.body;
    models.stores.create({
        StoreName,
        LocationX,
        LocationY
    }).then((store) => {
        res.status(201).json(store);
    }).catch((err) => {
        res.status(500).send(err.message);
    });
});

// Get all stores
router.get("/stores", (req, res) => {
    models.stores.findAll()
    .then((stores) => {
        res.json(stores);
    }).catch((err) => {
        res.status(500).send(err.message);
    });
});

// Get a single store by ID
router.get("/stores/:id", (req, res) => {
    const { id } = req.params;
    models.stores.findByPk(id)
    .then((store) => {
        if (store) {
            res.json(store);
        } else {
            res.status(404).send('Store not found');
        }
    }).catch((err) => {
        res.status(500).send(err.message);
    });
});

// Update a store by ID
router.put("/stores/:id", (req, res) => {
    const { id } = req.params;
    const { StoreName, LocationX, LocationY } = req.body;
    models.stores.update({
        StoreName, LocationX, LocationY
    }, {
        where: { StoreID: id }
    }).then(() => {
        res.send("Store updated successfully");
    }).catch((err) => {
        res.status(500).send(err.message);
    });
});

// Delete a store by ID
router.delete("/stores/:id", (req, res) => {
    const { id } = req.params;
    models.stores.destroy({
        where: { StoreID: id }
    }).then(() => {
        res.send("Store deleted successfully");
    }).catch((err) => {
        res.status(500).send(err.message);
    });
});

router.get("/stores/visited/:userId", async (req, res) => {
    const { userId } = req.params;

    try {
        // Fetch all stores first
        const stores = await models.stores.findAll();

        // Now, fetch visited records separately
        const visitedRecords = await models.visited.findAll({
            where: { user_id: userId }
        });

        // Create a map of visited store IDs for quick lookup
        const visitedStoreIds = new Set(visitedRecords.map(visit => visit.store_id));

        // Map stores and add 'visited' flag
        const result = stores.map(store => ({
            ...store.get({ plain: true }),
            visited: visitedStoreIds.has(store.store_id)  // Check if store was visited
        }));

        res.json(result);
    } catch (err) {
        console.error("Error retrieving stores with visit info:", err);
        res.status(500).send(err.message);
    }
});

module.exports = router;