<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../services/productServices';
import AdminHeader from './AdminHeader';

function ProductsList() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProductos(data);
      } catch (error) {
        console.error("Error al cargar los productos:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

=======
import React, { useState } from 'react';
// 🟢 IMPORTANTE: Necesitas importar AdminHeader aquí para que aparezca en el panel
import AdminHeader from './AdminHeader';
import { initialProducts } from '../data';

function ProductsList() {
  // 🟢 Listos para la API: Cambiar initialProducts por estado vacío [] cuando se use fetch
  const [productos, setProductos] = useState(initialProducts);

>>>>>>> f77728c43aaa4fbe583282363bc9707c467b9dc9
  const handleEdit = (id) => {
    console.log(`Editar producto con ID: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Eliminar producto con ID: ${id}`);
<<<<<<< HEAD
  };
    
  return (
    <div className="bg-light min-vh-100">
      <AdminHeader />
=======
    // Ejemplo de eliminación local:
    // setProductos(productos.filter(p => p.id !== id));
  };
    
  return (
    <div className="bg-light min-vh-100"> 
      {/* 🟢 Incluimos el encabezado de Admin */}
      <AdminHeader /> 
>>>>>>> f77728c43aaa4fbe583282363bc9707c467b9dc9
      
      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="fw-normal display-5">Administración de Productos</h1>
          <button className="btn btn-success">
             <i className="bi bi-plus-circle me-2"></i>
            Agregar Producto
          </button>
        </div>

<<<<<<< HEAD
        {loading ? (
          <div className="text-center p-5">
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="mt-2">Cargando productos...</p>
          </div>
        ) : (
          <div className="card shadow-sm border-0">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0 align-middle">
                  <thead>
                    <tr className="table-light"> 
                      <th scope="col" className="p-3">ID</th>
                      <th scope="col" className="p-3">Nombre</th>
                      <th scope="col" className="p-3">Precio</th>
                      <th scope="col" className="p-3">Stock</th>
                      <th scope="col" className="p-3">Lote</th>
                      <th scope="col" className="p-3">Expiración</th>
                      <th scope="col" className="p-3">Proveedor</th>
                      <th scope="col" className="p-3 text-center">Acciones</th>
=======
        <div className="card shadow-sm border-0">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead>
                  <tr className="bg-primary bg-opacity-10"> 
                    <th scope="col" className="p-3">ID</th>
                    <th scope="col" className="p-3">Imagen</th>
                    <th scope="col" className="p-3">Nombre</th>
                    <th scope="col" className="p-3">Categoría</th>
                    <th scope="col" className="p-3">Precio</th>
                    <th scope="col" className="p-3">Precio Original</th>
                    <th scope="col" className="p-3 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map(producto => (
                    <tr key={producto.id}>
                      <td className="p-3">{producto.id}</td>
                      <td className="p-3">
                        <img src={`/images/${producto.image}`} alt={producto.name} style={{ width: '50px', height: '50px', objectFit: 'cover' }} className="rounded" />
                      </td>
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
>>>>>>> f77728c43aaa4fbe583282363bc9707c467b9dc9
                    </tr>
                  </thead>
                  <tbody>
                    {productos.map((producto) => (
                      <tr key={producto.id}>
                        <td className="p-3 fw-bold">{producto.id}</td>
                        <td className="p-3">{producto.name}</td>
                        <td className="p-3 text-success">${producto.price.toLocaleString('es-CL')}</td> 
                        <td className="p-3">{producto.stock}</td>
                        <td className="p-3">{producto.batch}</td>
                        <td className="p-3">{producto.expiryDate}</td>
                        <td className="p-3">{producto.supplier}</td>
                        <td className="p-3 text-center">
                          <button 
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={() => handleEdit(producto.id)}
                          >
                             <i className="bi bi-pencil-fill"></i>
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(producto.id)}
                          >
                            <i className="bi bi-trash-fill"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductsList;