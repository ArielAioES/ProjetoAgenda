import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAtom } from 'jotai';

import { API_URL } from '../Components/config';
import { tokenAtom } from '../Components/atoms/atoms';

import '../Pages/Css/NewEvent.css';

const Event = () => {
    const [token] = useAtom(tokenAtom);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        time: '',
        duration: '',
        description: ''
    });
    const navigate = useNavigate();

    // Função para lidar com a mudança nos inputs do formulário
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Função para lidar com o envio do formulário
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/api/event/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Falha ao salvar o evento');
            }

            navigate('/calendar');
        } catch (error) {
            setError(error.message);
        }
    };

    // Redirecionar para a página de login se não houver token
    if (!token) {
        navigate('/login');
    }

    // Definir os itens do formulário
    const formItems = [
        { label: 'Título', type: 'text', name: 'title', value: formData.title, delay: 0.4 },
        { label: 'Data', type: 'date', name: 'date', value: formData.date, delay: 0.6 },
        { label: 'Hora', type: 'time', name: 'time', value: formData.time, delay: 0.8 },
        { label: 'Duração (em horas)', type: 'number', name: 'duration', value: formData.duration, delay: 1 },
        { label: 'Descrição', type: 'text', name: 'description', value: formData.description, delay: 1.2 }
    ];

    return (
        <motion.div
            className="event-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <motion.h2
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        Cadastro de Evento
                    </motion.h2>
                    {formItems.map((item, index) => (
                        <div className='itens' key={index}>
                            <motion.label
                                htmlFor={item.name}
                                initial={{ x: -50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: item.delay }}
                            >
                                {item.label}:
                            </motion.label>
                            {item.type === 'textarea' ? (
                                <motion.textarea
                                    id={item.name}
                                    name={item.name}
                                    value={item.value}
                                    onChange={handleChange}
                                    initial={{ x: -50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: item.delay + 0.2 }}
                                    required
                                />
                            ) : (
                                <motion.input
                                    type={item.type}
                                    id={item.name}
                                    name={item.name}
                                    value={item.value}
                                    onChange={handleChange}
                                    initial={{ x: -50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: item.delay + 0.2 }}
                                    required
                                />
                            )}
                        </div>
                    ))}
                    <motion.button className='btn-submit'
                        type="submit"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1.4 }}
                    >
                        Salvar
                    </motion.button>
                    {error && (
                        <motion.div
                            className="error-message"
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: .7 }}
                        >
                            {error}
                        </motion.div>
                    )}
                </form>
            </div>
        </motion.div>
    );
};

export default Event;