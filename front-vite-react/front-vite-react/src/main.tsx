import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import Login from './Pages/Login';
import Register from './Pages/Register';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  </React.StrictMode>
);
