const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authenticateUser = require('../middleware/auth');

// Get all payments
router.get('/', authenticateUser, async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM payments');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
