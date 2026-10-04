import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

function formatearFecha(iso) {
    if (!iso) return '';
    const d = new Date(iso);
    if (isNaN(d)) return iso;
    return d.toLocaleDateString('es-AR');
}

export default function ProductRow({ prod, handleEdit, handleDelete }) {

    
    return (
        <tr>
            <td>
                <img
                    src={prod.image}
                    alt={prod.name}
                    width={80}
                />
            </td>
            <td>{prod.name}</td>
            <td>{prod.description}</td>
            <td>{formatearFecha(prod.createdAt)}</td>
            <td>${Number(prod.price).toLocaleString("es-AR")}</td>
            <td>{prod.stock}</td>
            <td>
                <button onClick={() => handleEdit(prod.id)}><FontAwesomeIcon icon={faEdit} /></button>
                <button onClick={() => handleDelete(prod.id)}><FontAwesomeIcon icon={faTrash} /></button>
            </td>
        </tr>
    )
}
