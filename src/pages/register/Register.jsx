import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { createUser } from '../../services/users.service';
import './Register.css';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PROVINCES = [
  'Buenos Aires', 'CABA', 'Catamarca', 'Chaco', 'Chubut', 'Córdoba',
  'Corrientes', 'Entre Ríos', 'Formosa', 'Jujuy', 'La Pampa', 'La Rioja',
  'Mendoza', 'Misiones', 'Neuquén', 'Río Negro', 'Salta', 'San Juan',
  'San Luis', 'Santa Cruz', 'Santa Fe', 'Santiago del Estero',
  'Tierra del Fuego', 'Tucumán',
];

function Register() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch('password');

  async function onSubmit(data) {
    try {
      const { repeatPassword: _repeat, ...payload } = data;
      await createUser(payload);
      Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        text: `Bienvenido/a ${payload.name}, tu cuenta fue creada correctamente.`,
      });
      reset();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al registrarse',
        text: error.response?.data?.message || error.message || 'Intentá nuevamente.',
      });
    }
  }

  return (
    <section className="register">
      <h1>Formulario de Registro</h1>
      <p>
        Completá el formulario con tus datos personales para que creemos tu cuenta en nuestra
        web y puedas gestionar tus pedidos y medios de pago.
      </p>

      <div className="register-form">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <label htmlFor="name">Nombre completo:</label>
          <input
            type="text"
            id="name"
            placeholder="Nombre/s y apellido/s"
            {...register('name', { required: 'El nombre es obligatorio' })}
          />
          {errors.name && <span className="error">{errors.name.message}</span>}

          <label htmlFor="email">Correo electrónico:</label>
          <input
            type="email"
            id="email"
            placeholder="ejemplo@mail.com"
            {...register('email', {
              required: 'El email es obligatorio',
              pattern: { value: EMAIL_REGEX, message: 'Ingresá un email válido' },
            })}
          />
          {errors.email && <span className="error">{errors.email.message}</span>}

          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            placeholder="Mínimo 6 caracteres"
            {...register('password', {
              required: 'La contraseña es obligatoria',
              minLength: { value: 6, message: 'La contraseña debe tener al menos 6 caracteres' },
            })}
          />
          {errors.password && <span className="error">{errors.password.message}</span>}

          <label htmlFor="repeatPassword">Repetir contraseña:</label>
          <input
            type="password"
            id="repeatPassword"
            placeholder="Repetí tu contraseña"
            {...register('repeatPassword', {
              required: 'Debés repetir la contraseña',
              validate: (value) => value === password || 'Las contraseñas no coinciden',
            })}
          />
          {errors.repeatPassword && <span className="error">{errors.repeatPassword.message}</span>}

          <label htmlFor="birthDate">Fecha de nacimiento:</label>
          <input
            type="date"
            id="birthDate"
            {...register('birthDate', { required: 'La fecha de nacimiento es obligatoria' })}
          />
          {errors.birthDate && <span className="error">{errors.birthDate.message}</span>}

          <label htmlFor="province">Provincia:</label>
          <select
            id="province"
            defaultValue=""
            {...register('province', { required: 'Seleccioná tu provincia' })}
          >
            <option value="" disabled>Seleccioná tu provincia</option>
            {PROVINCES.map((prov) => (
              <option key={prov} value={prov}>{prov}</option>
            ))}
          </select>
          {errors.province && <span className="error">{errors.province.message}</span>}

          <label htmlFor="observations">Observaciones:</label>
          <textarea
            id="observations"
            rows="5"
            placeholder="Dejanos una observación para tu usuario"
            {...register('observations')}
          />

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Enviando...' : 'Enviar Registro'}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Register;
