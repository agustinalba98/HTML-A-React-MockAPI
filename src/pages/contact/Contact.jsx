import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import './Contact.css';

function Contact() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    function onSubmit(data) {
        console.log('Mensaje de contacto:', data);
        Swal.fire({
            icon: 'success',
            title: 'Mensaje enviado',
            text: `Gracias ${data.nombre}, te responderemos a la brevedad.`,
        });
        reset();
    }

    return (
        <section className="contact">
            <h1>Contacto</h1>
            <p>
                Escribinos para consultar por productos personalizados, presupuestos o pedidos
                especiales. También atendemos empresas.
            </p>

            <div className="contact-layout">
                <div className="contact-form">
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <label htmlFor="nombre">Nombre completo:</label>
                        <input
                            type="text"
                            placeholder="Juan Pérez"
                            id="nombre"
                            {...register('nombre', { required: 'El nombre es obligatorio' })}
                        />
                        {errors.nombre && <span className="error">{errors.nombre.message}</span>}

                        <label htmlFor="email">Correo electrónico:</label>
                        <input
                            type="email"
                            placeholder="ejemplo@mail.com"
                            id="email"
                            {...register('email', {
                                required: 'El email es obligatorio',
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: 'Ingresá un email válido',
                                },
                            })}
                        />
                        {errors.email && <span className="error">{errors.email.message}</span>}

                        <label htmlFor="mensaje">Mensaje:</label>
                        <textarea
                            id="mensaje"
                            placeholder="Escribí tu consulta o mensaje..."
                            rows="8"
                            {...register('mensaje', {
                                required: 'El mensaje es obligatorio',
                                minLength: { value: 20, message: 'Mínimo 20 caracteres' },
                                maxLength: { value: 1000, message: 'Máximo 1000 caracteres' },
                            })}
                        />
                        {errors.mensaje && <span className="error">{errors.mensaje.message}</span>}

                        <button type="submit">Enviar</button>
                    </form>
                </div>

                <div className="contact-map">
                    <iframe
                        title="Mapa Bendito Arte"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3285.1006952783246!2d-58.59066088779045!3d-34.57631857285138!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb9b573406931%3A0x26575ee3d82b58d4!2sMart%C3%ADn%20Fierro%207577%2C%20B1682%20Villa%20Bosch%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1780855673628!5m2!1ses-419!2sar"
                        width="600"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </div>

            <div className="contact-cards">
                <article className="contact-card">
                    <FontAwesomeIcon icon={faPhone} size="xl" />
                    <h3>Teléfono</h3>
                    <p>+54 9 11 2621-6111</p>
                </article>
                <article className="contact-card">
                    <FontAwesomeIcon icon={faClock} size="xl" />
                    <h3>Horario de atención</h3>
                    <p>Lunes a viernes de 9:00 a 21:00 hs</p>
                </article>
                <article className="contact-card">
                    <FontAwesomeIcon icon={faLocationDot} size="xl" />
                    <h3>Ubicación</h3>
                    <p>Villa Bosch, Buenos Aires</p>
                </article>
            </div>
        </section>
    );
}

export default Contact;
