import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { atom, useAtom } from 'jotai';

import { API_URL } from '../Components/config';

import '../Pages/Css/User.css';

const User = () => {
    const userAtom = atom({ // Criando um único átomo para armazenar todas as informações do usuário
        token: localStorage.getItem('token') || '',
        id: localStorage.getItem('id') || '',
        username: localStorage.getItem('username') || '',
        email: localStorage.getItem('email') || ''
    });
    const [user] = useAtom(userAtom);
    const navigate = useNavigate();

    if (!user.token) {
        navigate('/login')
    }

    const handleDeleteAccount = async () => {
        const confirmation = window.confirm("Você tem certeza que deseja deletar sua conta?");
        if (confirmation) {
            try {
                const response = await fetch(`${API_URL}/api/user/${user.id}`, {
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
                    Name: {user.username}
                </motion.h2>
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Email: {user.email}
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