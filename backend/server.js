const express = require("express");
const cors = require("cors"); // Menambahkan middleware CORS
const app = express();
const mysql = require("mysql2");

// Koneksi ke database MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'library_db'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database');
});

// Mengimpor rute
const booksRouter = require("./routes/books");
const customersRouter = require("./routes/customers");
const borrowingsRouter = require("./routes/borrowings");

// Middleware untuk parsing body JSON
app.use(express.json()); // Gunakan express.json() untuk parsing JSON body

// Middleware CORS untuk memungkinkan permintaan dari frontend yang berjalan di port berbeda
app.use(cors()); // Mengizinkan CORS

// Gunakan rute untuk buku, pelanggan, dan peminjaman
app.use("/books", booksRouter);
app.use("/customers", customersRouter);
app.use("/borrowings", borrowingsRouter);

// Endpoint untuk pencarian buku
app.get('/search/books', (req, res) => {
  const searchQuery = req.query.query;
  const sql = `SELECT * FROM books WHERE title LIKE ?`;
  db.query(sql, [`%${searchQuery}%`], (err, results) => {
    if (err) {
      return res.status(500).send('Error searching books');
    }
    res.json(results);
  });
});

// Endpoint untuk pencarian pelanggan
app.get('/search/customers', (req, res) => {
  const searchQuery = req.query.query;
  const sql = `SELECT * FROM customers WHERE name LIKE ?`;
  db.query(sql, [`%${searchQuery}%`], (err, results) => {
    if (err) {
      return res.status(500).send('Error searching customers');
    }
    res.json(results);
  });
});

// Endpoint untuk pencarian peminjaman
app.get('/search/borrowings', (req, res) => {
  const searchQuery = req.query.query;
  const sql = `SELECT * FROM borrowings WHERE borrowing_info LIKE ?`;
  db.query(sql, [`%${searchQuery}%`], (err, results) => {
    if (err) {
      return res.status(500).send('Error searching borrowings');
    }
    res.json(results);
  });
});

// Tentukan port untuk server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
