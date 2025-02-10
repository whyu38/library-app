import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

function AddBorrowing() {
    const [customerId, setCustomerId] = useState("");
    const [bookId, setBookId] = useState("");
    const [borrowDate, setBorrowDate] = useState("");
    const [returnDate, setReturnDate] = useState("");
    const [borrowCode, setBorrowCode] = useState(""); // Add state for borrow_code
    const navigate = useNavigate(); 

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if return date is after borrow date
        if (new Date(returnDate) < new Date(borrowDate)) {
            alert("Return Date must be after Borrow Date");
            return;
        }

        // Prepare the payload
        const borrowingData = { 
            customer_id: customerId, 
            book_id: bookId, 
            borrow_date: borrowDate, 
            return_date: returnDate,
            borrow_code: borrowCode // Include borrow_code in the payload
        };

        // Send the POST request
        axios.post("http://localhost:5000/borrowings", borrowingData)
            .then((response) => {
                if (response.status === 201) {
                    navigate("/borrowings"); // Redirect after successful creation
                } else {
                    alert("Error adding borrowing");
                }
            })
            .catch((err) => {
                console.error("Error:", err);
                alert("There was an issue with the request.");
            });
    };

    return (
        <div className="container mt-4">
            <h1>Add New Borrowing</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Borrow Code</label>
                    <input
                        type="text"
                        className="form-control"
                        value={borrowCode}
                        onChange={(e) => setBorrowCode(e.target.value)} // Handle borrow_code change
                        required
                    />
                </div>
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