const router = require('express').Router();
const models = require('../db/models');
const bcrypt = require('bcryptjs');

// Create a new user
// Create a new user
router.post("/users", async (req, res) => {
    try {
        const { nickname, email, password, user_type } = req.body;

        // Validate input (you can add more comprehensive validation as needed)
        if (!nickname || !email || !password) {
            return res.status(400).send('fields are required');
        }

        // Check for existing user
        const existingUser = await models.users.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).send('User with this email already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await models.users.create({
            nickname,
            email,
            password: hashedPassword,
            created_date: new Date(),
            user_type
        }, { exclude: ['user_id'] });

        res.status(201).json({
            user_id: newUser.user_id,
            nickname: newUser.nickname,
            email: newUser.email,
            user_type: newUser.user_type
        });

    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

// Login route should be defined before the /users/:id route
router.post("/users/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await models.users.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare hashed password with the one provided
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Upon successful login
        res.json({
            message: "Login successful",
            user: {
                user_id: user.user_id,
                nickname: user.nickname,
                email: user.email,
                user_type: user.user_type
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

// Retrieve all users
router.get("/users", (req, res) => {
    models.users.findAll()
    .then(users => {
        res.json(users);
    })
    .catch(err => {
        res.status(500).send(err.message);
    });
});

// Retrieve a single user by ID
router.get("/users/:id", (req, res) => {
    const { id } = req.params;
    if (!/^\d+$/.test(id)) {  // Ensure that id is a number
        return res.status(400).send("User ID should be an integer");
    }

    models.users.findByPk(id)
    .then(user => {
        if (user) {
            res.json(user);
        } else {
            res.status(404).send('User not found');
        }
    })
    .catch(err => {
        res.status(500).send(err.message);
    });
});

// Update a user
router.put("/users/:id", async (req, res) => {
    const { id } = req.params;
    if (!/^\d+$/.test(id)) {  // Ensure that id is a number
        return res.status(400).send("User ID should be an integer");
    }

    const { nickname, email, password, userType } = req.body;
    let updatedData = { nickname, email, userType }; // Fix typo here
    if (password) {
        updatedData.password = await bcrypt.hash(password, 10);
    }
    models.users.update(updatedData, { where: { user_id: id } }) // Ensure lowercase and correct naming
    .then(() => {
        res.send("User updated successfully");
    })
    .catch(err => {
        res.status(500).send(err.message);
    });
});

// Update points for all users
router.get('/updatePoints', async (req, res) => {
    try {
        // Get total points for each user
        const pointsResult = await models.collectedbeers.findAll({
            attributes: ['user_id', [models.sequelize.fn('SUM', models.sequelize.col('points_awarded')), 'total_points']],
            group: ['user_id']
        });

        // Update pointssum in users table
        for (const row of pointsResult) {
            await models.users.update(
                { pointssum: row.dataValues.total_points },
                { where: { user_id: row.user_id } }
            );
        }

        res.send('Points updated successfully!');
    } catch (error) {
        console.error('Error updating points:', error);
        res.status(500).send('Error updating points');
    }
});

// Delete a user
router.delete("/users/:id", (req, res) => {
    const { id } = req.params;
    if (!/^\d+$/.test(id)) {  // Ensure that id is a number
        return res.status(400).send("User ID should be an integer");
    }

    models.users.destroy({
        where: { user_id: id } // Ensure lowercase and correct naming
    })
    .then(() => {
        res.send("User deleted successfully");
    })
    .catch(err => {
        res.status(500).send(err.message);
    });
});

module.exports = router;