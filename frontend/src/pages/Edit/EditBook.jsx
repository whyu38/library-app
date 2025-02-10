import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; 

function EditBook() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [stock, setStock] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:5000/books/${id}`)
            .then(res => {
                const { title, author, stock } = res.data;
                setTitle(title);
                setAuthor(author);
                setStock(stock);
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/books/${id}`, { title, author, stock })
            .then(() => {
                navigate("/books");
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="container mt-4">
            <h1>Edit Book</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Author</label>
                    <input
                        type="text"
                        className="form-control"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Stock</label>
                    <input
                        type="number"
                        className="form-control"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Save Changes</button>
            </form>
        </div>
    );
}

export default EditBook;
