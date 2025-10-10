import React, { useState } from 'react';

import { initialProducts } from '../data';

function ProductsList() {
  const [productos, setProductos] = useState(initialProducts);


  const handleEdit = (id) => {
    // Lógica de navegación o modal para editar el producto
    console.log(`Editar producto con ID: ${id}`);
  };

  const handleDelete = (id) => {
    // Lógica para eliminar el producto 
    console.log(`Eliminar producto con ID: ${id}`);
 
  };
    
  return (
    <div className="bg-light min-vh-100"> 
      <div className="container py-5">
        
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="fw-normal display-5">Administración de Productos</h1>
          <button className="btn btn-success btn-lg" onClick={() => console.log('Abrir formulario de adición')}>
            Agregar Producto
          </button>
        </div>

        <div className="card shadow-sm border-0">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead>
                  <tr className="bg-primary bg-opacity-10"> 
                    <th scope="col" className="p-3">ID</th>
                    <th scope="col" className="p-3">Nombre</th>
                    <th scope="col" className="p-3">Categoría</th>
                    <th scope="col" className="p-3">Precio</th>
                    <th scope="col" className="p-3 text-danger">Precio Original</th>
                    <th scope="col" className="p-3 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((producto) => (
                    <tr key={producto.id} className="text-secondary">
                      <td className="p-3 fw-bold">{producto.id}</td>
                      <td className="p-3">{producto.name}</td>
                      <td className="p-3">{producto.category}</td>
                      {/* Precio en clp */}
                      <td className="p-3 fw-bold text-success">${producto.price.toLocaleString('es-CL')}</td> 
                      <td className="p-3 text-danger text-decoration-line-through">${producto.originalPrice.toLocaleString('es-CL')}</td> 
                      <td className="p-3 text-center">
                        <button 
                          className="btn btn-sm me-2 fw-bold"
                          style={{ borderColor: '#ffc107', color: '#ffc107', backgroundColor: 'rgba(255, 193, 7, 0.1)' }}
                          onClick={() => handleEdit(producto.id)}
                        >
                          Editar
                        </button>
                        <button 
                          className="btn btn-sm fw-bold"
                          style={{ borderColor: '#dc3545', color: '#dc3545', backgroundColor: 'rgba(220, 53, 69, 0.1)' }}
                          onClick={() => handleDelete(producto.id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsList;