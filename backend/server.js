// require('dotenv').config();
// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const authRoutes = require('./routes/authRoutes');
// const memberRoutes = require('./routes/memberRoutes');
// const trainerRoutes = require('./routes/trainerRoutes');
// const planRoutes = require('./routes/planRoutes');
// const paymentRoutes = require('./routes/paymentRoutes');

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// app.use('/api/auth', authRoutes);
// app.use('/api/members', memberRoutes);
// app.use('/api/trainers', trainerRoutes);
// app.use('/api/plans', planRoutes);
// app.use('/api/payments', paymentRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import mysql from "mysql2";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey";

// Database Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Wagge@369",
    database: "gym",
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        process.exit(1);
    }
    console.log("Connected to MySQL database.");
});

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Access Denied. No token provided." });

    try {
        const verified = jwt.verify(token.split(" ")[1], SECRET_KEY);
        req.user = verified; // Attach user details to request
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid Token" });
    }
};

// User Signup
app.post("/api/auth/signup", async (req, res) => {
    const { name, email, password } = req.body;

    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
        if (result.length > 0) {
            return res.status(400).json({ message: "User already exists!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        db.query(
            "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
            [name, email, hashedPassword, "member"],
            (err, result) => {
                if (err) return res.status(500).json({ error: err });
                res.status(201).json({ message: "User registered successfully!" });
            }
        );
    });
});

// User Login
app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;

    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
        if (result.length === 0) {
            return res.status(400).json({ message: "User not found!" });
        }

        const user = result[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password!" });
        }

        // Generate JWT Token
        const token = jwt.sign({ userId: user.UserID, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ message: "Login successful!", token, role: user.role });
    });
});

// Verify Token Route
app.get("/api/auth/verify", (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: "Invalid token" });
        res.json({ role: decoded.role });
    });
});

// **FETCH Profile Route**
app.get("/api/auth/profile", verifyToken, (req, res) => {
    const userId = req.user.userId;

    db.query("SELECT id, name, email FROM users WHERE id = ?", [userId], (err, result) => {
        if (err) return res.status(500).json({ message: "Database error", error: err });
        if (result.length === 0) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ user: result[0] });
    });
});


// **UPDATE Profile Route**
app.put("/api/auth/profile", verifyToken, (req, res) => {
    const userId = req.user.userId;
    const { name, email } = req.body;

    db.query(
        "UPDATE users SET name = ?, email = ? WHERE id = ?",
        [name, email, userId],
        (err, result) => {
            if (err) return res.status(500).json({ message: "Database error", error: err });
            res.status(200).json({ message: "Profile updated successfully" });
        }
    );
});


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


