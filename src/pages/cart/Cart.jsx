import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBasketShopping,
    faMinus,
    faPlus,
    faTrash,
    faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { useOrder } from '../../context/OrderContext';
import './Cart.css';

function Cart() {
    const {
        order,
        removeItemFromOrder,
        changeItemQuantity,
        clearOrder,
        totalItems,
        totalPrice,
    } = useOrder();

    async function handleClear() {
        const result = await Swal.fire({
            icon: 'warning',
            title: '¿Vaciar la canasta?',
            text: 'Se quitarán todos los productos.',
            showCancelButton: true,
            confirmButtonText: 'Sí, vaciar',
            cancelButtonText: 'Cancelar',
        });
        if (result.isConfirmed) {
            clearOrder();
        }
    }

    function handleCheckout() {
        Swal.fire({
            icon: 'success',
            title: '¡Gracias por tu compra!',
            text: `Tu pedido de ${totalItems} producto(s) por $${Number(totalPrice).toLocaleString('es-AR')} fue registrado.`,
        });
        clearOrder();
    }

    if (order.length === 0) {
        return (
            <section className="cart cart-empty">
                <FontAwesomeIcon icon={faBasketShopping} size="3x" className="cart-empty-icon" />
                <h1>Tu canasta está vacía</h1>
                <p>Todavía no agregaste productos. Explorá el catálogo y encontrá tu próximo diseño.</p>
                <Link to="/products" className="banner-btn">
                    Ver productos
                </Link>
            </section>
        );
    }

    return (
        <section className="cart">
            <h1><FontAwesomeIcon icon={faBasketShopping} /> Mi Canasta ({totalItems})</h1>

            <div className="cart-layout">
                <div className="table-responsive">
                    <table className="cart-table">
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Precio</th>
                                <th>Cantidad</th>
                                <th>Subtotal</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.map((item) => (
                                <tr key={item.id}>
                                    <td className="cart-product">
                                        <img src={item.image} alt={item.name} width={60} />
                                        <span>{item.name}</span>
                                    </td>
                                    <td>${Number(item.price).toLocaleString('es-AR')}</td>
                                    <td className="cart-quantity">
                                        <button type="button" onClick={() => changeItemQuantity(item.id, -1)} aria-label="Quitar uno">
                                            <FontAwesomeIcon icon={faMinus} />
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button type="button" onClick={() => changeItemQuantity(item.id, 1)} aria-label="Agregar uno">
                                            <FontAwesomeIcon icon={faPlus} />
                                        </button>
                                    </td>
                                    <td>${Number(Number(item.price) * item.quantity).toLocaleString('es-AR')}</td>
                                    <td>
                                        <button type="button" onClick={() => removeItemFromOrder(item.id)} aria-label="Eliminar">
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <aside className="cart-summary">
                    <h2>Resumen</h2>
                    <p>Productos: <strong>{totalItems}</strong></p>
                    <p className="cart-total">Total: <strong>${Number(totalPrice).toLocaleString('es-AR')}</strong></p>
                    <button type="button" className="btn-checkout" onClick={handleCheckout}>
                        Finalizar compra
                    </button>
                    <button type="button" className="btn-cancel" onClick={handleClear}>
                        <FontAwesomeIcon icon={faTrashCan} /> Vaciar canasta
                    </button>
                </aside>
            </div>
        </section>
    );
}

export default Cart;
