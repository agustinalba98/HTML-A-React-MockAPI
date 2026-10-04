import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faPalette, faTruckFast } from '@fortawesome/free-solid-svg-icons';
import ProductContainer from '../../components/product-container/ProductContainer';

function Home() {
    return (
        <main>
            <section className="banner" id="inicio">
                <img
                    src="/src/assets/images/banner.png"
                    alt="Banner principal de Bendito Arte"
                />
                <div className="banner-content">
                    <h1>Personalizamos tus ideas</h1>
                    <p>Remeras, tazas, botellas y productos únicos hechos con dedicación.</p>
                    <Link to="/products" className="banner-btn">
                        Ver productos
                    </Link>
                </div>
            </section>
            <section className="hero-section">
                <div className="hero-content">
                    <h1>Somos Sublimados Bendito Arte</h1>
                    <p>
                        Somos un emprendimiento de sublimados que transforma ideas en diseños
                        únicos. Creamos productos personalizados con calidad, dedicación y
                        pasión por los detalles. Cada diseño que sale de nuestro taller lleva
                        identidad, creatividad y compromiso.
                    </p>
                    <p>Hecho con pasión, para vos</p>
                </div>
                <div className="hero-image">
                    <img
                        src="/src/assets/images/Introduccion.png"
                        alt="Productos personalizados de Bendito Arte"
                    />
                </div>
            </section>
            <section className="productos-destacados">
                <ProductContainer limit={8} />
            </section>
            <section className="caracteristicas">
                <h2>¿Por qué elegir Bendito Arte?</h2>
                <div className="caracteristicas-grid">
                    <article className="caracteristicas-card">
                        <FontAwesomeIcon icon={faTruckFast} />
                        <h3>Envíos a todo el país</h3>
                        <p>Realizamos envíos seguros para que recibas tus productos donde estés.</p>
                    </article>
                    <article className="caracteristicas-card">
                        <FontAwesomeIcon icon={faPalette} />
                        <h3>Diseños personalizados</h3>
                        <p>Convertimos tus ideas en diseños únicos adaptados a tu estilo.</p>
                    </article>
                    <article className="caracteristicas-card">
                        <FontAwesomeIcon icon={faBolt} />
                        <h3>Producción rápida</h3>
                        <p>Fabricamos cada pedido con dedicación y tiempos de entrega de 24 a 72 horas.</p>
                    </article>
                </div>
            </section>
        </main>
    )
}

export default Home
