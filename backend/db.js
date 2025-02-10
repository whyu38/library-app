const mysql = require('mysql2');

// Membuat koneksi ke database MySQL
const db = mysql.createConnection({
  host: 'localhost',  // Ganti dengan host database Anda, biasanya 'localhost'
  user: 'root',       // Ganti dengan username MySQL Anda
  password: '',       // Ganti dengan password MySQL Anda
  database: 'library_db' // Ganti dengan nama database yang Anda gunakan
});

// Memastikan koneksi berhasil
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

module.exports = db; // Mengekspor koneksi database agar bisa digunakan di file lain
