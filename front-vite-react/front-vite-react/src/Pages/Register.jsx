import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Importe motion do framer-motion

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [username, setUsername] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);

    useEffect(() => {
        return () => {
            setFormData(prevData => ({
                ...prevData,
                password: ''
            }));
        };
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://127.0.0.1:8000/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: formData.username,
                email: formData.email,
                password: formData.password
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Registration failed');
                }
                return response.json();
            })
            .then(data => {
                setUsername(data.username);
                setIsRegistered(true);
                navigate('/login');
            })
            .catch(error => {
                console.error('Error registering:', error);
            });
    };

    return (
        <motion.div
            className='RegisterPage'
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
                    Register
                </motion.h1>
                <div>
                    <motion.div
                        className="form-field"
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            name="username"
                            value={formData.username}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            onChange={handleChange}
                            required
                        />
                    </motion.div>

                    <motion.div
                        className="form-field"
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={formData.email}
                            className="mt-1 block w-full"
                            autoComplete="email"
                            onChange={handleChange}
                            required
                        />
                    </motion.div>

                    <motion.div
                        className="form-field"
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={formData.password}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={handleChange}
                            required
                        />
                    </motion.div>

                    <motion.div
                        className="flex items-center justify-end mt-4"
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 1 }}
                    >
                        <button className="ms-4" type="submit">Register</button>
                    </motion.div>
                </div>
            </form>

            {isRegistered && <p>Cadastrado com sucesso!</p>}
            {username && <p>Username: {username}</p>}
        </motion.div>
    );
}
