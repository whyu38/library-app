import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate from react-router-dom
import axios from "axios";

function BookList() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const navigate = useNavigate();  // Initialize useNavigate

  useEffect(() => {
    axios.get("http://localhost:5000/books")
      .then((res) => setBooks(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleView = (id) => {
    axios.get(`http://localhost:5000/books/${id}`)
      .then((res) => setSelectedBook(res.data))
      .catch((err) => console.error(err));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/books/${id}`)
      .then(() => {
        setBooks(books.filter((book) => book.id !== id));
      })
      .catch((err) => console.error(err));
  };

  const handleEdit = (id) => {
    // Navigate to the edit page with the book ID
    navigate(`/edit-book/${id}`);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Book List</h1>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.stock}</td>
              <td>
                <button className="btn btn-info" onClick={() => handleView(book.id)}>View</button>
                <button className="btn btn-warning ms-2" onClick={() => handleEdit(book.id)}>Edit</button>
                <button className="btn btn-danger ms-2" onClick={() => handleDelete(book.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for showing book details */}
      {selectedBook && (
        <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Book Details</h5>
                <button className="btn-close" onClick={() => setSelectedBook(null)}></button>
              </div>
              <div className="modal-body">
                <p><strong>ID:</strong> {selectedBook.id}</p>
                <p><strong>Title:</strong> {selectedBook.title}</p>
                <p><strong>Author:</strong> {selectedBook.author}</p>
                <p><strong>Stock:</strong> {selectedBook.stock}</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setSelectedBook(null)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookList;