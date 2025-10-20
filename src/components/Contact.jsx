<<<<<<< HEAD
import * as bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React from 'react'; // Importar React explícitamente

const Contact = () => {
  
  /**
   * Muestra un modal de alerta personalizado con el mensaje dado.
   * Depende de la estructura de DOM inyectada en el body.
   * @param {string} message - El mensaje a mostrar en el modal.
   */
  const showAlert = (message) => {
    const modalElement = document.getElementById('customAlertModal');
    if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        const modalMessage = document.getElementById('customAlertModalMessage');
        
        if (modalMessage) {
            modalMessage.textContent = message;
        }
        modal.show();
    }
  };
=======
import React, { useState } from 'react';
>>>>>>> f77728c43aaa4fbe583282363bc9707c467b9dc9

const Contact = () => {
  const [alert, setAlert] = useState({ message: '', type: '' });
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone, message } = formData;

    if (!name || !email || !phone || !message) {
      setAlert({ message: 'Por favor completa todos los campos.', type: 'alert-warning' });
      return;
    }

    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$/i;
    if (!emailRegex.test(email)) {
      setAlert({ message: 'El correo electrónico ingresado no es válido.', type: 'alert-warning' });
      return;
    }

<<<<<<< HEAD
  
    const phoneRegex = /^[0-9+\-\s]{6,15}$/;
=======
    const phoneRegex = /^[0-9+\-\\s]{6,15}$/;
>>>>>>> f77728c43aaa4fbe583282363bc9707c467b9dc9
    if (!phoneRegex.test(phone)) {
      setAlert({ message: 'El número de teléfono no es válido.', type: 'alert-warning' });
      return;
    }

<<<<<<< HEAD
 
    showAlert(`Datos enviados correctamente. ¡Gracias ${name}!`);
    form.reset();
=======
    // Lógica de envío de datos a un servidor aquí (fetch/axios)

    setAlert({ message: `Datos enviados correctamente. ¡Gracias ${name}!`, type: 'alert-success' });
    setFormData({ name: '', email: '', phone: '', message: '' });

>>>>>>> f77728c43aaa4fbe583282363bc9707c467b9dc9
  };

  return (
    <section id="contacto" className="container my-5">
      <h2 className="text-center fw-bold text-success mb-4">Contáctanos</h2>
      
      {/* Renderizado de la alerta con estado de React */}
      {alert.message && (
        <div className={`alert ${alert.type} mx-auto mb-4`} role="alert" style={{ maxWidth: '600px' }}>
          {alert.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white shadow p-4 rounded mx-auto" style={{ maxWidth: '600px' }} id="contact-form">
        
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label fw-semibold">Nombre</label>
          <input type="text" id="nombre" name="name" className="form-control" placeholder="Tu nombre" required value={formData.name} onChange={handleChange} />
        </div>
        
        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-semibold">Correo electrónico</label>
          <input type="email" id="email" name="email" className="form-control" placeholder="@gmail.com" required value={formData.email} onChange={handleChange} />
        </div>
        
        <div className="mb-3">
          <label htmlFor="telefono" className="form-label fw-semibold">Número de teléfono</label>
          <input type="tel" id="telefono" name="phone" className="form-control" placeholder="+56 9 1234 5678" required value={formData.phone} onChange={handleChange} />
        </div>
<<<<<<< HEAD
        
        <button type="submit" className="btn btn-success w-100 fw-semibold">Enviar</button>
=======
        <div className="mb-3">
          <label htmlFor="mensaje" className="form-label fw-semibold">Mensaje</label>
          <textarea id="mensaje" name="message" className="form-control" rows="4" placeholder="Escribe tu consulta aquí..." required value={formData.message} onChange={handleChange}></textarea>
        </div>
        <button type="submit" className="btn btn-success w-100">Enviar Mensaje</button>
>>>>>>> f77728c43aaa4fbe583282363bc9707c467b9dc9
      </form>
    </section>
  );
};

export default Contact;