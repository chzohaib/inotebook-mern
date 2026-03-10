import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ showAlert }) => {
    // 🔹 Local state to store user input
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    
    const navigate = useNavigate(); // 🔹 Navigate function for programmatic routing

    // 🔹 Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: credentials.email, password: credentials.password }),
            });

            const json = await response.json();

            if (json.success) {
                // 🔹 Save auth token and redirect
                localStorage.setItem('token', json.authtoken);
                showAlert("Logged in Successfully", "success");
                navigate("/");
            } else {
                showAlert("Invalid credentials", "danger");
            }
        } catch (error) {
            console.error("Login Error:", error);
            showAlert("Something went wrong. Please try again.", "danger");
        }
    };

    // 🔹 Update state on input change
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className="container mt-3">
            <h2>Login to continue to iNotebook</h2>
            <form onSubmit={handleSubmit}>
                {/* Email input */}
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={credentials.email}
                        onChange={onChange}
                        aria-describedby="emailHelp"
                        required
                    />
                </div>

                {/* Password input */}
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={credentials.password}
                        onChange={onChange}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default Login;