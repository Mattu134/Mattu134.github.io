import React, { useState, useEffect } from "react";
import AdminHeader from "./AdminHeader";
import { fetchProducts } from "../services/productServices";

function ProductsList() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProductos(data);
      } catch (error) {
        console.error("Error al cargar productos en admin:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarProductos();
  }, []);

  const handleEdit = (id) => {
    console.log(`[ACTION] Editar producto con ID: ${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm(`¿Estás seguro de eliminar el producto ${id}?`)) {
      setProductos((prev) => prev.filter((p) => p.id !== id));
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
            {loading ? (
              <p className="text-center py-4">Cargando productos...</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-striped table-hover mb-0">
                  <thead>
                    <tr className="bg-success text-white">
                      <th scope="col" className="p-3">
                        ID
                      </th>
                      <th scope="col" className="p-3">
                        Nombre
                      </th>
                      <th scope="col" className="p-3">
                        Precio
                      </th>
                      <th scope="col" className="p-3">
                        Stock
                      </th>
                      <th scope="col" className="p-3">
                        Lote
                      </th>
                      <th scope="col" className="p-3">
                        Expiración
                      </th>
                      <th scope="col" className="p-3">
                        Proveedor
                      </th>
                      <th scope="col" className="p-3 text-center">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {productos.map((producto) => (
                      <tr key={producto.id}>
                        <th scope="row" className="p-3 text-muted">
                          {producto.id}
                        </th>
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
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsList;
