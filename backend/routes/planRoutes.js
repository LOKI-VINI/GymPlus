const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authenticateUser = require('../middleware/auth');

router.get('/', authenticateUser, async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM plans');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
