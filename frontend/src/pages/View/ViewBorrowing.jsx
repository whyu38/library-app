import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ViewBorrowing() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [borrowing, setBorrowing] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:5000/borrowings/${id}`)
            .then(res => {
                setBorrowing(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching borrowing details:", err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (!borrowing) return <p>Borrowing not found!</p>;

    return (
        <div className="container mt-4">
            <h2>Borrowing Details</h2>
            <ul className="list-group">
                <li className="list-group-item"><strong>Borrow Code:</strong> {borrowing.borrow_code}</li>
                <li className="list-group-item"><strong>Book ID:</strong> {borrowing.book_id}</li>
                <li className="list-group-item"><strong>Customer ID:</strong> {borrowing.customer_id}</li>
                <li className="list-group-item"><strong>Borrow Date:</strong> {borrowing.borrow_date}</li>
                <li className="list-group-item"><strong>Return Date:</strong> {borrowing.return_date}</li>
            </ul>
            <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>Back</button>
        </div>
    );
}

export default ViewBorrowing;
