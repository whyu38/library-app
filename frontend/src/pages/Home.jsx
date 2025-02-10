import { useState } from "react";
import axios from "axios";

const Home = () => {
  const [searchBook, setSearchBook] = useState("");
  const [searchCustomer, setSearchCustomer] = useState("");
  const [searchBorrowing, setSearchBorrowing] = useState("");
  const [bookResults, setBookResults] = useState([]);
  const [customerResults, setCustomerResults] = useState([]);
  const [borrowingResults, setBorrowingResults] = useState([]);

  const searchBooks = async (query) => {
    if (query.trim() === "") {
      setBookResults([]);
      return;
    }
    try {
      const response = await axios.get(`http://localhost:5000/search/books?query=${query}`);
      setBookResults(response.data);
    } catch (error) {
      console.error("Error searching books:", error);
    }
  };

  const searchCustomers = async (query) => {
    if (query.trim() === "") {
      setCustomerResults([]);
      return;
    }
    try {
      const response = await axios.get(`http://localhost:5000/search/customers?query=${query}`);
      setCustomerResults(response.data);
    } catch (error) {
      console.error("Error searching customers:", error);
    }
  };

  const searchBorrowings = async (query) => {
    if (query.trim() === "") {
      setBorrowingResults([]);
      return;
    }
    try {
      const response = await axios.get(`http://localhost:5000/search/borrowings?query=${query}`);
      setBorrowingResults(response.data);
    } catch (error) {
      console.error("Error searching borrowings:", error);
    }
  };

  return (
    <div className="container py-5">
      <h1 className="text-center text-primary mb-4">Selamat Datang di Halaman Admin</h1>
      <p className="text-center text-muted mb-5">
        Gunakan fitur pencarian untuk menemukan Buku, Pelanggan, dan Peminjaman dengan mudah.
      </p>

      <div className="row">
        {[{ title: "Cari Buku", state: searchBook, setState: setSearchBook, searchFunc: searchBooks, results: bookResults, key: "title" },
          { title: "Cari Pelanggan", state: searchCustomer, setState: setSearchCustomer, searchFunc: searchCustomers, results: customerResults, key: "name" },
          { title: "Cari Peminjaman", state: searchBorrowing, setState: setSearchBorrowing, searchFunc: searchBorrowings, results: borrowingResults, key: "borrow_code" }]
          .map(({ title, state, setState, searchFunc, results, key }, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card shadow-lg border-0">
                <div className="card-body text-center">
                  <h5 className="card-title">{title}</h5>
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder={`Masukkan ${title}...`}
                    value={state}
                    onChange={(e) => {
                      setState(e.target.value);
                      searchFunc(e.target.value);
                    }}
                  />
                </div>
              </div>
              {state.trim() !== "" && results.length > 0 && (
                <ul className="list-group mt-3">
                  {results.map((item, idx) => (
                    <li key={idx} className="list-group-item">{item[key]}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
      </div>

      {/* Box Artikel */}
      <div className="row mt-5">
        <div className="col-md-6">
          <div className="card shadow-lg border-0">
            <div className="card-body">
              <h5 className="card-title">📚 Manfaat Membaca Buku</h5>
              <p className="card-text text-muted">
                Membaca buku dapat meningkatkan wawasan, memperkaya kosakata, dan mengembangkan pemikiran kritis.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card shadow-lg border-0">
            <div className="card-body">
              <h5 className="card-title">📌 Tips Mengelola Peminjaman</h5>
              <p className="card-text text-muted">
                Pastikan catatan peminjaman selalu terupdate untuk menghindari keterlambatan dan kehilangan buku.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;