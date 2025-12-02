import React, { useState, useMemo } from "react";
import AdminHeader from "../components/AdminHeader";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import {
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productServices";
import { useProducts } from "../context/ProductContext";

const CATEGORY_BASE_OPTIONS = [
  "Frutas",
  "Verduras",
  "Carnes",
  "Pescados",
  "Congelados",
  "Aseo",
  "Dulces",
  "Bebestibles",
  "Panadería",
  "Lácteos",
];

const initialState = {
  nombre: "",
  descripcion: "",
  precio: 0,
  categoria: "Frutas",
  stock: 0,
  imagenUrl: "",
  activo: true,
  nuevaCategoria: "",

  proveedorNombre: "",
  loteCodigo: "",
  loteFechaFabricacion: "",
  loteFechaVencimiento: "",
  iva: 19,
};
const STOCK_CRITICO_UMBRAL = 5;
const DIAS_POR_VENCER = 7;

function esStockCritico(stock) {
  return typeof stock === "number" && stock <= STOCK_CRITICO_UMBRAL;
}

function obtenerEstadoLote(producto) {
  if (!producto.loteFechaVencimiento) {
    return { tipo: "sin_lote", etiqueta: "Sin fecha", badgeClass: "bg-secondary-subtle text-secondary" };
  }

  const hoy = new Date();
  const venc = new Date(producto.loteFechaVencimiento);
  venc.setHours(0, 0, 0, 0);
  hoy.setHours(0, 0, 0, 0);

  if (venc < hoy) {
    return { tipo: "vencido", etiqueta: "Vencido", badgeClass: "bg-danger-subtle text-danger" };
  }

  const diffMs = venc.getTime() - hoy.getTime();
  const diffDias = diffMs / (1000 * 60 * 60 * 24);

  if (diffDias <= DIAS_POR_VENCER) {
    return { tipo: "por_vencer", etiqueta: "Por vencer", badgeClass: "bg-warning-subtle text-warning" };
  }

  return { tipo: "ok", etiqueta: "Vigente", badgeClass: "bg-success-subtle text-success" };
}

function ProductsList() {
  const { products, loading, error, refreshProducts } = useProducts();

  const [feedback, setFeedback] = useState({ message: "", type: "" });

  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState(initialState);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Todas");

  const categoryOptions = useMemo(() => {
    const set = new Set(CATEGORY_BASE_OPTIONS);
    products.forEach((p) => {
      if (p.categoria) set.add(p.categoria);
    });
    return Array.from(set).sort();
  }, [products]);

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    setFormData(initialState);
  };

  const handleShowModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        nombre: product.nombre || "",
        descripcion: product.descripcion || "",
        precio: product.precio || 0,
        categoria: product.categoria || "Frutas",
        stock: product.stock ?? 0,
        imagenUrl: product.imagenUrl || "",
        activo: product.activo ?? true,
        nuevaCategoria: "",

        proveedorNombre: product.proveedorNombre || "",
        loteCodigo: product.loteCodigo || "",
        loteFechaFabricacion: product.loteFechaFabricacion || "",
        loteFechaVencimiento: product.loteFechaVencimiento || "",
        iva: product.iva ?? 19,
      });
    } else {
      setEditingProduct(null);
      setFormData(initialState);
    }
    setShowModal(true);
    setFeedback({ message: "", type: "" });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "precio" || name === "stock" || name === "iva"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback({ message: "", type: "" });

    try {
      if (!formData.nombre || !formData.categoria) {
        throw new Error("El nombre y la categoría son obligatorios.");
      }

      if (formData.stock < 0) {
        throw new Error("El stock no puede ser negativo.");
      }

      if (formData.precio < 0) {
        throw new Error("El precio no puede ser negativo.");
      }

      let categoriaFinal = formData.categoria;
      if (formData.nuevaCategoria.trim() !== "") {
        categoriaFinal = formData.nuevaCategoria.trim();
      }

      const payload = {
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        precio: formData.precio,
        categoria: categoriaFinal,
        stock: formData.stock,
        imagenUrl: formData.imagenUrl,
        activo: formData.activo,

        proveedorNombre: formData.proveedorNombre || null,
        loteCodigo: formData.loteCodigo || null,
        loteFechaFabricacion: formData.loteFechaFabricacion || null,
        loteFechaVencimiento: formData.loteFechaVencimiento || null,
        iva: formData.iva ?? 19,
      };

      if (editingProduct) {
        await updateProduct({ ...payload, id: editingProduct.id});
        setFeedback({
          message: "Producto actualizado correctamente.",
          type: "success",
        });
      } else {
        await createProduct(payload);
        setFeedback({
          message: "Producto creado correctamente.",
          type: "success",
        });
      }

      await refreshProducts();
      handleCloseModal();
    } catch (err) {
      console.error(err);
      setFeedback({
        message: err.message || "Ocurrió un error al guardar el producto.",
        type: "danger",
      });
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm("¿Seguro que deseas eliminar este producto?")) {
      return;
    }
    try {
      await deleteProduct(productId);
      setFeedback({
        message: "Producto eliminado correctamente.",
        type: "success",
      });
      await refreshProducts();
    } catch (err) {
      console.error(err);
      setFeedback({
        message: err.message || "Ocurrió un error al eliminar el producto.",
        type: "danger",
      });
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const term = searchTerm.toLowerCase();
      const matchesSearch =
        p.nombre?.toLowerCase().includes(term) ||
        p.descripcion?.toLowerCase().includes(term) ||
        p.categoria?.toLowerCase().includes(term) ||
        p.proveedorNombre?.toLowerCase().includes(term);

      const matchesCategory =
        categoryFilter === "Todas" || p.categoria === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, categoryFilter]);

  return (
    <div className="bg-light min-vh-100">
      <AdminHeader />

      <div className="container py-4 py-md-5">
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
          <div>
            <h1 className="h3 fw-bold mb-1">Gestión de Productos</h1>
            <p className="text-muted mb-0">
              Administra el catálogo, stock, proveedor, lote e IVA de tus productos.
            </p>
          </div>
          <Button variant="success" onClick={() => handleShowModal()}>
            <i className="bi bi-plus-circle me-2"></i>
            Nuevo producto
          </Button>
        </div>
        <div className="small text-muted mb-2">
          <span className="me-3">
            <span className="badge bg-warning-subtle text-warning me-1">●</span>
            Stock crítico (≤ {STOCK_CRITICO_UMBRAL})
          </span>
          <span className="me-3">
            <span className="badge bg-warning-subtle text-warning me-1">●</span>
            Lote por vencer (≤ {DIAS_POR_VENCER} días)
          </span>
          <span>
            <span className="badge bg-danger-subtle text-danger me-1">●</span>
            Lote vencido
          </span>
        </div>

        {feedback.message && (
          <div className={`alert alert-${feedback.type}`} role="alert">
            {feedback.message}
          </div>
        )}

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <div className="card shadow-sm border-0 mb-4">
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-6 col-lg-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar por nombre, categoría o proveedor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="col-md-4 col-lg-3">
                <select
                  className="form-select"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="Todas">Todas las categorías</option>
                  {categoryOptions.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-2 d-flex align-items-center">
                <span className="text-muted small">
                  {filteredProducts.length} productos
                </span>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <p className="text-center text-muted">Cargando productos...</p>
        ) : (
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th></th>
                  <th>Nombre</th>
                  <th>Categoría</th>
                  <th>Proveedor</th>
                  <th>Lote</th>
                  <th>Stock</th>
                  <th>Precio</th>
                  <th>IVA</th>
                  <th>Estado</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((p) => {
                  const stockCritico = esStockCritico(p.stock);
                  const loteEstado = obtenerEstadoLote(p);

                  const rowClass =
                    loteEstado.tipo === "vencido"
                      ? "table-danger"
                      : stockCritico || loteEstado.tipo === "por_vencer"
                      ? "table-warning"
                      : "";
                      return (
                      <tr key={p.id} className={rowClass}>
                        <td className="fw-bold text-muted">#{p.id}</td>
                        <td>{p.nombre}</td>
                        <td>{p.categoria}</td>
                        <td>{p.proveedorNombre || "—"}</td>
                  
                      <td>
                        {p.loteCodigo ? (
                          <>
                            <div className="small fw-semibold">{p.loteCodigo}</div>
                            <div className="small text-muted">
                              Vence: {p.loteFechaVencimiento || "—"}
                            </div>
                            <span className={`badge mt-1 ${loteEstado.badgeClass}`}>
                              {loteEstado.etiqueta}
                            </span>
                          </>
                        ) : (
                          <span className="text-muted small">—</span>
                        )}
                      </td>
                      <td>{p.stock}</td>
                      <td>
                        ${Number(p.precio || 0).toLocaleString("es-CL")}
                      </td>
                      <td>{p.iva != null ? `${p.iva}%` : "—"}</td>
                      <td>
                        {p.activo ? (
                          <span className="badge bg-success">Activo</span>
                        ) : (
                          <span className="badge bg-secondary">Inactivo</span>
                        )}
                      </td>
                      <td className="text-end">
                        <Button
                          variant="outline-success"
                          size="sm"
                          className="me-2"
                          onClick={() => handleShowModal(p)}
                        >
                          Editar
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDelete(p.id)}
                        >
                          Eliminar
                        </Button>
                      </td>
                    </tr>
                  );
                })}
                {filteredProducts.length === 0 && (
                  <tr>
                    <td colSpan="9" className="text-center text-muted py-4">
                      No se encontraron productos.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingProduct ? "Editar producto" : "Nuevo producto"}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row className="mb-3">
              <Col md={8}>
                <Form.Group>
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Precio (CLP)</Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    step="10"
                    name="precio"
                    value={formData.precio}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
              />
            </Form.Group>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Categoría</Form.Label>
                  <Form.Select
                    name="categoria"
                    value={formData.categoria}
                    onChange={handleChange}
                  >
                    {categoryOptions.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                    <option value="">— Nueva categoría —</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Nueva categoría (opcional)</Form.Label>
                  <Form.Control
                    type="text"
                    name="nuevaCategoria"
                    value={formData.nuevaCategoria}
                    onChange={handleChange}
                    placeholder="Ej: Verduras orgánicas"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Stock</Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>IVA (%)</Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    max="100"
                    name="iva"
                    value={formData.iva}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Estado</Form.Label>
                  <Form.Check
                    type="switch"
                    id="activo-switch"
                    label={formData.activo ? "Activo" : "Inactivo"}
                    name="activo"
                    checked={formData.activo}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Proveedor</Form.Label>
                  <Form.Control
                    type="text"
                    name="proveedorNombre"
                    value={formData.proveedorNombre}
                    onChange={handleChange}
                    placeholder="Ej: Agrosuper"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Imagen (archivo o URL)</Form.Label>
                  <Form.Control
                    type="text"
                    name="imagenUrl"
                    value={formData.imagenUrl}
                    onChange={handleChange}
                    placeholder="Ej: pollo.png o https://..."
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Código de lote</Form.Label>
                  <Form.Control
                    type="text"
                    name="loteCodigo"
                    value={formData.loteCodigo}
                    onChange={handleChange}
                    placeholder="Ej: L2024-11-001"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Fecha fabricación</Form.Label>
                  <Form.Control
                    type="date"
                    name="loteFechaFabricacion"
                    value={formData.loteFechaFabricacion}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Fecha vencimiento</Form.Label>
                  <Form.Control
                    type="date"
                    name="loteFechaVencimiento"
                    value={formData.loteFechaVencimiento}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button variant="success" type="submit">
              {editingProduct ? "Guardar cambios" : "Crear producto"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default ProductsList;
