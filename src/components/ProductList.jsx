import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminHeader from "./AdminHeader";

function ProductsList() {
  const [productos, setProductos] = useState([]);

  // Cargar productos desde data.json
  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const response = await axios.get("/data/data.json");
        setProductos(response.data.products || []);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    };

    cargarProductos();
  }, []);

  const handleEdit = (id) => {
    console.log(`[ACTION] Editar producto con ID: ${id}`);
    // Aquí iría la lógica real del modal/formulario de edición
  };

  const handleDelete = (id) => {
    if (window.confirm(`¿Estás seguro de eliminar el producto ${id}?`)) {
      setProductos(productos.filter((p) => p.id !== id));
      console.log(`[ACTION] Producto con ID ${id} eliminado.`);
    }
  };

  return (
    <div className="bg-light min-vh-100">
      <AdminHeader />

      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="fw-normal display-5">Administración de Productos</h1>
          <button
            className="btn btn-success btn-lg"
            onClick={() => console.log("Abrir formulario de adición")}
          >
            <i className="bi bi-plus-lg me-2"></i>
            Agregar Producto
          </button>
        </div>

        <div className="card shadow-sm border-0">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-striped table-hover mb-0">
                <thead>
                  <tr className="bg-success text-white">
                    <th className="p-3">ID</th>
                    <th className="p-3">Nombre</th>
                    <th className="p-3">Precio</th>
                    <th className="p-3">Stock</th>
                    <th className="p-3">Lote</th>
                    <th className="p-3">Expiración</th>
                    <th className="p-3">Proveedor</th>
                    <th className="p-3 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="text-center py-4 text-muted">
                        No hay productos disponibles.
                      </td>
                    </tr>
                  ) : (
                    productos.map((producto) => (
                      <tr key={producto.id}>
                        <td className="p-3 text-muted">{producto.id}</td>
                        <td className="p-3 fw-semibold">{producto.name}</td>
                        <td className="p-3 text-success fw-bold">
                          ${producto.price.toLocaleString("es-CL")}
                        </td>
                        <td className="p-3">{producto.stock} uds.</td>
                        <td className="p-3 text-info">{producto.lote}</td>
                        <td className="p-3">{producto.expiracion}</td>
                        <td className="p-3">{producto.proveedor}</td>

                        <td className="p-3 text-center">
                          <button
                            className="btn btn-sm me-2 fw-bold"
                            style={{
                              borderColor: "#ffc107",
                              color: "#ffc107",
                              backgroundColor: "rgba(255, 193, 7, 0.1)",
                            }}
                            onClick={() => handleEdit(producto.id)}
                          >
                            Editar
                          </button>

                          <button
                            className="btn btn-sm fw-bold"
                            style={{
                              borderColor: "#dc3545",
                              color: "#dc3545",
                              backgroundColor: "rgba(220, 53, 69, 0.1)",
                            }}
                            onClick={() => handleDelete(producto.id)}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
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
