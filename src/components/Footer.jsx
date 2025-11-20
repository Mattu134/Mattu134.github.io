import React from "react";

const Footer = () => {
  return (
    <footer className="bg-success text-white pt-5 mt-auto">
      <div className="container">
        <div className="row text-center text-md-start">
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold mb-3">EcoMarket</h5>
            <p className="small">
              Tu supermercado online de confianza. Productos frescos,
              precios justos y entrega rápida a tu hogar.
            </p>
          </div>
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold mb-3">Enlaces rápidos</h5>
            <ul className="list-unstyled small">
              <li><a href="/" className="text-white text-decoration-none">Inicio</a></li>
              <li><a href="/ofertas" className="text-white text-decoration-none">Ofertas</a></li>
              <li><a href="/nosotros" className="text-white text-decoration-none">Quiénes somos</a></li>
              <li><a href="/#contacto" className="text-white text-decoration-none">Contacto</a></li>
            </ul>
          </div>
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold mb-3">Síguenos</h5>
            <div className="d-flex justify-content-center justify-content-md-start gap-3">
              <a
                href="#"
                className="text-white fs-4"
                title="Facebook"
              >
                <i className="bi bi-facebook"></i>
              </a>
              <a
                href="#"
                className="text-white fs-4"
                title="Instagram"
              >
                <i className="bi bi-instagram"></i>
              </a>
              <a
                href="#"
                className="text-white fs-4"
                title="WhatsApp"
              >
                <i className="bi bi-whatsapp"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="text-center border-top border-light pt-3 pb-3 mt-3">
          <p className="mb-0 small">
            © {new Date().getFullYear()} EcoMarket SPA — Todos los derechos reservados
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
