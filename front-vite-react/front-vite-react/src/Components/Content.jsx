import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import Home from '../Pages/Home';
import Calendar from "../Pages/Calendar";
import App from '../App';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/calendar" element={<Calendar />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
