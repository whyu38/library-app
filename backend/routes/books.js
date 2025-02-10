const express = require("express");
const router = express.Router();
const db = require("../db");

// Get all books
router.get("/", (req, res) => {
    db.query("SELECT * FROM books", (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json(results);
    });
});

// Get book by ID
router.get("/:id", (req, res) => {
    db.query("SELECT * FROM books WHERE id = ?", [req.params.id], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database error" });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: "Book not found" });
        }
        res.json(results[0]);
    });
});

// Add new book
router.post("/", (req, res) => {
    const { title, author, stock } = req.body;
    db.query("INSERT INTO books (title, author, stock) VALUES (?, ?, ?)", [title, author, stock], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json({ message: "Book added successfully!" });
    });
});

// Update book
router.put("/:id", (req, res) => {
    const { title, author, stock } = req.body;
    db.query("UPDATE books SET title=?, author=?, stock=? WHERE id=?", [title, author, stock, req.params.id], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json({ message: "Book updated successfully!" });
    });
});

// Delete book
router.delete("/:id", (req, res) => {
    db.query("DELETE FROM books WHERE id=?", [req.params.id], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json({ message: "Book deleted successfully!" });
    });
});

module.exports = router;