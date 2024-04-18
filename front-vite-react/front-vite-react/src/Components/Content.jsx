import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import Home from '../Pages/Home';
import Calendar from "../Pages/Calendar";
import Event from "../Pages/Event";
import Logout from "../Pages/Logout";
import User from "../Pages/User";
import EditEvent from "../Pages/EditEvent";
import App from "../App";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<App />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/event" element={<Event />} />
                    <Route path="/user" element={<User />} />
                    <Route path="/event/:id" element={<EditEvent />} />
                    <Route path="/logout" element={<Logout />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;