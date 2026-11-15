import { NavLink, Link } from "react-router-dom"
import "./Header.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBasketShopping, faRightToBracket, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useOrder } from "../../context/OrderContext";
import logo from "../../assets/images/Logo-benditoarte.png";

function Header() {
    const { totalItems, openCart } = useOrder();

    return (
        <header className="header-content">
            <Link to="/">
                <img
                    src={logo}
                    alt="logo bendito arte"
                    className="logo"
                />
            </Link>
            <input type="checkbox" id="menu-toggle" className="menu-toggle" />
            <label htmlFor="menu-toggle" className="hamburger" aria-label="Abrir menú">
                <FontAwesomeIcon icon={faBars} />
            </label>
            <nav className="nav-bar">
                <ul className="nav-links">
                    <li>
                        <NavLink to="/">Principal</NavLink>
                    </li>
                    <li>
                        <NavLink to="/products">Productos</NavLink>
                    </li>
                    <li>
                        <NavLink to="/register">Registro</NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact">Contacto</NavLink>
                    </li>
                    <li>
                        <NavLink to="/about">Acerca de</NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/products">Admin productos</NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/users">Admin usuarios</NavLink>
                    </li>
                </ul>
                <div className="user-actions">
                    <Link className="login-btn" to="/login">
                        <FontAwesomeIcon icon={faRightToBracket} /> Login
                    </Link>
                    <NavLink to="/register" aria-label="Usuario">
                        <FontAwesomeIcon icon={faUserCircle} size="lg" />
                        <span>Mi Perfil</span>
                    </NavLink>
                    <button type="button" onClick={openCart} aria-label="Carrito" className="cart-link">
                        <FontAwesomeIcon icon={faBasketShopping} size="lg" />
                        <span>Mi Canasta</span>
                        {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
                    </button>
                </div>
            </nav>
        </header>
    )
}

export default Header
