import { useForm } from 'react-hook-form';
import './AdminProducts.css'
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import ProductRow from '../../../components/product-row/ProductRow';
import Loader from '../../../components/ui/Loader';
import {
    createProduct,
    deleteProduct,
    getProducts,
    updateProduct,
} from '../../../services/products.service';

function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingProductId, setEditingProductId] = useState(null);
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();

    async function obtenerProductos() {
        try {
            setLoading(true);
            const productosObtenidos = await getProducts();
            setProducts(productosObtenidos);
        } catch {
            Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudieron cargar los productos.' });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        obtenerProductos();
    }, [])

    async function envioFormulario(data) {
        try {
            if (editingProductId) {
                await updateProduct(editingProductId, data);
                Swal.fire({
                    icon: "success",
                    title: "Producto editado",
                    text: `El producto ${data.name} se ha editado correctamente`,
                })
            } else {
                await createProduct(data);
                Swal.fire({
                    icon: "success",
                    title: "Producto creado",
                    text: `El producto ${data.name} se ha cargado correctamente`,
                })
            }
            setEditingProductId(null);
            reset();
            await obtenerProductos();
        } catch (error) {
            console.error("Error completo:", error);
            Swal.fire({
                icon: "error",
                title: "Hubo un error al guardar el producto",
                text: error.response?.data?.message || error.message || "Error desconocido - revisá la consola (F12)",
            });
        }
    }

    async function handleDelete(id) {
        try {
            const result = await Swal.fire({
                icon: "warning",
                title: "¿Estás seguro?",
                text: "No podrás revertir esta acción",
                showCancelButton: true,
                confirmButtonText: "Sí, eliminar",
                cancelButtonText: "Cancelar",
            })
            if (!result.isConfirmed) return;
            await deleteProduct(id);
            Swal.fire({
                icon: "success",
                title: "Producto eliminado",
                text: "El producto se ha eliminado correctamente",
            });
            obtenerProductos();
        } catch {
            Swal.fire({
                icon: "error",
                title: "Error al eliminar producto",
                text: "Hubo un error al eliminar el producto",
            })
        }
    }

    function handleEdit(id) {
        const productoEditar = products.find(producto => producto.id === id);
        if (productoEditar) {
            setValue("image", productoEditar.image);
            setValue("name", productoEditar.name);
            setValue("description", productoEditar.description);
            setValue("category", productoEditar.category);
            setValue("price", productoEditar.price);
            setValue("stock", productoEditar.stock);
            setEditingProductId(productoEditar.id);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    function handleCancelEdit() {
        setEditingProductId(null);
        reset();
    }

    return (
        <main>
            <section className="admin-products">
                <h1>Administrador de productos</h1>
                <p>
                    Panel de administración para visualizar, crear, editar o eliminar productos
                    cargados en el catálogo.
                </p>

                <div className="admin-layout">
                    <div className="form-card">
                        <h2>{editingProductId ? 'Editar producto' : 'Ingreso de nuevo producto'}</h2>
                        <form className="product-form" onSubmit={handleSubmit(envioFormulario)}>
                            <div className="form-group">
                                <label htmlFor="foto">Foto del producto (URL):</label>
                                <input
                                    type="url"
                                    id="foto"
                                    {...register("image", { required: "La imagen es requerida" })}
                                    placeholder="https://.../imagen.jpg"
                                />
                                {errors.image && <span className="error">{errors.image.message}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="nombre">Nombre del producto:</label>
                                <input
                                    type="text"
                                    {...register("name", { required: "El nombre es requerido" })}
                                    id="nombre"
                                    placeholder="Nombre del producto"
                                />
                                {errors.name && <span className="error">{errors.name.message}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="descripcion">Descripción del producto:</label>
                                <textarea
                                    id="descripcion"
                                    {...register("description", { required: "La descripción es requerida" })}
                                    rows="4"
                                    placeholder="Ingresá una descripción"
                                />
                                {errors.description && <span className="error">{errors.description.message}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="precio">Precio:</label>
                                <input
                                    type="number"
                                    {...register("price", { required: "El precio es requerido", valueAsNumber: true, min: { value: 1, message: "El precio mínimo es 1" } })}
                                    id="precio"
                                    placeholder="Ingresá un precio"
                                />
                                {errors.price && <span className="error">{errors.price.message}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="categoria">Categoría:</label>
                                <select
                                    id="categoria"
                                    {...register("category", { required: "La categoría es requerida" })}
                                >
                                    <option value="">Seleccioná una categoría</option>
                                    <option value="Airbag">Airbag</option>
                                    <option value="Messi">Messi</option>
                                    <option value="F1">F1</option>
                                </select>
                                {errors.category && <span className="error">{errors.category.message}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="stock">Stock:</label>
                                <input
                                    type="number"
                                    {...register("stock", { required: "El stock es requerido", valueAsNumber: true, min: { value: 0, message: "El stock mínimo es 0" } })}
                                    id="stock"
                                    placeholder="Ingresá el stock"
                                />
                                {errors.stock && <span className="error">{errors.stock.message}</span>}
                            </div>

                            <button className="btn-submit" type="submit">
                                {editingProductId ? "Guardar cambios" : "Agregar producto"}
                            </button>
                            {editingProductId && (
                                <button className="btn-cancel" type="button" onClick={handleCancelEdit}>
                                    <FontAwesomeIcon icon={faXmark} /> Cancelar edición
                                </button>
                            )}
                        </form>
                    </div>

                    <div className="table-responsive">
                        {loading ? (
                            <Loader text="Cargando productos..." />
                        ) : (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Foto</th>
                                        <th>Nombre</th>
                                        <th>Descripción</th>
                                        <th>Fecha de ingreso</th>
                                        <th>Precio</th>
                                        <th>Stock</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product) => (
                                        <ProductRow
                                            key={product.id}
                                            prod={product}
                                            handleEdit={handleEdit}
                                            handleDelete={handleDelete}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </section>
        </main>
    )
}

export default AdminProducts
