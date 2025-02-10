import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa'; // Import ikon

function Borrowings() {
    const [borrowings, setBorrowings] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [borrowingsPerPage] = useState(10); // Jumlah peminjaman per halaman
    const [selectedBorrowing, setSelectedBorrowing] = useState(null); // State untuk modal

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

    const handleViewBorrowing = (id) => {
        const borrowing = borrowings.find(b => b.id === id);
        setSelectedBorrowing(borrowing);
    };

    // Pagination logic
    const indexOfLastBorrowing = currentPage * borrowingsPerPage;
    const indexOfFirstBorrowing = indexOfLastBorrowing - borrowingsPerPage;
    const currentBorrowings = borrowings.slice(indexOfFirstBorrowing, indexOfLastBorrowing);
    const totalPages = Math.ceil(borrowings.length / borrowingsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Borrowings List</h1>

            <div className="mb-3 text-end">
                <Link to="/add-borrowing" className="btn btn-primary">Add New Borrowing</Link>
            </div>

            <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>Borrow Code</th>
                            <th>Book ID</th>
                            <th>Customer ID</th>
                            <th>Borrow Date</th>
                            <th>Return Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentBorrowings.map(borrowing => (
                            <tr key={borrowing.id}>
                                <td>{borrowing.borrow_code}</td> {/* Menambahkan borrow_code */}
                                <td>{borrowing.book_id}</td>
                                <td>{borrowing.customer_id}</td>
                                <td>{borrowing.borrow_date || "Not Available"}</td>
                                <td>{borrowing.return_date || "Not Available"}</td>
                                <td>
                                    <button className="btn btn-info btn-sm me-2" onClick={() => handleViewBorrowing(borrowing.id)}>
                                        <FaEye /> View
                                    </button>
                                    <Link to={`/edit-borrowing/${borrowing.id}`} className="btn btn-warning btn-sm me-2">
                                        <FaEdit /> Edit
                                    </Link>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(borrowing.id)}>
                                        <FaTrash /> Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <nav>
                <ul className="pagination justify-content-center">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => paginate(index + 1)}>
                                {index + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Modal for showing borrowing details */}
            {selectedBorrowing && (
                <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Borrowing Details</h5>
                                <button className="btn-close" onClick={() => setSelectedBorrowing(null)}></button>
                            </div>
                            <div className="modal-body">
                                <p><strong>Borrow Code:</strong> {selectedBorrowing.borrow_code}</p> {/* Menambahkan borrow_code */}
                                <p><strong>Book ID:</strong> {selectedBorrowing.book_id}</p>
                                <p><strong>Customer ID:</strong> {selectedBorrowing.customer_id}</p>
                                <p><strong>Borrow Date:</strong> {selectedBorrowing.borrow_date || "Not Available"}</p>
                                <p><strong>Return Date:</strong> {selectedBorrowing.return_date || "Not Available"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Borrowings;