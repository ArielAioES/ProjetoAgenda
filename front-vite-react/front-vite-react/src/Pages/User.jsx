import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import '../Pages/Css/User.css';

function User() {
    const id = localStorage.getItem('id');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login'); // Redirecionar para a página de login se o token não estiver presente
        }
    }, [navigate]);

    const handleDeleteAccount = async () => {
        const confirmation = window.confirm("Você tem certeza que deseja deletar sua conta?");
        if (confirmation) {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/user/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Erro ao deletar a conta. Por favor, tente novamente.");
                }

                // Remover todos os dados salvos do usuário após a deleção da conta
                localStorage.removeItem('id');
                localStorage.removeItem('username');
                localStorage.removeItem('email');
                localStorage.removeItem('token');

                console.log("Conta deletada com sucesso.");
                navigate('/'); // Redirecionar o usuário para a página inicial após a deleção da conta
            } catch (error) {
                console.error("Erro ao deletar a conta:", error);
            }
        }
    };

    const handleLogout = () => {
        navigate('/logout'); // Redirecionar o usuário para a página de logout após o logout
    };

    return (
        <motion.div 
            className="user-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className='name-email'>
                <motion.h2 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Name: {localStorage.getItem('username')}
                </motion.h2>
                <motion.h2 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Email: {localStorage.getItem('email')}
                </motion.h2>
            </div>

            <motion.button 
                onClick={handleDeleteAccount}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
            >
                Delete account
            </motion.button>
            <motion.button 
                className='leave' 
                onClick={handleLogout}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
            >
                Leave
            </motion.button>
        </motion.div>
    );
}

export default User;