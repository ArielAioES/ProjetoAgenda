import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import './Navbar.css'; // Arquivo de estilos

function Navbar() {
    const token = localStorage.getItem('token'); // Obtém o token do localStorage

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
                <div className="logout">
                    <h2>
                        <Link to="/logout">Sair</Link>
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
