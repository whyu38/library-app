import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddBook() {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [stock, setStock] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const newBook = { title, author, stock };

        axios.post("http://localhost:5000/books", newBook)
            .then((res) => {
                alert(res.data.message);
                navigate("/books"); // Arahkan kembali ke halaman daftar buku
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Add New Book</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="author" className="form-label">Author</label>
                    <input type="text" className="form-control" id="author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="stock" className="form-label">Stock</label>
                    <input type="number" className="form-control" id="stock" value={stock} onChange={(e) => setStock(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Add Book</button>
            </form>
        </div>
    );
}

export default AddBook;