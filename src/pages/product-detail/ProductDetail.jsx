import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faBox, faCartPlus, faTag } from '@fortawesome/free-solid-svg-icons';
import { getProductById } from '../../services/products.service';
import { useOrder } from '../../context/OrderContext';
import Loader from '../../components/ui/Loader';
import './ProductDetail.css';

function ProductDetail() {
    const { id } = useParams();
    const { addItemToOrder, openCart } = useOrder();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function obtenerProducto() {
            try {
                setLoading(true);
                const producto = await getProductById(id);
                setProduct(producto);
            } catch {
                setError('No se pudo cargar el producto.');
            } finally {
                setLoading(false);
            }
        }
        if (id) obtenerProducto();
    }, [id])

    if (loading) return <Loader text="Cargando producto..." />;
    if (error) return <p className="products-error">{error}</p>;
    if (!product) return <p className="products-empty">Producto no encontrado.</p>;

    return (
        <section className='product-detail'>
            <Link to="/products" className="back-link">
                <FontAwesomeIcon icon={faArrowLeft} /> Volver al catálogo
            </Link>
            <div className='product-detail-layout'>
                <div className='product-image'>
                    <img src={product.image} alt={product.name} />
                </div>
                <div className='product-info'>
                    <p className='product-category'>
                        <FontAwesomeIcon icon={faTag} /> Categoría: {product.category}
                    </p>
                    <h1>{product.name}</h1>
                    <p className='product-description'>{product.description}</p>
                    <p className='product-price'>${Number(product.price).toLocaleString("es-AR")}</p>
                    {product.stock != null && (
                        <p><FontAwesomeIcon icon={faBox} /> Stock: {product.stock}</p>
                    )}
                    <button type="button" onClick={() => { addItemToOrder(product); openCart(); }}>
                        <FontAwesomeIcon icon={faCartPlus} /> Agregar al carrito
                    </button>
                </div>
            </div>
        </section>
    )
}

export default ProductDetail
