import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAtom } from 'jotai';

import { idAtom, usernameAtom, emailAtom, tokenAtom } from '../Components/atoms/atoms';
import { API_URL } from '../Components/config';


import '../assets/login.css';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [id, setId] = useAtom(idAtom);
    const [username, setUsername] = useAtom(usernameAtom);
    const [emailAtomValue, setEmailAtomValue] = useAtom(emailAtom);
    const [token, setToken] = useAtom(tokenAtom);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const formData = {
                email: email,
                password: password
            };

            const response = await fetch(`${API_URL}/api/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error("Invalid credentials. Please try again.");
            }

            const data = await response.json();
            const { username, id, token } = data;

            setId(id);
            setUsername(username);
            setEmailAtomValue(email);
            setToken(token);

            window.location.href = "/";
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            className="loginpage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <form onSubmit={handleSubmit}>
                <motion.h1
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    Login
                </motion.h1>
                <div className="form-field">
                    <motion.label
                        htmlFor="email"
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        Email
                    </motion.label>
                    <motion.input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    />
                </div>
                <div className="form-field">
                    <motion.label
                        htmlFor="password"
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        Password:
                    </motion.label>
                    <motion.input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 1 }}
                    />
                </div>
                {error && (
                    <motion.div
                        className="error-message"
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 1.2 }}
                    >
                        {error}
                    </motion.div>
                )}
                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.1 }}
                    disabled={loading}
                    whileTap={{ scale: 0.9 }}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.4 }}
                >
                    {loading ? 'Logging...' : 'Login'}
                </motion.button>
            </form>
        </motion.div>
    );
};

export default Login;
