import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Login from '../Pages/Login.tsx';
import Register from '../Pages/Register.tsx'; 
import Home from '../Pages/Home.tsx';
import Calendar from "../Pages/Calendar.tsx";

const Routes = () => {
   return (
       <BrowserRouter>
           <Switch>
               <Route component={Home} path="/" exact/>
               <Route component={Login} path="/Login" />
               <Route component={Register} path="/Register" exact/>
               <Route component={Calendar} path="/Calendar" exact/>
           </Switch>
       </BrowserRouter>
   );
};

export default Routes;
