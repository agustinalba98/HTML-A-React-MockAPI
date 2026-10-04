import { useEffect, useMemo, useState } from 'react';
import { getProducts } from '../../services/products.service';
import ProductCard from '../../components/product-card/ProductCard';
import Loader from '../../components/ui/Loader';
import './Products.css';

function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [priceFilters, setPriceFilters] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                setLoading(true);
                const data = await getProducts();
                setProducts(data);
            } catch {
                setError('No se pudieron cargar los productos.');
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);

    const categories = useMemo(
        () => [...new Set(products.map((p) => p.category).filter(Boolean))],
        [products]
    );

    function toggleValue(list, value, setList) {
        setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
    }

    const filtered = products.filter((p) => {
        const matchCategory =
            selectedCategories.length === 0 || selectedCategories.includes(p.category);
        const price = Number(p.price);
        const matchPrice =
            priceFilters.length === 0 ||
            (priceFilters.includes('menor-20000') && price < 20000) ||
            (priceFilters.includes('mayor-20000') && price >= 20000);
        return matchCategory && matchPrice;
    });

    return (
        <section className="product-page">
            <h1>Productos</h1>
            <p>Explorá nuestro catálogo de productos personalizados de Bendito Arte.</p>

            <div className="products-layout">
                <aside className="products-filters">
                    <h2>Filtros</h2>
                    <h3>Categorías</h3>
                    {categories.length === 0 && <p>Sin categorías</p>}
                    {categories.map((cat) => (
                        <label key={cat}>
                            <input
                                type="checkbox"
                                checked={selectedCategories.includes(cat)}
                                onChange={() => toggleValue(selectedCategories, cat, setSelectedCategories)}
                            />
                            {cat}
                        </label>
                    ))}

                    <h3>Precio</h3>
                    <label>
                        <input
                            type="checkbox"
                            checked={priceFilters.includes('menor-20000')}
                            onChange={() => toggleValue(priceFilters, 'menor-20000', setPriceFilters)}
                        />
                        Menos de $20.000
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={priceFilters.includes('mayor-20000')}
                            onChange={() => toggleValue(priceFilters, 'mayor-20000', setPriceFilters)}
                        />
                        Más de $20.000
                    </label>
                </aside>

                <div className="products-results">
                    {loading && <Loader text="Cargando catálogo..." />}
                    {error && <p className="products-error">{error}</p>}
                    {!loading && !error && filtered.length === 0 && (
                        <p className="products-empty">No hay productos que coincidan con los filtros.</p>
                    )}
                    <div className="product-grid">
                        {filtered.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Products;
