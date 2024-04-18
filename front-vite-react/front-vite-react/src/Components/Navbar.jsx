import { Link } from "react-router-dom";
import { FaHome, FaUserCircle } from "react-icons/fa"
import { useAtom } from 'jotai'

import { tokenAtom } from '../Components/atoms/atoms';
;

import './Navbar.css';

const Navbar = () => {
    const [token] = useAtom(tokenAtom); // Obtendo o token do átomo

    return (
        <nav>
            <div className="home">
                <h2>
                    <Link to="/">
                        <FaHome />Home
                    </Link>
                </h2>
            </div>
            {token ? ( // Verifica se o token existe
                <div className="details-user">
                    <h2>
                        <Link to="/user">
                            <FaUserCircle /><p className="my-accont"></p>
                        </Link>
                    </h2>
                </div>
            ) : (
                <div className="login-register">
                    <h2>
                        <Link to="/login">
                            <p className="login">Login</p>
                        </Link>
                    </h2>
                    <h2>
                        <Link to="/register">
                            <p className="register">Register</p>
                        </Link>
                    </h2>
                </div>
            )}
        </nav>
    )
}

export default Navbar;