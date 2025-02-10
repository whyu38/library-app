import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditBorrowing() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [borrowing, setBorrowing] = useState({
    borrowCode: "",
    bookId: "",
    customerId: "",
    borrowDate: "",
    returnDate: "",
  });

  useEffect(() => {
    // Fetch data dari API
    axios
      .get(`http://localhost:5000/borrowings/${id}`)
      .then((res) => {
        if (res.data) {
          setBorrowing({
            borrowCode: res.data.borrow_code,
            bookId: res.data.book_id,
            customerId: res.data.customer_id,
            borrowDate: res.data.borrow_date ? res.data.borrow_date.split("T")[0] : "",
            returnDate: res.data.return_date ? res.data.return_date.split("T")[0] : "",
          });
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    setBorrowing((prev) => ({
      ...prev,
      borrowCode: e.target.value, // Hanya memperbarui borrowCode
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Kirim data ke server, hanya `borrow_code` yang dikirim
    axios
      .put(`http://localhost:5000/borrowings/${id}`, {
        borrow_code: borrowing.borrowCode, // Hanya update borrow_code
      })
      .then(() => navigate("/borrowings"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Edit Borrowing</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="borrowCode" className="form-label">Borrow Code</label>
          <input
            type="text"
            id="borrowCode"
            name="borrowCode"
            value={borrowing.borrowCode}
            onChange={handleChange} // Bisa diedit
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="bookId" className="form-label">Book ID</label>
          <input
            type="text"
            id="bookId"
            name="bookId"
            value={borrowing.bookId}
            className="form-control"
            disabled // Tidak bisa diedit
          />
        </div>
        <div className="mb-3">
          <label htmlFor="customerId" className="form-label">Customer ID</label>
          <input
            type="text"
            id="customerId"
            name="customerId"
            value={borrowing.customerId}
            className="form-control"
            disabled // Tidak bisa diedit
          />
        </div>
        <div className="mb-3">
          <label htmlFor="borrowDate" className="form-label">Borrow Date</label>
          <input
            type="date"
            id="borrowDate"
            name="borrowDate"
            value={borrowing.borrowDate}
            className="form-control"
            disabled // Tidak bisa diedit
          />
        </div>
        <div className="mb-3">
          <label htmlFor="returnDate" className="form-label">Return Date</label>
          <input
            type="date"
            id="returnDate"
            name="returnDate"
            value={borrowing.returnDate}
            className="form-control"
            disabled // Tidak bisa diedit
          />
        </div>
        <button type="submit" className="btn btn-primary">Save Changes</button>
      </form>
    </div>
  );
}

export default EditBorrowing;