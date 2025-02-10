import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";  
import axios from "axios";
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa'; 

function BookList() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(10); 
  const navigate = useNavigate();  

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
    if (window.confirm("Are you sure you want to delete this book?")) {
      axios.delete(`http://localhost:5000/books/${id}`)
        .then(() => {
          setBooks(books.filter((book) => book.id !== id));
        })
        .catch((err) => console.error(err));
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-book/${id}`);
  };

  // Pagination logic
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(books.length / booksPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Book List</h1>

      <div className="mb-3 text-end">
        <button className="btn btn-primary" onClick={() => navigate('/add-book')}>Add New Book</button>
      </div>

      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentBooks.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.stock}</td>
              <td>
                <button className="btn btn-info" onClick={() => handleView(book.id)}>
                  <FaEye /> View
                </button>
                <button className="btn btn-warning ms-2" onClick={() => handleEdit(book.id)}>
                  <FaEdit /> Edit
                </button>
                <button className="btn btn-danger ms-2" onClick={() => handleDelete(book.id)}>
                  <FaTrash /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookList;