import React, { useState, useEffect } from 'react';
import AdminHeader from '../components/AdminHeader';
import { Modal, Button, Form } from 'react-bootstrap';
// Importa también updateProduct
import { getAllProducts, deleteProduct, createProduct, updateProduct } from '../data'; 

function ProductsList() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState({ message: '', type: '' });

  // Estados para Modal Agregar
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProductData, setNewProductData] = useState({ name: '', category: 'Otros', price: '', originalPrice: '', image: '' });
  
  // --- Estados para Modal Editar ---
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); // Guarda el producto a editar
  // ---------------------------------

  const loadProducts = async () => {
    setLoading(true);
    setFeedback({ message: '', type: '' });
    try {
      const data = await getAllProducts();
      setProductos(data);
    } catch (error) {
      console.error('Error al obtener productos (simulado):', error);
      setFeedback({ message: 'Error al cargar productos.', type: 'alert-danger' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // --- Funciones Modal Agregar ---
  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setNewProductData({ name: '', category: 'Otros', price: '', originalPrice: '', image: '' }); 
  };
  const handleShowAddModal = () => setShowAddModal(true);
  const handleNewProductChange = (e) => {
    const { name, value } = e.target;
    setNewProductData(prevData => ({ ...prevData, [name]: value }));
  };
  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newProductData.name || !newProductData.price || !newProductData.image || !newProductData.category) {
       setFeedback({ message: 'Por favor completa todos los campos requeridos.', type: 'alert-warning' });
       return;
    }
    try {
      setFeedback({ message: 'Agregando producto...', type: 'alert-info' });
      handleCloseAddModal(); 
      const addedProduct = await createProduct(newProductData);
      setProductos(currentProductos => [addedProduct, ...currentProductos]); 
      setFeedback({ message: 'Producto agregado exitosamente.', type: 'alert-success' });
      setTimeout(() => setFeedback({ message: '', type: '' }), 3000);
    } catch (error) {
      console.error('Error al agregar producto (simulado):', error);
      setFeedback({ message: 'Error al agregar el producto.', type: 'alert-danger' });
    }
  };
  // --------------------------------

  // --- Funciones Modal Editar ---
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditingProduct(null); // Limpia el producto en edición
  };

  const handleShowEditModal = (id) => {
    const productToEdit = productos.find(p => p.id === id);
    if (productToEdit) {
      setEditingProduct(productToEdit); // Guarda el producto encontrado
      setShowEditModal(true); // Abre el modal
    } else {
       setFeedback({ message: 'No se pudo encontrar el producto para editar.', type: 'alert-danger' });
    }
  };
  
  const handleEditingProductChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct(prevData => ({
      ...prevData,
      [name]: value 
    }));
  };

  const handleUpdateProduct = async (e) => {
     e.preventDefault();
     if (!editingProduct) return; // Seguridad

     // Validación simple
     if (!editingProduct.name || !editingProduct.price || !editingProduct.image || !editingProduct.category) {
        setFeedback({ message: 'Por favor completa todos los campos requeridos.', type: 'alert-warning' });
        return;
     }

     try {
       setFeedback({ message: 'Actualizando producto...', type: 'alert-info' });
       handleCloseEditModal(); // Cierra modal
       const updatedProd = await updateProduct(editingProduct.id, editingProduct);
       // Actualiza la lista reemplazando el producto editado
       setProductos(currentProductos => 
         currentProductos.map(p => (p.id === updatedProd.id ? updatedProd : p))
       );
       setFeedback({ message: 'Producto actualizado exitosamente.', type: 'alert-success' });
       setTimeout(() => setFeedback({ message: '', type: '' }), 3000);
     } catch (error) {
       console.error('Error al actualizar producto (simulado):', error);
       setFeedback({ message: 'Error al actualizar el producto.', type: 'alert-danger' });
     }
  };
  // -----------------------------

  const handleDelete = async (id) => {
     // ... (igual que antes) ...
     if (!window.confirm('¿Estás seguro de que quieres eliminar este producto?')) return;
     try {
       setFeedback({ message: 'Eliminando producto...', type: 'alert-info' });
       await deleteProduct(id);
       setProductos(currentProductos => currentProductos.filter(p => p.id !== id));
       setFeedback({ message: 'Producto eliminado exitosamente.', type: 'alert-success' });
       setTimeout(() => setFeedback({ message: '', type: '' }), 3000);
     } catch (error) {
       console.error('Error al eliminar producto (simulado):', error);
       setFeedback({ message: 'Error al eliminar el producto. Intenta de nuevo.', type: 'alert-danger' });
     }
  };
      
  return (
    <div className="bg-light min-vh-100">
      <AdminHeader />
      
      <div className="container py-5">
        
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="fw-normal display-5">Administración de Productos</h1>
          <button className="btn btn-success btn-lg" onClick={handleShowAddModal}> 
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

        {loading && <p className="text-center">Cargando productos...</p>}

        {!loading && (
          <div className="card shadow-sm border-0">
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0 align-middle">
                    <thead>
                      <tr className="bg-primary bg-opacity-10">
                        {/* ... (encabezados th) ... */}
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
                      {productos.length === 0 ? (
                        <tr>
                          <td colSpan="7" className="text-center text-muted p-4">No hay productos para mostrar.</td>
                        </tr>
                      ) : (
                        productos.map(producto => (
                          <tr key={producto.id}>
                             {/* ... (celdas td de datos) ... */}
                            <td className="p-3">{producto.id}</td>
                            <td className="p-3">
                              <img src={`/images/${producto.image}`} alt={producto.name} style={{ width: '50px', height: '50px', objectFit: 'cover' }} className="rounded" onError={(e) => { e.target.onerror = null; e.target.src = '/images/placeholder.png'; }} />
                            </td>
                            <td className="p-3">{producto.name}</td>
                            <td className="p-3">{producto.category}</td>
                            <td className="p-3 fw-bold text-success">${producto.price.toLocaleString('es-CL')}</td>
                            <td className="p-3 text-danger text-decoration-line-through">
                               ${(producto.originalPrice && producto.originalPrice > producto.price ? producto.originalPrice : producto.price).toLocaleString('es-CL')}
                            </td>
                            <td className="p-3 text-center">
                              {/* Modifica onClick del botón Editar */}
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
        )}
      </div>

      {/* --- Modal Agregar Producto (Igual que antes) --- */}
      <Modal show={showAddModal} onHide={handleCloseAddModal} centered>
         {/* ... (contenido del modal Agregar sin cambios) ... */}
          <Modal.Header closeButton><Modal.Title>Agregar Nuevo Producto</Modal.Title></Modal.Header>
          <Form onSubmit={handleAddProduct}>
            <Modal.Body>
              <Form.Group className="mb-3"><Form.Label>Nombre</Form.Label><Form.Control type="text" placeholder="Nombre del producto" name="name" value={newProductData.name} onChange={handleNewProductChange} required /></Form.Group>
              <Form.Group className="mb-3"><Form.Label>Categoría</Form.Label><Form.Select name="category" value={newProductData.category} onChange={handleNewProductChange} required><option value="Frutas">Frutas</option><option value="Dulces">Dulces</option><option value="Bebidas">Bebidas</option><option value="Otros">Otros</option></Form.Select></Form.Group>
              <Form.Group className="mb-3"><Form.Label>Precio (Oferta)</Form.Label><Form.Control type="number" placeholder="Ej: 2500" name="price" value={newProductData.price} onChange={handleNewProductChange} required min="0" step="1" /></Form.Group>
              <Form.Group className="mb-3"><Form.Label>Precio Original (Opcional)</Form.Label><Form.Control type="number" placeholder="Ej: 3000 (Si es mayor que Precio)" name="originalPrice" value={newProductData.originalPrice} onChange={handleNewProductChange} min="0" step="1" /></Form.Group>
              <Form.Group className="mb-3"><Form.Label>Nombre Archivo Imagen</Form.Label><Form.Control type="text" placeholder="Ej: manzanaRoja.png (de /public/images/)" name="image" value={newProductData.image} onChange={handleNewProductChange} required /></Form.Group>
            </Modal.Body>
            <Modal.Footer><Button variant="secondary" onClick={handleCloseAddModal}>Cancelar</Button><Button variant="success" type="submit">Agregar Producto</Button></Modal.Footer>
          </Form>
      </Modal>
      {/* ----------------------------------- */}

      {/* --- Modal para Editar Producto --- */}
      {/* Verifica si editingProduct existe antes de renderizar el modal */}
      {editingProduct && ( 
        <Modal show={showEditModal} onHide={handleCloseEditModal} centered>
          <Modal.Header closeButton>
            {/* Muestra el nombre del producto que se está editando */}
            <Modal.Title>Editar Producto: {editingProduct.name}</Modal.Title> 
          </Modal.Header>
          <Form onSubmit={handleUpdateProduct}>
            <Modal.Body>
              {/* Campos pre-rellenados con los datos de editingProduct */}
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Nombre del producto" 
                  name="name" 
                  value={editingProduct.name} 
                  onChange={handleEditingProductChange} 
                  required 
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Categoría</Form.Label>
                <Form.Select 
                  name="category" 
                  value={editingProduct.category} 
                  onChange={handleEditingProductChange}
                  required
                >
                  <option value="Frutas">Frutas</option>
                  <option value="Dulces">Dulces</option>
                  <option value="Bebidas">Bebidas</option>
                  <option value="Otros">Otros</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Precio (Oferta)</Form.Label>
                <Form.Control 
                  type="number" 
                  placeholder="Ej: 2500" 
                  name="price" 
                  value={editingProduct.price} 
                  onChange={handleEditingProductChange} 
                  required 
                  min="0"
                  step="1"
                />
              </Form.Group>
               <Form.Group className="mb-3">
                <Form.Label>Precio Original (Opcional)</Form.Label>
                <Form.Control 
                  type="number" 
                  placeholder="Ej: 3000 (Si es mayor que Precio)" 
                  name="originalPrice" 
                  // Asegúrate de que originalPrice tenga un valor (puede ser string vacío)
                  value={editingProduct.originalPrice || ''} 
                  onChange={handleEditingProductChange} 
                  min="0"
                  step="1"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Nombre Archivo Imagen</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Ej: manzanaRoja.png (de /public/images/)" 
                  name="image" 
                  value={editingProduct.image} 
                  onChange={handleEditingProductChange} 
                  required 
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseEditModal}>
                Cancelar
              </Button>
              <Button variant="primary" type="submit">
                Guardar Cambios
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      )}
      {/* ----------------------------------- */}

    </div> 
  );
}

export default ProductsList;