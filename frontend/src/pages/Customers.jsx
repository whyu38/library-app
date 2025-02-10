import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";  
import axios from "axios";
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa'; 

function CustomersList() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [customersPerPage] = useState(10); 
  const navigate = useNavigate();  

  useEffect(() => {
    axios.get("http://localhost:5000/customers")
      .then((res) => setCustomers(res.data))
      .catch((err) => console.error("Error fetching customers:", err));
  }, []);

  const handleViewCustomer = (id) => {
    axios.get(`http://localhost:5000/customers/${id}`)
      .then((res) => setSelectedCustomer(res.data))
      .catch((err) => console.error("Error fetching customer details:", err));
  };

  const handleDeleteCustomer = (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      axios.delete(`http://localhost:5000/customers/${id}`)
        .then(() => {
          setCustomers(customers.filter((customer) => customer.id !== id));
        })
        .catch((err) => console.error("Error deleting customer:", err));
    }
  };

  const handleEditCustomer = (id) => {
    navigate(`/edit-customer/${id}`);
  };

  // Pagination logic
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = customers.slice(indexOfFirstCustomer, indexOfLastCustomer);
  const totalPages = Math.ceil(customers.length / customersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Customers List</h1>

      <div className="mb-3 text-end">
        <button className="btn btn-primary" onClick={() => navigate('/add-customer')}>Add New Customer</button>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentCustomers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>
                  <button className="btn btn-info btn-sm me-2" onClick={() => handleViewCustomer(customer.id)}>
                    <FaEye /> View
                  </button>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditCustomer(customer.id)}>
                    <FaEdit /> Edit
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDeleteCustomer(customer.id)}>
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

      {/* Modal for showing customer details */}
      {selectedCustomer && (
        <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Customer Details</h5>
                <button className="btn-close" onClick={() => setSelectedCustomer(null)}></button>
              </div>
              <div className="modal-body">
                <p><strong>ID:</strong> {selectedCustomer.id}</p>
                <p><strong>Name :</strong> {selectedCustomer.name}</p>
                <p><strong>Email:</strong> {selectedCustomer.email}</p>
                <p><strong>Phone:</strong> {selectedCustomer.phone}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomersList;