import { createContext, useContext, useEffect, useReducer, useState } from 'react';

const OrderContext = createContext(null);

const initialState = {
    order: [],
    totalItems: 0,
    totalPrice: 0,
};

// Función reutilizable: calcula totales en un solo lugar
// en vez de repetir el mismo reduce en cada caso.
function calcTotals(order) {
    const totalItems = order.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = order.reduce(
        (acc, item) => acc + Number(item.price) * item.quantity,
        0
    );
    return { totalItems, totalPrice };
}

function orderReducer(state, action) {
    switch (action.type) {
        case 'ADD_ITEM': {
            // Copia profunda para no mutar el estado original
            const cart = structuredClone(state.order);
            const index = cart.findIndex((item) => item.id === action.payload.id);
            if (index >= 0) {
                cart[index].quantity += 1;
            } else {
                // Separamos el stock del producto de la cantidad del carrito:
                // stock = disponibilidad, quantity = lo que lleva el cliente.
                const { stock: _stock, ...productData } = action.payload;
                cart.push({ ...productData, quantity: 1 });
            }
            return { ...state, order: cart };
        }
        case 'REMOVE_ITEM': {
            // filter crea un array nuevo sin el producto,
            // sin modificar el array original (a diferencia de splice).
            const cart = state.order.filter((item) => item.id !== action.payload);
            return { ...state, order: cart };
        }
        case 'CHANGE_QUANTITY': {
            const cart = structuredClone(state.order);
            const index = cart.findIndex((item) => item.id === action.payload.id);
            if (index >= 0) {
                cart[index].quantity += action.payload.delta;
                if (cart[index].quantity <= 0) {
                    return {
                        ...state,
                        order: cart.filter((item) => item.id !== action.payload.id),
                    };
                }
            }
            return { ...state, order: cart };
        }
        case 'CLEAR_ORDER':
            return { ...state, order: [] };
        case 'UPDATE_TOTALS':
            return { ...state, ...calcTotals(state.order) };
        default:
            return state;
    }
}

export function OrderProvider({ children }) {
    const [state, dispatch] = useReducer(orderReducer, initialState);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Cada vez que cambia la orden, se recalculan totales y cantidades.
    useEffect(() => {
        dispatch({ type: 'UPDATE_TOTALS' });
    }, [state.order]);

    function addItemToOrder(product) {
        dispatch({ type: 'ADD_ITEM', payload: product });
    }

    function removeItemFromOrder(id) {
        dispatch({ type: 'REMOVE_ITEM', payload: id });
    }

    function changeItemQuantity(id, delta) {
        dispatch({ type: 'CHANGE_QUANTITY', payload: { id, delta } });
    }

    function clearOrder() {
        dispatch({ type: 'CLEAR_ORDER' });
    }

    function openCart() {
        setIsCartOpen(true);
    }

    function closeCart() {
        setIsCartOpen(false);
    }

    return (
        <OrderContext.Provider
            value={{
                order: state.order,
                totalItems: state.totalItems,
                totalPrice: state.totalPrice,
                isCartOpen,
                addItemToOrder,
                removeItemFromOrder,
                changeItemQuantity,
                clearOrder,
                openCart,
                closeCart,
            }}
        >
            {children}
        </OrderContext.Provider>
    );
}

export function useOrder() {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error('useOrder debe usarse dentro de un OrderProvider');
    }
    return context;
}
