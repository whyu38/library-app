import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ViewCustomer() {
    const { id } = useParams();
    const [customer, setCustomer] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/customers/${id}`)
            .then(res => setCustomer(res.data))
            .catch(err => console.log(err));
    }, [id]);

    if (!customer) return <div>Loading...</div>;

    return (
        <div className="container mt-4">
            <h1>Customer Details</h1>
            <p><strong>Name:</strong> {customer.name}</p>
            <p><strong>Email:</strong> {customer.email}</p>
        </div>
    );
}

export default ViewCustomer;
