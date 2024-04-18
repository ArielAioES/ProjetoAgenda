import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { atom, useAtom } from 'jotai';

import { API_URL } from '../Components/config';


const Logout = () => {
    const tokenAtom = atom(localStorage.getItem('token') || '');
    const [token] = useAtom(tokenAtom);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/api/logout`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.ok) {
                localStorage.removeItem('id');
                localStorage.removeItem('username');
                localStorage.removeItem('email');
                localStorage.removeItem('token');
                navigate('/');
            } else {
                throw new Error('Logout failed');
            }
        } catch (error) {
            console.error('Error logging out:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!token) {
        navigate('/login');
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
        >
            <div>
                <h2>Confirm Logout</h2>
                <p>Are you sure you want to logout?</p>
                <motion.button
                    onClick={handleLogout}
                    disabled={loading}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    {loading ? 'Logging out...' : 'Logout'}
                </motion.button>
            </div>
        </motion.div>
    );
};

export default Logout;
