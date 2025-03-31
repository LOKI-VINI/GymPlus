const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authenticateAdmin = require('../middleware/adminAuth');

// Get all trainers (Admin Only)
router.get('/', authenticateAdmin, async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM trainers');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
