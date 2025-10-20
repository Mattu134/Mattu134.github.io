import React, { useState, useEffect } from 'react';
import AdminHeader from '../components/AdminHeader';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { fetchProducts, deleteProduct, createProduct, updateProduct } from '../services/productServices';

const initialState = {
  name: '',
  price: 0,
  originalPrice: 0,
  category: 'Frutas',
  image: 'placeholder.png',
  stock: 0,
  expiracion: '',
  lote: '',
  proveedor: ''
};

function ProductsList() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState({ message: '', type: '' });

  // Estados para Modal Agregar
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProductData, setNewProductData] = useState(initialState);

  // Estados para Modal Editar
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const loadProducts = async () => {
    setLoading(true);
    setFeedback({ message: '', type: '' });
    try {
      const data = await fetchProducts();
      setProductos(data);
    } catch (error) {
      console.error('Error al obtener productos:', error);
      setFeedback({ message: 'Error al cargar productos.', type: 'alert-danger' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleFormChange = (e, setter) => {
    const { name, value, type } = e.target;
    const finalValue = (type === 'number' && value !== '') ? parseFloat(value) : value;
    setter(prevData => ({ ...prevData, [name]: finalValue }));
  };

  // --- Funciones Modal Agregar ---
  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setNewProductData(initialState);
  };
  const handleShowAddModal = () => setShowAddModal(true);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newProductData.name || !newProductData.price || !newProductData.stock) {
        setFeedback({ message: 'Nombre, Precio y Stock son requeridos.', type: 'alert-warning' });
        return;
    }
    try {
      setFeedback({ message: 'Agregando producto...', type: 'alert-info' });
      handleCloseAddModal();
      await createProduct(newProductData);
      setFeedback({ message: 'Producto agregado exitosamente.', type: 'alert-success' });
      await loadProducts();
    } catch (error) {
      console.error('Error al agregar producto:', error);
      setFeedback({ message: 'Error al agregar el producto.', type: 'alert-danger' });
    }
  };

  // --- Funciones Modal Editar ---
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditingProduct(null);
  };

  const handleShowEditModal = (id) => {
    const productToEdit = productos.find(p => p.id === id);
    if (productToEdit) {
      setEditingProduct(productToEdit);
      setShowEditModal(true);
    } else {
        setFeedback({ message: 'No se pudo encontrar el producto para editar.', type: 'alert-danger' });
    }
  };

  const handleUpdateProduct = async (e) => {
      e.preventDefault();
      if (!editingProduct) return;

      if (!editingProduct.name || !editingProduct.price || !editingProduct.stock) {
        setFeedback({ message: 'Nombre, Precio y Stock son requeridos.', type: 'alert-warning' });
        return;
      }

      try {
        setFeedback({ message: 'Actualizando producto...', type: 'alert-info' });
        handleCloseEditModal();
        await updateProduct(editingProduct);
        setFeedback({ message: 'Producto actualizado exitosamente.', type: 'alert-success' });
        await loadProducts();
      } catch (error) {
        console.error('Error al actualizar producto:', error);
        setFeedback({ message: 'Error al actualizar el producto.', type: 'alert-danger' });
      }
  };

  // --- Función Borrar ---
  const handleDelete = async (id, name) => {
      if (!window.confirm(`¿Estás seguro de eliminar "${name}"?`)) return;
      try {
        setFeedback({ message: 'Eliminando producto...', type: 'alert-info' });
        await deleteProduct(id);
        setFeedback({ message: 'Producto eliminado exitosamente.', type: 'alert-success' });
        await loadProducts();
      } catch (error) {
        console.error('Error al eliminar producto:', error);
        setFeedback({ message: 'Error al eliminar el producto.', type: 'alert-danger' });
      }
  };

  return (
    <div className="bg-light min-vh-100">
      <AdminHeader />

      <div className="container py-5">

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="fw-normal display-5">Administración de Productos</h1>
          <button className="btn btn-success btn-lg" onClick={handleShowAddModal}>
            <i className="bi bi-plus-lg me-2"></i>
            Agregar Producto
          </button>
        </div>

        {feedback.message && (
            <div className={`alert ${feedback.type} alert-dismissible fade show`} role="alert">
              {feedback.message}
              <button
                type="button"
                className="btn-close"
                onClick={() => setFeedback({ message: '', type: '' })}
                aria-label="Close"
              ></button>
            </div>
        )}

        {loading && (
          <div className="text-center">
            <h1 className="fw-normal display-5">Cargando productos...</h1>
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {!loading && (
          <div className="card shadow-sm border-0">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-striped table-hover mb-0 align-middle">
                  <thead>
                    <tr className="bg-success text-white">
                      <th scope="col" className="p-3">ID</th>
                      <th scope="col" className="p-3">Nombre</th>
                      <th scope="col" className="p-3">Precio</th>
                      <th scope="col" className="p-3">Stock</th>
                      <th scope="col" className="p-3">Lote</th>
                      <th scope="col" className="p-3">Expiración</th>
                      <th scope="col" className="p-3">Proveedor</th>
                      <th scope="col" className="p-3 text-center">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productos.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="text-center text-muted p-4">No hay productos para mostrar.</td>
                      </tr>
                    ) : (
                      productos.map(producto => (
                        <tr key={producto.id}>
                          <th scope="row" className="p-3 text-muted">{producto.id}</th>
                          <td className="p-3 fw-semibold">{producto.name}</td>
                          <td className="p-3 text-success fw-bold">${producto.price.toLocaleString('es-CL')}</td>
                          <td className="p-3">{producto.stock} uds.</td>
                          <td className="p-3 text-info">{producto.lote}</td>
                          <td className="p-3">{producto.expiracion}</td>
                          <td className="p-3">{producto.proveedor}</td>
                          <td className="p-3 text-center">
                            <button
                              className="btn btn-sm me-2 fw-bold"
                              style={{ borderColor: '#ffc107', color: '#ffc107', backgroundColor: 'rgba(255, 193, 7, 0.1)' }}
                              onClick={() => handleShowEditModal(producto.id)}
                            >
                              Editar
                            </button>
                            <button
                              className="btn btn-sm fw-bold"
                              style={{ borderColor: '#dc3545', color: '#dc3545', backgroundColor: 'rgba(220, 53, 69, 0.1)' }}
                              onClick={() => handleDelete(producto.id, producto.name)}
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
        )}
      </div>

      {/* --- MODAL AGREGAR (CON controlId) --- */}
      <Modal show={showAddModal} onHide={handleCloseAddModal} centered size="lg">
          <Modal.Header closeButton><Modal.Title>Agregar Nuevo Producto</Modal.Title></Modal.Header>
          <Form onSubmit={handleAddProduct}>
            <Modal.Body>
              {/* 2. AÑADIMOS controlId A CADA Form.Group */}
              <Form.Group className="mb-3" controlId="addProductName">
                <Form.Label>Nombre del Producto</Form.Label>
                <Form.Control type="text" name="name" value={newProductData.name} onChange={(e) => handleFormChange(e, setNewProductData)} required />
              </Form.Group>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="addProductCategory">
                    <Form.Label>Categoría</Form.Label>
                    <Form.Select name="category" value={newProductData.category} onChange={(e) => handleFormChange(e, setNewProductData)}>
                      <option value="Frutas">Frutas</option>
                      <option value="Verduras">Verduras</option>
                      <option value="Dulces">Dulces</option>
                      <option value="Bebidas">Bebidas</option>
                      <option value="Otros">Otros</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="addProductProvider">
                    <Form.Label>Proveedor</Form.Label>
                    <Form.Control type="text" name="proveedor" value={newProductData.proveedor} onChange={(e) => handleFormChange(e, setNewProductData)} />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="addProductPrice">
                    <Form.Label>Precio de Venta</Form.Label>
                    <Form.Control type="number" name="price" value={newProductData.price} onChange={(e) => handleFormChange(e, setNewProductData)} required min="0" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="addProductOriginalPrice">
                    <Form.Label>Precio Original</Form.Label>
                    <Form.Control type="number" name="originalPrice" value={newProductData.originalPrice} onChange={(e) => handleFormChange(e, setNewProductData)} min="0" />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="addProductStock">
                    <Form.Label>Stock (unidades)</Form.Label>
                    <Form.Control type="number" name="stock" value={newProductData.stock} onChange={(e) => handleFormChange(e, setNewProductData)} required min="0" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="addProductLote">
                    <Form.Label>Lote</Form.Label>
                    <Form.Control type="text" name="lote" value={newProductData.lote} onChange={(e) => handleFormChange(e, setNewProductData)} />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="addProductExpiration">
                    <Form.Label>Fecha Expiración</Form.Label>
                    <Form.Control type="date" name="expiracion" value={newProductData.expiracion} onChange={(e) => handleFormChange(e, setNewProductData)} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="addProductImage">
                    <Form.Label>Nombre Imagen</Form.Label>
                    <Form.Control type="text" name="image" value={newProductData.image} onChange={(e) => handleFormChange(e, setNewProductData)} />
                  </Form.Group>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer><Button variant="secondary" onClick={handleCloseAddModal}>Cancelar</Button><Button variant="success" type="submit">Agregar Producto</Button></Modal.Footer>
          </Form>
      </Modal>

      {/* --- MODAL EDITAR (CON controlId) --- */}
      {editingProduct && (
        <Modal show={showEditModal} onHide={handleCloseEditModal} centered size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Editar Producto: {editingProduct.name}</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleUpdateProduct}>
            <Modal.Body>
              {/* 3. AÑADIMOS controlId A CADA Form.Group */}
              <Form.Group className="mb-3" controlId="editProductName">
                <Form.Label>Nombre del Producto</Form.Label>
                <Form.Control type="text" name="name" value={editingProduct.name} onChange={(e) => handleFormChange(e, setEditingProduct)} required />
              </Form.Group>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="editProductCategory">
                    <Form.Label>Categoría</Form.Label>
                    <Form.Select name="category" value={editingProduct.category} onChange={(e) => handleFormChange(e, setEditingProduct)}>
                      <option value="Frutas">Frutas</option>
                      <option value="Verduras">Verduras</option>
                      <option value="Dulces">Dulces</option>
                      <option value="Bebidas">Bebidas</option>
                      <option value="Otros">Otros</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="editProductProvider">
                    <Form.Label>Proveedor</Form.Label>
                    <Form.Control type="text" name="proveedor" value={editingProduct.proveedor} onChange={(e) => handleFormChange(e, setEditingProduct)} />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="editProductPrice">
                    <Form.Label>Precio de Venta</Form.Label>
                    <Form.Control type="number" name="price" value={editingProduct.price} onChange={(e) => handleFormChange(e, setEditingProduct)} required min="0" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="editProductOriginalPrice">
                    <Form.Label>Precio Original</Form.Label>
                    <Form.Control type="number" name="originalPrice" value={editingProduct.originalPrice || ''} onChange={(e) => handleFormChange(e, setEditingProduct)} min="0" />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="editProductStock">
                    <Form.Label>Stock (unidades)</Form.Label>
                    <Form.Control type="number" name="stock" value={editingProduct.stock} onChange={(e) => handleFormChange(e, setEditingProduct)} required min="0" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="editProductLote">
                    <Form.Label>Lote</Form.Label>
                    <Form.Control type="text" name="lote" value={editingProduct.lote} onChange={(e) => handleFormChange(e, setEditingProduct)} />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="editProductExpiration">
                    <Form.Label>Fecha Expiración</Form.Label>
                    <Form.Control type="date" name="expiracion" value={editingProduct.expiracion} onChange={(e) => handleFormChange(e, setEditingProduct)} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="editProductImage">
                    <Form.Label>Nombre Imagen</Form.Label>
                    <Form.Control type="text" name="image" value={editingProduct.image} onChange={(e) => handleFormChange(e, setEditingProduct)} />
                  </Form.Group>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseEditModal}>Cancelar</Button>
              <Button variant="primary" type="submit">Guardar Cambios</Button>
            </Modal.Footer>
          </Form>
        </Modal>
      )}
    </div>
  );
}

export default ProductsList;