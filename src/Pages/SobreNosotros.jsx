
import React from 'react';

const SobreNosotros = () => {
  return (
    <>
      <section className="container py-5">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6 mb-4">
                <h1 className="fw-bold text-success mb-4">Nuestra Historia</h1>
                <p className="lead">
                  EcoMarket nace de la pasión por los alimentos saludables y el compromiso con la sostenibilidad. 
                  Creemos que lo que comemos tiene un impacto directo en nuestra vida y en el planeta. Por eso, 
                  seleccionamos cuidadosamente cada producto para ofrecerte frescura y calidad garantizada.
                </p>
                <p>
                  Desde el inicio, nuestro objetivo ha sido conectar a los consumidores con productores locales que comparten 
                  nuestros valores. Todo lo que ofrecemos está pensado para entregar sabor, frescura y bienestar.
                </p>
              </div>
              <div className="col-md-6 text-center">
                {}
                <img src="/images/fruta.jpg" alt="Frutas frescas" className="img-fluid rounded shadow-sm" />
              </div>
            </div>
          </div>
      </section>

      <section className="py-5 bg-light">
          <div className="container">
            <div className="row text-center">
              <div className="col-md-6 mb-4">
                <div className="p-4 bg-white rounded shadow-sm h-100">
                  <h2 className="fw-bold text-success">Misión</h2>
                  <p>
                    Proveer alimentos saludables y frescos que mejoren la calidad de vida de nuestros clientes,
                    apoyando a productores locales y fomentando un consumo responsable.
                  </p>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="p-4 bg-white rounded shadow-sm h-100">
                  <h2 className="fw-bold text-success">Visión</h2>
                  <p>
                    Ser reconocidos como el mercado líder en productos naturales y sostenibles en Chile,
                    contribuyendo a una sociedad más consciente y saludable.
                  </p>
                </div>
              </div>
            </div>
          </div>
      </section>
    </>
  );
};

export default SobreNosotros;