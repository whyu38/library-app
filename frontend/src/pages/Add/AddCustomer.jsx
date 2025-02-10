import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddCustomer() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/customers", { name, email, phone })
            .then(() => navigate("/customers"))
            .catch(err => console.log(err));
    };

    return (
        <div className="container mt-4">
            <h2>Add New Customer</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                <button type="submit">Add Customer</button>
            </form>
        </div>
    );
}

export default AddCustomer;