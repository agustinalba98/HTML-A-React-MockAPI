import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faUserPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { createUser, deleteUser, getUsers, updateUser } from '../../../services/users.service';
import Loader from '../../../components/ui/Loader';
import '../products/AdminProducts.css';
import './AdminUsers.css';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();

    async function fetchUsers() {
        try {
            setLoading(true);
            const data = await getUsers();
            setUsers(data);
        } catch {
            Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudieron cargar los usuarios.' });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    async function onSubmit(data) {
        try {
            if (editingId) {
                await updateUser(editingId, data);
                Swal.fire({ icon: 'success', title: 'Usuario actualizado', text: `${data.name} se actualizó correctamente.` });
            } else {
                await createUser(data);
                Swal.fire({ icon: 'success', title: 'Usuario creado', text: `${data.name} se creó correctamente.` });
            }
            setEditingId(null);
            reset();
            fetchUsers();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error al guardar',
                text: error.response?.data?.message || error.message || 'Intentá nuevamente.',
            });
        }
    }

    function handleEdit(user) {
        setEditingId(user.id);
        setValue('name', user.name);
        setValue('email', user.email);
        setValue('password', user.password ?? '');
        setValue('birthDate', user.birthDate ? String(user.birthDate).slice(0, 10) : '');
        setValue('province', user.province ?? '');
    }

    function handleCancel() {
        setEditingId(null);
        reset();
    }

    async function handleDelete(id) {
        const result = await Swal.fire({
            icon: 'warning',
            title: '¿Estás seguro?',
            text: 'No podrás revertir esta acción.',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        });
        if (!result.isConfirmed) return;
        try {
            await deleteUser(id);
            Swal.fire({ icon: 'success', title: 'Usuario eliminado' });
            fetchUsers();
        } catch {
            Swal.fire({ icon: 'error', title: 'Error al eliminar' });
        }
    }

    return (
        <section className="admin-users">
            <h1>Administración de usuarios</h1>
            <p>Listado de usuarios registrados en MockAPI. Podés crear, editar y eliminar.</p>

            <div className="admin-layout">
                <div className="form-card">
                    <h2><FontAwesomeIcon icon={faUserPlus} /> {editingId ? 'Editar usuario' : 'Nuevo usuario'}</h2>
                    <form className="product-form" onSubmit={handleSubmit(onSubmit)} noValidate>
                        <div className="form-group">
                            <label htmlFor="name">Nombre:</label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Nombre y apellido"
                                {...register('name', { required: 'El nombre es requerido' })}
                            />
                            {errors.name && <span className="error">{errors.name.message}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="ejemplo@mail.com"
                                {...register('email', {
                                    required: 'El email es requerido',
                                    pattern: { value: EMAIL_REGEX, message: 'Email inválido' },
                                })}
                            />
                            {errors.email && <span className="error">{errors.email.message}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Contraseña:</label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Mínimo 6 caracteres"
                                {...register('password', {
                                    required: 'La contraseña es requerida',
                                    minLength: { value: 6, message: 'Mínimo 6 caracteres' },
                                })}
                            />
                            {errors.password && <span className="error">{errors.password.message}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="birthDate">Fecha de nacimiento:</label>
                            <input
                                id="birthDate"
                                type="date"
                                {...register('birthDate', { required: 'La fecha es requerida' })}
                            />
                            {errors.birthDate && <span className="error">{errors.birthDate.message}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="province">Provincia:</label>
                            <input
                                id="province"
                                type="text"
                                placeholder="Ej: Buenos Aires"
                                {...register('province', { required: 'La provincia es requerida' })}
                            />
                            {errors.province && <span className="error">{errors.province.message}</span>}
                        </div>
                        <button className="btn-submit" type="submit">
                            {editingId ? 'Guardar cambios' : 'Crear usuario'}
                        </button>
                        {editingId && (
                            <button className="btn-cancel" type="button" onClick={handleCancel}>
                                <FontAwesomeIcon icon={faXmark} /> Cancelar edición
                            </button>
                        )}
                    </form>
                </div>

                <div className="table-responsive">
                    {loading ? (
                        <Loader text="Cargando usuarios..." />
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Email</th>
                                    <th>Nacimiento</th>
                                    <th>Provincia</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.birthDate ? String(user.birthDate).slice(0, 10) : '-'}</td>
                                        <td>{user.province ?? '-'}</td>
                                        <td>
                                            <button type="button" onClick={() => handleEdit(user)} aria-label="Editar">
                                                <FontAwesomeIcon icon={faPenToSquare} />
                                            </button>
                                            <button type="button" onClick={() => handleDelete(user.id)} aria-label="Eliminar">
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </section>
    );
}

export default AdminUsers;
