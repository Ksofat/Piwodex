const router = require('express').Router();
const sequelize = require('sequelize');
const { Op } = require('sequelize');
const models = require('../db/models');

// Create a new discussion
router.post("/discussions", (req, res) => {
    const { message, user_id, store_id } = req.body;
    models.discussions.create({
        message,
        modified_date: new Date(),
        user_id,
        store_id
    }).then((discussion) => {
        res.status(201).json(discussion);
    }).catch((err) => {
        res.status(500).send(err.message);
    });
});

// Get all discussions
router.get("/discussions", (req, res) => {
    models.discussions.findAll()
    .then((discussions) => {
        res.json(discussions);
    }).catch((err) => {
        res.status(500).send(err.message);
    });
});

// Get a single discussion by ID
router.get("/discussions/:id", (req, res) => {
    const { id } = req.params;
    models.discussions.findByPk(id)
    .then((discussion) => {
        if (discussion) {
            res.json(discussion);
        } else {
            res.status(404).send('Discussion not found');
        }
    }).catch((err) => {
        res.status(500).send(err.message);
    });
});

// Update a discussion by ID
router.put("/discussions/:id", (req, res) => {
    const { id } = req.params;
    const { message, modified_date, user_id, store_id } = req.body;
    models.discussions.update({
        message,
        modified_date: new Date(modified_date),
        user_id,
        store_id
    }, {
        where: { discussion_id: id }
    }).then(() => {
        res.send("Discussion updated successfully");
    }).catch((err) => {
        res.status(500).send(err.message);
    });
});

// Delete a discussion by ID
router.delete("/discussions/:id", (req, res) => {
    const { id } = req.params;
    models.discussions.destroy({
        where: { discussion_id: id }
    }).then(() => {
        res.send("Discussion deleted successfully");
    }).catch((err) => {
        res.status(500).send(err.message);
    });
});

// Get the earliest message for each unique store_id
router.get("/discussions-earliest-by-store", (req, res) => {
    models.discussions.findAll({
        attributes: [
            'store_id',
            [sequelize.fn('min', sequelize.col('discussions.modified_date')), 'earliest_message_date']
        ],
        include: [{
            model: models.stores,
            attributes: ['store_name', 'location_x', 'location_y'], // Include location attributes
            as: 'store'
        }],
        group: ['discussions.store_id', 'store.store_id', 'store.location_x', 'store.location_y'], // Include location fields in the grouping
        order: [[sequelize.fn('min', sequelize.col('discussions.modified_date')), 'ASC']]
    })
    .then(discussions => {
        // Format the response if necessary, or send it directly
        const formattedData = discussions.map(item => ({
            store_id: item.store_id,
            earliest_message_date: item.dataValues.earliest_message_date,
            store_name: item.store.store_name,
            location_x: item.store.location_x,
            location_y: item.store.location_y
        }));
        res.json(formattedData);
    })
    .catch(err => {
        console.error(err);
        res.status(500).send(err.message);
    });
});

router.get("/discussions/store/:store_id", (req, res) => {
    const { store_id } = req.params;
    models.discussions.findAll({
        where: { store_id: store_id },
        include: [{
            model: models.stores,
            attributes: ['store_name'],
            as: 'store'
        }]
    })
    .then(discussions => {
        if (discussions.length > 0) {
            res.json(discussions);
        } else {
            res.status(404).send('No discussions found for this store');
        }
    })
    .catch(err => {
        console.error(err);
        res.status(500).send(err.message);
    });
});

module.exports = router;