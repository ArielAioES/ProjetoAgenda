import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Login from '../Pages/Login';
import Register from '../Pages/Register'; 
import Home from '../Pages/Home';
import Calendar from "../Pages/Calendar";

const Routes: React.FC = () => {
    return (
        <BrowserRouter>
            <Route component={Home} path="/" exact />
            <Route component={Login} path="/Login" />
            <Route component={Register} path="/Register" />
            <Route component={Calendar} path="/Calendar" />
        </BrowserRouter>
    );
};

export default Routes;
