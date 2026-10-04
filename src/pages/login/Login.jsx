import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import './Login.css';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    // En esta entrega no se autentica contra API real: solo se muestra por consola.
    console.log('Datos de login:', data);
  }

  return (
    <section className="login">
      <h1><FontAwesomeIcon icon={faRightToBracket} /> Iniciar sesión</h1>
      <p>Ingresá con tu email y contraseña. En la próxima entrega este formulario se conectará al backend con JWT.</p>

      <div className="login-form">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
            placeholder="Tu contraseña"
            {...register('password', {
              required: 'La contraseña es obligatoria',
              minLength: { value: 6, message: 'Mínimo 6 caracteres' },
            })}
          />
          {errors.password && <span className="error">{errors.password.message}</span>}

          <button type="submit">Ingresar</button>
        </form>
      </div>
    </section>
  );
}

export default Login;
