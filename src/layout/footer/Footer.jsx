import "./Footer.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";

function Footer() {
    return (
        <footer>
            <div className="footer-content">
                <div className="footer-brand">
                    <img
                        src="/src/assets/images/logo-benditoarte.png"
                        alt="logo bendito arte"
                        className="logo-footer"
                    />
                </div>
                <div className="social-media">
                    <h3>Nuestras redes sociales</h3>
                    <div className="social-links">
                        <a
                            href="https://www.facebook.com/profile.php?id=100063769501202"
                            aria-label="Facebook"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FontAwesomeIcon icon={faFacebook} size="xl" />
                        </a>
                        <a
                            href="https://www.instagram.com/sublimadosbenditoarte/?hl=es"
                            aria-label="Instagram"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FontAwesomeIcon icon={faInstagram} size="xl" />
                        </a>
                    </div>
                </div>
                <div className="footer-contact">
                    <h3>Contacto</h3>
                    <ul>
                        <li><FontAwesomeIcon icon={faEnvelope} /> Email: benditoarte49@gmail.com</li>
                        <li><FontAwesomeIcon icon={faPhone} /> Teléfono: +5491126216111</li>
                        <li><FontAwesomeIcon icon={faLocationDot} /> Dirección: Martin Fierro 7577, Villa Bosch, Buenos Aires</li>
                    </ul>
                </div>
                <p className="footer-copyright">
                    © 2026 Bendito Arte. Todos los derechos reservados.
                </p>
            </div>
        </footer>
    )
}

export default Footer
