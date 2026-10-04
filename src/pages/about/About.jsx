import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import './About.css';

function About() {
    return (
        <main className="about">
            <h1>¿Quiénes somos?</h1>
            <div className="about-us-top">
                <p>
                    Bendito Arte nació en 2019 con el objetivo de transformar ideas en productos
                    únicos y personalizados para que cada persona sienta que creó algo único y
                    totalmente personalizado para ella.
                </p>
                <img
                    src="/src/assets/images/acerca-de.png"
                    alt="Ejemplos de productos"
                    className="about-image"
                />
                <p>
                    Nos dedicamos a crear productos de alta calidad que reflejen la singularidad
                    de cada cliente. Desde camisetas y tazas hasta objetos decorativos, cada
                    artículo es elaborado con atención al detalle y un toque de creatividad para
                    que cada cliente pueda expresar su estilo y personalidad a través de nuestros
                    productos.
                </p>
                <p><FontAwesomeIcon icon={faHeart} /> Pasión, creatividad, compromiso y calidad es lo que nos representa</p>
            </div>

            <div className="about-contact">
                <img
                    src="/src/assets/images/about-us.png"
                    alt="Imagen contacto con clientes"
                    className="about-image"
                />
                <div className="about-contact-info">
                    <p>
                        Para más información contactate con nosotros completando el siguiente formulario:
                        <Link to="/contact" title="contacto" aria-label="Ir a contacto">
                            <FontAwesomeIcon icon={faFileLines} />
                        </Link>
                    </p>
                    <p>
                        O a través de nuestro canal de atención al cliente de Whatsapp
                        <a
                            href="https://api.whatsapp.com/send/?phone=%2B541126216111&text&type=phone_number&app_absent=0&utm_source=ig"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Whatsapp"
                        >
                            <FontAwesomeIcon icon={faWhatsapp} />
                        </a>
                    </p>
                </div>
            </div>
        </main>
    )
}

export default About
