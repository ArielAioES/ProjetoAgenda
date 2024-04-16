import React, { useState } from 'react';
import '../assets/login.css'

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // Function to update the email state as the user types
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    // Function to update the password state as the user types
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            // Make a POST request to the login API
            const response = await fetch("", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Invalid credentials. Please try again.");
            }

            console.log("Logged User:", await response.json());
            window.location.href = "/Calendar";
        } catch (error) {
            setError(error.message);
            console.error("Authentication error", error);
        }
    };

    return (
        <div className="loginpage">
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div className="form-field">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                {error && <div className="error-message">{error}</div>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;

