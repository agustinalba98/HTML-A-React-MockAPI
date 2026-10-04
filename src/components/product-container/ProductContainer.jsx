import { useState, useEffect } from 'react';
import { getProducts } from '../../services/products.service';
import ProductCard from '../product-card/ProductCard';
import Loader from '../ui/Loader';
import './ProductContainer.css';

function ProductContainer({ limit }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function obtenerProductos() {
            try {
                setLoading(true);
                const productos = await getProducts();
                setProducts(limit ? productos.slice(0, limit) : productos);
            } catch {
                setError('No se pudieron cargar los productos. Intentá nuevamente.');
            } finally {
                setLoading(false);
            }
        }
        obtenerProductos();
    }, [limit]);

    if (loading) return <Loader text="Cargando productos..." />;
    if (error) return <p className="products-error">{error}</p>;
    if (products.length === 0) return <p className="products-empty">No hay productos para mostrar.</p>;

    return (
        <>
            <h2>Productos Destacados</h2>
            <div className="product-grid">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </>
    )
}

export default ProductContainer
