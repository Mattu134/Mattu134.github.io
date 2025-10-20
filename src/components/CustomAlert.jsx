import React from 'react';

const CustomAlert = () => {
  return (
    <div 
        className="modal fade" 
        id="customAlertModal" 
        tabIndex="-1" 
        aria-labelledby="customAlertModalLabel" 
        aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg">
          <div className="modal-header bg-success text-white border-0">
            <h5 className="modal-title" id="customAlertModalLabel">Notificación</h5>
            <button 
              type="button" 
              className="btn-close btn-close-white" 
              data-bs-dismiss="modal" 
              aria-label="Cerrar"
            ></button>
          </div>
          <div className="modal-body text-center py-4">
            <p id="customAlertModalMessage" className="lead mb-0 fw-semibold">
                Mensaje de Alerta
            </p>
          </div>
          <div className="modal-footer border-0">
            <button 
              type="button" 
              className="btn btn-secondary" 
              data-bs-dismiss="modal"
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomAlert;
