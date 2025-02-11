const mysql = require('mysql2');

// Membuat koneksi ke database MySQL
const db = mysql.createConnection({
  host: 'localhost',  
  user: 'root', 
  password: '',       
  database: 'library_db' 
});

// Memastikan koneksi berhasil
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

module.exports = db; 
