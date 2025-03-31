const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authenticateUser = require('../middleware/auth');
const authenticateAdmin = require('../middleware/adminAuth');

// Get all members (Admin & User)
router.get('/', authenticateUser, async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM members');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Add a new member (Admin Only)
router.post('/', authenticateAdmin, async (req, res) => {
    const { name, email, phone, membership_type } = req.body;
    try {
        await db.query('INSERT INTO members (name, email, phone, membership_type) VALUES (?, ?, ?, ?)', 
            [name, email, phone, membership_type]);
        res.status(201).json({ message: 'Member added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
