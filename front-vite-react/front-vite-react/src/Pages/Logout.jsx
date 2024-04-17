import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Importe motion do framer-motion

const Logout = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        setLoading(true);
        // Faz a requisição para a API para efetuar o logout
        fetch('http://127.0.0.1:8000/api/logout', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Inclui o token de autorização no cabeçalho
            }
        })
        .then(response => {
            if (response.ok) {
                // Limpa o token do localStorage
                localStorage.removeItem('token');
                // Redireciona para a página de login
                navigate('/');
            } else {
                throw new Error('Logout failed');
            }
        })
        .catch(error => {
            console.error('Error logging out:', error);
            // Trate o erro conforme necessário, como exibir uma mensagem de erro para o usuário
        })
        .finally(() => setLoading(false));
    };

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