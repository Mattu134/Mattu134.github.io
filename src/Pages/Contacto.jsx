import React, { useState } from "react";

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí Se puede enviar a la API
    console.log("Formulario de contacto:", formData);
    setEnviado(true);
    setFormData({ nombre: "", email: "", mensaje: "" });
  };

  return (
    <div className="container py-5" id="contacto">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <section className="bg-white shadow-sm rounded-4 p-4 p-md-5">
            <h1 className="fw-bold text-success mb-3 text-center">
              Contáctenos
            </h1>
            <p className="text-muted text-center mb-4">
              ¿Tienes dudas, sugerencias o quieres más información sobre EcoMarket?
              Completa el formulario o contáctanos directamente.
            </p>

            {/* Datos de contacto */}
            <div className="row mb-4 text-center text-md-start">
              <div className="col-md-6 mb-3 mb-md-0">
                <h5 className="fw-semibold mb-1">
                  <i className="bi bi-telephone text-success me-2"></i>
                  Teléfono
                </h5>
                <p className="mb-0">+56 9 1234 5678</p>
              </div>
              <div className="col-md-6">
                <h5 className="fw-semibold mb-1">
                  <i className="bi bi-envelope text-success me-2"></i>
                  Correo electrónico
                </h5>
                <p className="mb-0">ecomarket@contacto.cl</p>
              </div>
            </div>

            <hr className="my-4" />
            <form onSubmit={handleSubmit} className="mt-3">
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label fw-semibold">
                  Nombre
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  className="form-control"
                  placeholder="Ingresa tu nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-semibold">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  placeholder="tucorreo@ejemplo.cl"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="mensaje" className="form-label fw-semibold">
                  Mensaje
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  className="form-control"
                  rows="4"
                  placeholder="Escribe tu mensaje..."
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                />
              </div>

              {enviado && (
                <div className="alert alert-success py-2">
                  ¡Gracias por contactarte con nosotros! Te responderemos pronto.
                </div>
              )}

              <button type="submit" className="btn btn-success w-100 fw-semibold">
                Enviar mensaje
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Contacto;
