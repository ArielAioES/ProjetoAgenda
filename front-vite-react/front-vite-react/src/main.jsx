import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import Login from './Pages/Login';
import Register from '../src/Pages/Register';
import Home from '../src/Pages/Home';
import Routes from '../src/Components/Content.jsx'
import { QueryClient, QueryClientProvider } from 'react-query'; // Importando QueryClientProvider e QueryClient



const queryClient = new QueryClient() // Create a new QueryClient instance 
const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Routes />
    </QueryClientProvider>
  </React.StrictMode>
);