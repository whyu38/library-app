import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditCustomer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/customers/${id}`)
      .then((res) => setCustomer(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/customers/${id}`, customer)
      .then(() => navigate("/customers"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Edit Customer</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={customer.name}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={customer.email}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={customer.phone}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditCustomer;
