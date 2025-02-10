import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

function AddBorrowing() {
    const [customerId, setCustomerId] = useState("");
    const [bookId, setBookId] = useState("");
    const [borrowDate, setBorrowDate] = useState("");
    const [returnDate, setReturnDate] = useState("");
    const navigate = useNavigate(); 

    const handleSubmit = (e) => {
        e.preventDefault();

        if (new Date(returnDate) < new Date(borrowDate)) {
            alert("Return Date must be after Borrow Date");
            return;
        }

        axios.post("http://localhost:5000/borrowings", { 
            customer_id: customerId, 
            book_id: bookId, 
            borrow_date: borrowDate, 
            return_date: returnDate 
        })
        .then(() => {
            navigate("/borrowings"); 
        })
        .catch(err => console.log(err));
    };

    return (
        <div className="container mt-4">
            <h1>Add New Borrowing</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Customer ID</label>
                    <input
                        type="number"
                        className="form-control"
                        value={customerId}
                        onChange={(e) => setCustomerId(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Book ID</label>
                    <input
                        type="number"
                        className="form-control"
                        value={bookId}
                        onChange={(e) => setBookId(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Borrow Date</label>
                    <input
                        type="date"
                        className="form-control"
                        value={borrowDate}
                        onChange={(e) => setBorrowDate(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Return Date</label>
                    <input
                        type="date"
                        className="form-control"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Add Borrowing</button>
            </form>
        </div>
    );
}

export default AddBorrowing;