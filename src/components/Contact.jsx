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


  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.nombre.value.trim();
    const email = form.email.value.trim();
    const phone = form.telefono.value.trim();

    if (!name || !email || !phone) {
      showAlert('Por favor completa todos los campos.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!emailRegex.test(email)) {
      showAlert('El correo electrónico ingresado no es válido.');
      return;
    }

  
    const phoneRegex = /^[0-9+\-\s]{6,15}$/;
    if (!phoneRegex.test(phone)) {
      showAlert('El número de teléfono no es válido.');
      return;
    }

 
    showAlert(`Datos enviados correctamente. ¡Gracias ${name}!`);
    form.reset();
  };

  return (
    <section id="contacto" className="container my-5">
      <h2 className="text-center fw-bold text-success mb-4">Contáctanos</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow p-4 rounded mx-auto" style={{ maxWidth: '600px' }} id="contact-form">
        
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label fw-semibold">Nombre</label>
          <input type="text" id="nombre" name="nombre" className="form-control" placeholder="Tu nombre" required />
        </div>
        
        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-semibold">Correo electrónico</label>
          <input type="email" id="email" name="email" className="form-control" placeholder="@gmail.com" required />
        </div>
        
        <div className="mb-3">
          <label htmlFor="telefono" className="form-label fw-semibold">Número de teléfono</label>
          <input type="tel" id="telefono" name="telefono" className="form-control" placeholder="+56" required />
        </div>
        
        <button type="submit" className="btn btn-success w-100 fw-semibold">Enviar</button>
      </form>
    </section>
  );
};

export default Contact;