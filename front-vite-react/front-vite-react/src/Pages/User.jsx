import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAtom } from 'jotai';

import { idAtom, usernameAtom, emailAtom, tokenAtom } from '../Components/atoms/atoms';
import { API_URL } from '../Components/config';

import '../Pages/Css/User.css';

const User = () => {
    const [token, setToken] = useAtom(tokenAtom);
    const [id, setId] = useAtom(idAtom);
    const [username, setUsername] = useAtom(usernameAtom);
    const [email, setEmail] = useAtom(emailAtom);
    const navigate = useNavigate();
    const [error, setError] = useState("");

    if (!token) {
        navigate('/login');
    }

    const handleDeleteAccount = async () => {
        const confirmation = window.confirm("Você tem certeza que deseja deletar sua conta?");
        if (confirmation) {
            try {
                const response = await fetch(`${API_URL}/api/user/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Erro ao deletar a conta. Por favor, tente novamente.");
                }
                // Limpar os átomos após a deleção da conta
                setId(null);
                setUsername(null);
                setEmail(null);
                setToken(null);


                navigate('/'); // Redirecionar o usuário para a página inicial após a deleção da conta
            } catch (error) {
                setError(error.message);
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
                    Nome: {username}
                </motion.h2>
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Email: {email}
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
                Deletar conta
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
                Sair
            </motion.button>

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
        </motion.div>
    );
}

export default User;
