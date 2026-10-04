import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBasketShopping,
    faMinus,
    faPlus,
    faTrash,
    faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { useOrder } from '../../context/OrderContext';
import './CartSidebar.css';

function CartSidebar() {
    const {
        order,
        totalItems,
        totalPrice,
        isCartOpen,
        closeCart,
        changeItemQuantity,
        removeItemFromOrder,
    } = useOrder();

    return (
        <>
            <div
                className={`cart-overlay ${isCartOpen ? 'open' : ''}`}
                onClick={closeCart}
                aria-hidden={!isCartOpen}
            />
            <aside className={`cart-sidebar ${isCartOpen ? 'open' : ''}`} aria-hidden={!isCartOpen}>
                <div className="cart-sidebar-header">
                    <h2><FontAwesomeIcon icon={faBasketShopping} /> Mi Canasta ({totalItems})</h2>
                    <button type="button" onClick={closeCart} aria-label="Cerrar carrito">
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>

                <div className="cart-sidebar-body">
                    {order.length === 0 ? (
                        <p className="cart-sidebar-empty">Tu canasta está vacía.</p>
                    ) : (
                        order.map((item) => (
                            <article key={item.id} className="cart-sidebar-item">
                                <img src={item.image} alt={item.name} width={60} />
                                <div className="cart-sidebar-info">
                                    <p className="cart-sidebar-name">{item.name}</p>
                                    <p>${Number(item.price).toLocaleString('es-AR')}</p>
                                    <div className="cart-sidebar-quantity">
                                        <button type="button" onClick={() => changeItemQuantity(item.id, -1)} aria-label="Quitar uno">
                                            <FontAwesomeIcon icon={faMinus} />
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button type="button" onClick={() => changeItemQuantity(item.id, 1)} aria-label="Agregar uno">
                                            <FontAwesomeIcon icon={faPlus} />
                                        </button>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    className="cart-sidebar-remove"
                                    onClick={() => removeItemFromOrder(item.id)}
                                    aria-label="Eliminar producto"
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </article>
                        ))
                    )}
                </div>

                {order.length > 0 && (
                    <div className="cart-sidebar-footer">
                        <p className="cart-sidebar-total">
                            Total: <strong>${Number(totalPrice).toLocaleString('es-AR')}</strong>
                        </p>
                        <Link to="/cart" className="btn-checkout" onClick={closeCart}>
                            Ver canasta completa
                        </Link>
                    </div>
                )}
            </aside>
        </>
    );
}

export default CartSidebar;
