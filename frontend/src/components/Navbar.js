import React from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // 🔹 Handle user logout
    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove auth token
        navigate('/login'); // Redirect to login page
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                {/* Brand */}
                <Link className="navbar-brand" to="/">iNotebook</Link>

                {/* Toggle button for mobile view */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navbar links */}
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
                                to="/"
                            >
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${location.pathname === "/about" ? "active" : ""}`}
                                to="/about"
                            >
                                About
                            </Link>
                        </li>
                    </ul>

                    {/* Authentication buttons */}
                    {!localStorage.getItem('token') ? (
                        <div className="d-flex">
                            <Link className="btn btn-primary mx-1" to="/login">Login</Link>
                            <Link className="btn btn-primary mx-1" to="/signup">Signup</Link>
                        </div>
                    ) : (
                        <button onClick={handleLogout} className="btn btn-primary">Logout</button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;