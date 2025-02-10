import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate from react-router-dom
import axios from "axios";

function CustomersList() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const navigate = useNavigate();  // Initialize useNavigate

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
    axios.delete(`http://localhost:5000/customers/${id}`)
      .then(() => {
        setCustomers(customers.filter((customer) => customer.id !== id));
      })
      .catch((err) => console.error("Error deleting customer:", err));
  };

  const handleEditCustomer = (id) => {
    // Navigate to the edit page with the customer ID
    navigate(`/edit-customer/${id}`);
  };

  return (
    <div className="container mt-4">
      <h2>Customers List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td>
                <button className="btn btn-info" onClick={() => handleViewCustomer(customer.id)}>
                  View
                </button>
                <button className="btn btn-warning ms-2" onClick={() => handleEditCustomer(customer.id)}>
                  Edit
                </button>
                <button className="btn btn-danger ms-2" onClick={() => handleDeleteCustomer(customer.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedCustomer && (
        <div className="mt-4">
          <h3>Customer Details</h3>
          <p><strong>Name:</strong> {selectedCustomer.name}</p>
          <p><strong>Email:</strong> {selectedCustomer.email}</p>
          <p><strong>Phone:</strong> {selectedCustomer.phone}</p>
          <button className="btn btn-secondary" onClick={() => setSelectedCustomer(null)}>
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default CustomersList;