import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

function NotFound() {
    return (
        <section style={{ padding: '80px 40px', textAlign: 'center' }}>
            <FontAwesomeIcon icon={faTriangleExclamation} size="3x" style={{ color: 'var(--color-primary)' }} />
            <h1 style={{ fontSize: '2.5rem', margin: '20px 0 10px' }}>404 — Página no encontrada</h1>
            <p style={{ marginBottom: '25px' }}>La ruta que buscás no existe o fue movida.</p>
            <Link to="/" className="banner-btn">
                <FontAwesomeIcon icon={faHouse} /> Volver al inicio
            </Link>
        </section>
    );
}

export default NotFound;
