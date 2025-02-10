const express = require("express");
const cors = require("cors"); // Menambahkan middleware CORS
const app = express();

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

// Tentukan port untuk server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
