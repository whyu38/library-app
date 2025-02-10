import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Library Management
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/books">
                Books
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/customers">
                Customers
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/borrowings">
                Borrowings
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;