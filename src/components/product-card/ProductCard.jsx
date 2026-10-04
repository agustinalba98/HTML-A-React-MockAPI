import './ProductCard.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faEye } from '@fortawesome/free-solid-svg-icons';
import { useOrder } from '../../context/OrderContext';

function ProductCard({ product }) {
    const { addItemToOrder, openCart } = useOrder();

    if (!product) return null;

    function handleBuy() {
        addItemToOrder(product);
        openCart();
    }

    return (
        <article className="product-card">
            <img src={product.image} alt={product.name} loading="lazy" />
            <h3>{product.name}</h3>
            <p className="product-card-category">{product.category}</p>
            <p className="product-card-price">${Number(product.price).toLocaleString("es-AR")}</p>
            <div className="product-card-actions">
                <button type="button" onClick={handleBuy}>
                    <FontAwesomeIcon icon={faCartShopping} /> Comprar
                </button>
                <Link to={`/products/${product.id}`}>
                    <FontAwesomeIcon icon={faEye} /> Ver más
                </Link>
            </div>
        </article>
    )
}

export default ProductCard
