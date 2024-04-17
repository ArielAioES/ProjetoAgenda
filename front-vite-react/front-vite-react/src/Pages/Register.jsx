import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importe o hook useNavigate

export default function Register() {
    const navigate = useNavigate(); // Inicialize o hook useNavigate
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [username, setUsername] = useState('');
    const [isRegistered, setIsRegistered] = useState(false); // Estado para controlar se o registro foi concluído com sucesso

    useEffect(() => {
        return () => {
            // Limpar os campos de senha ao desmontar o componente
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
                navigate('/'); // Redirecionar para a página inicial após o registro bem-sucedido
            })
            .catch(error => {
                console.error('Error registering:', error);
            });
    };

    return (
        <div className='RegisterPage'>
            <form onSubmit={handleSubmit}>
            <h1>Register</h1>
                <div>
                    <div className="form-field">
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
                    </div>

                    <div className="form-field">
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
                    </div>

                    <div className="form-field">
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
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <button className="ms-4" type="submit">Register</button>
                    </div>
                </div>
            </form>

            {isRegistered && <p>Cadastrado com sucesso!</p>}
            {username && <p>Username: {username}</p>}
        </div>
    );
}
