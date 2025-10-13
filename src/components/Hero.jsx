import React from 'react';
const Hero = () => {
  return (
    <section id="hero" className="carousel slide carousel-fade position-relative" data-bs-ride="carousel" data-bs-interval="5000">
      <div className="carousel-inner">
        
        {/* Item 1 */}
        <div className="carousel-item active">
          <img src="/images/VerdurasYfrutas.jpg" className="d-block w-100" style={{ height: '70vh', objectFit: 'cover' }} alt="Alimentos frescos" />
          
          <div className="carousel-caption h-100 d-flex flex-column justify-content-center align-items-center">
            <div className="glass-caption rounded p-4 text-center text-white">
              <h1 className="fw-bold display-5">Alimentos frescos y naturales</h1>
              <p className="lead mb-0">Compra saludable y recibe lo mejor a tu mesa.</p>
            </div>
          </div>
          
        </div>

        {/* Item 2 */}
        <div className="carousel-item">
          <img src="/images/CARROSUPER.jpg" className="d-block w-100" style={{ height: '70vh', objectFit: 'cover' }} alt="Carro de supermercado" />
          
          <div className="carousel-caption h-100 d-flex flex-column justify-content-center align-items-center">
            <div className="glass-caption rounded p-4 text-center text-white">
              <h1 className="fw-bold display-5">Productos de calidad</h1>
              <p className="lead mb-0">Encuentra todo lo que necesitas en EcoMarket.</p>
            </div>
          </div>
          
        </div>

        {/* Item 3 */}
        <div className="carousel-item">
          <img src="/images/Cesta.jpeg" className="d-block w-100" style={{ height: '70vh', objectFit: 'cover' }} alt="Tienda interior" />
          
          <div className="carousel-caption h-100 d-flex flex-column justify-content-center align-items-center">
            <div className="glass-caption rounded p-4 text-center text-white">
              <h1 className="fw-bold display-5">Ofertas imperdibles</h1>
              <p className="lead mb-0">Aprovecha precios especiales cada semana.</p>
            </div>
          </div>
          
        </div>
      </div>

      <button className="carousel-control-prev" type="button" data-bs-target="#hero" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Anterior</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#hero" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Siguiente</span>
      </button>
    </section>
  );
};

export default Hero;