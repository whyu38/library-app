const express = require("express");
const router = express.Router();
const db = require("../db");

// Get all customers
router.get("/", (req, res) => {
  db.query("SELECT * FROM customers", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Get customer by ID
router.get("/:id", (req, res) => {
    db.query("SELECT * FROM customers WHERE id=?", [req.params.id], (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Database error" });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: "Customer not found" });
      }
      res.json(results[0]); // Mengembalikan hanya satu customer
    });
  });  

// Add new customer
router.post("/", (req, res) => {
  const { name, email, phone } = req.body;
  db.query(
    "INSERT INTO customers (name, email, phone) VALUES (?, ?, ?)",
    [name, email, phone],
    (err, results) => {
      if (err) throw err;
      res.json({ message: "Customer added successfully!" });
    }
  );
});

// Update customer
router.put("/:id", (req, res) => {
  const { name, email, phone } = req.body;
  db.query(
    "UPDATE customers SET name=?, email=?, phone=? WHERE id=?",
    [name, email, phone, req.params.id],
    (err, results) => {
      if (err) throw err;
      res.json({ message: "Customer updated successfully!" });
    }
  );
});

// Delete customer
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM customers WHERE id=?", [req.params.id], (err, results) => {
    if (err) throw err;
    res.json({ message: "Customer deleted successfully!" });
  });
});

module.exports = router;