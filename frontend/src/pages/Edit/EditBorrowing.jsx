import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditBorrowing() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [borrowing, setBorrowing] = useState({
    bookId: "",
    customerId: "",
    borrowDate: "",
    returnDate: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/borrowings/${id}`)
      .then((res) => {
        if (res.data) {
          setBorrowing(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBorrowing((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (new Date(borrowing.returnDate) < new Date(borrowing.borrowDate)) {
      alert("Return Date must be after Borrow Date");
      return;
    }

    axios
      .put(`http://localhost:5000/borrowings/${id}`, borrowing)
      .then(() => navigate("/borrowings"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Edit Borrowing</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="bookId" className="form-label">
            Book ID
          </label>
          <input
            type="text"
            id="bookId"
            name="bookId"
            value={borrowing.bookId}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="customerId" className="form-label">
            Customer ID
          </label>
          <input
            type="text"
            id="customerId"
            name="customerId"
            value={borrowing.customerId}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="borrowDate" className="form-label">
            Borrow Date
          </label>
          <input
            type="date"
            id="borrowDate"
            name="borrowDate"
            value={borrowing.borrowDate}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="returnDate" className="form-label">
            Return Date
          </label>
          <input
            type="date"
            id="returnDate"
            name="returnDate"
            value={borrowing.returnDate}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditBorrowing;