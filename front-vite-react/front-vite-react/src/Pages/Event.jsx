import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAtom } from 'jotai';

import { tokenAtom } from '../Components/atoms/atoms';


const Event = () => {
    const [token] = useAtom(tokenAtom);
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        time: '',
        duration: '',
        description: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    if (!token) {
        navigate('/login');
    }

    const formItems = [
        { label: 'Title', type: 'text', name: 'title', value: formData.title, delay: 0.4 },
        { label: 'Date', type: 'date', name: 'date', value: formData.date, delay: 0.6 },
        { label: 'Time', type: 'time', name: 'time', value: formData.time, delay: 0.8 },
        { label: 'Duration', type: 'time', name: 'duration', value: formData.duration, delay: 1 },
        { label: 'Description', type: 'textarea', name: 'description', value: formData.description, delay: 1.2 }
    ];

    return (
        <motion.div
            className="event-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <form onSubmit={handleSubmit}>
                <motion.h2
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    Cadastro de Eventos
                </motion.h2>
                {formItems.map((item, index) => (
                    <div key={index}>
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
                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 2.4 }}
                >
                    Salvar
                </motion.button>
            </form>
        </motion.div>
    );
};

export default Event;
