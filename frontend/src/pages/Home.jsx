import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [searchBook, setSearchBook] = useState("");
  const [searchCustomer, setSearchCustomer] = useState("");
  const [searchBorrowing, setSearchBorrowing] = useState("");
  const [bookResults, setBookResults] = useState([]);
  const [customerResults, setCustomerResults] = useState([]);
  const [borrowingResults, setBorrowingResults] = useState([]);

  // Fungsi untuk mencari buku
  const searchBooks = async (query) => {
    if (query.trim() === "") {
      setBookResults([]); // Hapus hasil pencarian jika input kosong
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:5000/search/books?query=${query}`
      );
      setBookResults(response.data);
    } catch (error) {
      console.error("Error searching books:", error);
    }
  };

  // Fungsi untuk mencari pelanggan
  const searchCustomers = async (query) => {
    if (query.trim() === "") {
      setCustomerResults([]); // Hapus hasil pencarian jika input kosong
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:5000/search/customers?query=${query}`
      );
      setCustomerResults(response.data);
    } catch (error) {
      console.error("Error searching customers:", error);
    }
  };

  // Fungsi untuk mencari peminjaman
  const searchBorrowings = async (query) => {
    if (query.trim() === "") {
      setBorrowingResults([]); // Hapus hasil pencarian jika input kosong
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:5000/search/borrowings?query=${query}`
      );
      setBorrowingResults(response.data);
    } catch (error) {
      console.error("Error searching borrowings:", error);
    }
  };

  return (
    <div
      className="container-fluid d-flex flex-column justify-content-center align-items-center min-vh-100"
      style={{
        backgroundImage: "url(/path/to/your/background-image.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Main Content */}
      <div className="text-center text-black">
        <h1 className="display-4 mb-4">Selamat Datang di Halaman Admin</h1>
        <p className="lead mb-5">
          Gunakan menu di bawah untuk mencari Buku, Pelanggan, dan Peminjaman.
        </p>
        <div className="d-flex flex-column align-items-center mt-4">
          {/* Pencarian Buku */}
          <div className="col-md-8 mb-4">
            <div className="card shadow-lg border-0">
              <div className="card-body text-center">
                <h5 className="card-title">Cari Buku</h5>
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Cari Buku..."
                  value={searchBook}
                  onChange={(e) => {
                    setSearchBook(e.target.value);
                    searchBooks(e.target.value);
                  }}
                />
                <Link to="/books" className="btn btn-primary">
                  Lihat Buku
                </Link>
              </div>
            </div>
            {/* Hasil Pencarian Buku */}
            {searchBook.trim() !== "" && bookResults.length > 0 && (
              <div className="mt-3">
                <ul className="list-group">
                  {bookResults.map((book, index) => (
                    <li key={index} className="list-group-item">
                      {book.title}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Pencarian Pelanggan */}
          <div className="col-md-8 mb-4">
            <div className="card shadow-lg border-0">
              <div className="card-body text-center">
                <h5 className="card-title">Cari Pelanggan</h5>
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Cari Pelanggan..."
                  value={searchCustomer}
                  onChange={(e) => {
                    setSearchCustomer(e.target.value);
                    searchCustomers(e.target.value);
                  }}
                />
                <Link to="/customers" className="btn btn-primary">
                  Lihat Pelanggan
                </Link>
              </div>
            </div>
            {/* Hasil Pencarian Pelanggan */}
            {searchCustomer.trim() !== "" && customerResults.length > 0 && (
              <div className="mt-3">
                <ul className="list-group">
                  {customerResults.map((customer, index) => (
                    <li key={index} className="list-group-item">
                      {customer.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Pencarian Peminjaman */}
          <div className="col-md-8 mb-4">
            <div className="card shadow-lg border-0">
              <div className="card-body text-center">
                <h5 className="card-title">Cari Peminjaman</h5>
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Cari Peminjaman..."
                  value={searchBorrowing}
                  onChange={(e) => {
                    setSearchBorrowing(e.target.value);
                    searchBorrowings(e.target.value);
                  }}
                />
                <Link to="/borrowings" className="btn btn-primary">
                  Lihat Peminjaman
                </Link>
              </div>
            </div>
            {/* Hasil Pencarian Peminjaman */}
            {searchBorrowing.trim() !== "" && borrowingResults.length > 0 && (
              <div className="mt-3">
                <ul className="list-group">
                  {borrowingResults.map((borrowing, index) => (
                    <li key={index} className="list-group-item">
                      {borrowing.borrowing_info}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;