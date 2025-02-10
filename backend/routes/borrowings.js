const express = require("express");
const router = express.Router();
const db = require("../db");

// Get all borrowings
router.get("/", (req, res) => {
  db.query("SELECT id, borrow_code, book_id, customer_id, DATE(borrow_date) AS borrow_date, DATE(return_date) AS return_date FROM borrowings", (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

// Get borrowing by ID
router.get("/:id", (req, res) => {
  db.query("SELECT id, borrow_code, book_id, customer_id, DATE(borrow_date) AS borrow_date, DATE(return_date) AS return_date FROM borrowings WHERE id=?", [req.params.id], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Borrowing not found" });
    }
    res.json(results[0]);
  });
});

// Add new borrowing
router.post("/", (req, res) => {
  const { book_id, customer_id, borrow_date, return_date, borrow_code } = req.body;

  if (!book_id || !customer_id || !borrow_date || !return_date || !borrow_code) {
    return res.status(400).json({ error: "All fields are required" });
  }

  db.query(
    "INSERT INTO borrowings (book_id, customer_id, borrow_date, return_date, borrow_code) VALUES (?, ?, ?, ?, ?)",
    [book_id, customer_id, borrow_date, return_date, borrow_code],
    (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.status(201).json({ message: "Borrowing added successfully!", id: results.insertId });
    }
  );
});

// Update borrowing (only borrow_code can be updated)
router.put("/:id", (req, res) => {
  const { borrow_code } = req.body; // Only borrow_code is allowed to be updated
  const borrowingId = req.params.id;

  if (!borrow_code) {
    return res.status(400).json({ error: "Borrow code is required" });
  }

  // Check if borrowing exists
  db.query("SELECT * FROM borrowings WHERE id=?", [borrowingId], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Borrowing not found" });
    }

    // Update borrow_code only
    db.query(
      "UPDATE borrowings SET borrow_code=? WHERE id=?",
      [borrow_code, borrowingId],
      (err, updateResults) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ error: "Database error" });
        }
        if (updateResults.affectedRows === 0) {
          return res.status(400).json({ error: "No changes made to borrow_code" });
        }
        res.json({ message: "Borrowing's borrow_code updated successfully!" });
      }
    );
  });
});

// Delete borrowing
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM borrowings WHERE id=?", [req.params.id], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Borrowing not found" });
    }
    res.json({ message: "Borrowing deleted successfully!" });
  });
});

module.exports = router;