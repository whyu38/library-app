import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Books from "./pages/Books";
import Customers from "./pages/Customers";
import Borrowings from "./pages/Borrowings";
import AddBook from "./pages/Add/AddBook";
import AddCustomer from "./pages/Add/AddCustomer";
import AddBorrowing from "./pages/Add/AddBorrowing";
import EditBook from "./pages/Edit/EditBook";
import EditCustomer from "./pages/Edit/EditCustomer";
import EditBorrowing from "./pages/Edit/EditBorrowing";
import ViewBook from "./pages/View/ViewBook";
import ViewCustomer from "./pages/View/ViewCustomer"; 
import ViewBorrowing from "./pages/View/ViewBorrowing";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/borrowings" element={<Borrowings />} />

          {/* Add new book, customer, and borrowing */}
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/add-customer" element={<AddCustomer />} />
          <Route path="/add-borrowing" element={<AddBorrowing />} />
          
          {/* Edit book, customer, and borrowing */}
          <Route path="/edit-book/:id" element={<EditBook />} />
          <Route path="/edit-customer/:id" element={<EditCustomer />} />
          <Route path="/edit-borrowing/:id" element={<EditBorrowing />} />

          {/* View book, customer, and borrowing */}
          <Route path="/view-book/:id" element={<ViewBook />} />
          <Route path="/view-customer/:id" element={<ViewCustomer />} />
          <Route path="/view-borrowing/:id" element={<ViewBorrowing />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;