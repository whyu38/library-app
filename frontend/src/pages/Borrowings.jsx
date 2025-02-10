import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Borrowings() {
    const [borrowings, setBorrowings] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/borrowings")
            .then(res => setBorrowings(res.data))
            .catch(err => console.log(err));
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this borrowing?")) {
            axios.delete(`http://localhost:5000/borrowings/${id}`)
                .then(() => {
                    setBorrowings(borrowings.filter(borrowing => borrowing.id !== id));
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Borrowings List</h1>

            <div className="mb-3">
                <Link to="/add-borrowing" className="btn btn-primary">Add New Borrowing</Link>
            </div>

            <div className="table-responsive">
                <table className="table table-bordered table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>Book ID</th>
                            <th>Customer ID</th>
                            <th>Borrow Date</th>
                            <th>Return Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {borrowings.map(borrowing => (
                            <tr key={borrowing.id}>
                                <td>{borrowing.book_id}</td>
                                <td>{borrowing.customer_id}</td>
                                <td>{borrowing.borrow_date || "Not Available"}</td>
                                <td>{borrowing.return_date || "Not Available"}</td>
                                <td>
                                    <Link to={`/view-borrowing/${borrowing.id}`} className="btn btn-info btn-sm me-2">
                                        View
                                    </Link>
                                    <Link to={`/edit-borrowing/${borrowing.id}`} className="btn btn-warning btn-sm me-2">
                                        Edit
                                    </Link>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(borrowing.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Borrowings;