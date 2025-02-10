import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ViewBook() {
    const { id } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/books/${id}`)
            .then(res => setBook(res.data))
            .catch(err => console.log(err));
    }, [id]);

    if (!book) return <div>Loading...</div>;

    return (
        <div className="container mt-4">
            <h1>Book Details</h1>
            <p><strong>Title:</strong> {book.title}</p>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Stock:</strong> {book.stock}</p>
        </div>
    );
}

export default ViewBook;
