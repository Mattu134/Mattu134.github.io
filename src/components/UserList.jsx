import React, { useEffect, useMemo, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUserById,
} from "../services/userService";
import regionesComunas from "../data/Regiones-Comunas";

const initialFormState = {
  correo: "",
  contrasena: "",
  nombre: "",
  tipodireccion: "Casa",
  apellidos: "",
  rut: "",
  telefono: "",
  region: "",
  comuna: "",
  direccion: "",
  codigopostal: "",
  rol: "Cliente",
};

function UserList() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ message: "", type: "" });
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [saving, setSaving] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [selectedRegion, setSelectedRegion] = useState("");
  const [filteredComunas, setFilteredComunas] = useState([]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getUsers();
      setUsers(data || []);
    } catch (err) {
      console.error("Error cargando usuarios:", err);
      setError("No se pudieron cargar los usuarios. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    const regionData = regionesComunas.regiones.find(
      (region) => region.nombre === selectedRegion
    );
    if (regionData) {
      setFilteredComunas(regionData.comunas);
    } else {
      setFilteredComunas([]);
    }
    if (
      !selectedRegion ||
      !regionData ||
      !regionData.comunas.includes(formData.comuna)
    ) {
      setFormData((prev) => ({ ...prev, comuna: "" }));
    }
  }, [selectedRegion]);

  const handleOpenCreateModal = () => {
    setEditingUser(null);
    setFormData(initialFormState);
    setFeedback({ message: "", type: "" });
    setSelectedRegion("");
    setShowModal(true);
  };

  const handleOpenEditModal = (user) => {
    setEditingUser(user);
    setFeedback({ message: "", type: "" });

    const regionToEdit = user.region || "";
    setSelectedRegion(regionToEdit);

    setFormData((prev) => ({
      ...prev,
      correo: user.correo || "",
      contrasena: "",
      nombre: user.nombre || "",
      apellidos: user.apellidos || "",
      rut: user.rut || "",
      telefono: user.telefono || "",
      region: regionToEdit,
      comuna: user.comuna || "",
      direccion: user.direccion || "",
      tipodireccion: user.tipodireccion || "Casa",
      codigopostal: user.codigopostal || "",
      rol: user.rol || "Cliente",
    }));

    setShowModal(true);
  };

  const handleCloseModal = () => {
    if (saving) return;
    setShowModal(false);
    setFormData(initialFormState);
    setFeedback({ message: "", type: "" });
    setEditingUser(null);
    setSelectedRegion("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "region") {
      setSelectedRegion(value);
      setFormData((prev) => ({ ...prev, comuna: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFeedback({ message: "", type: "" });

    try {
      if (!formData.nombre.trim() || !formData.apellidos.trim()) {
        throw new Error("El nombre y los apellidos son obligatorios.");
      }
      if (!formData.correo.trim()) {
        throw new Error("El correo es obligatorio.");
      }
      if (!editingUser && !formData.contrasena.trim()) {
        throw new Error("La contraseña es obligatoria al crear un usuario.");
      }
      if(!formData.contrasena.trim().length >=8){
        throw new Error("La contraseña debe tener al menos 8 caracteres.");
      }
      if (!formData.rut.trim()) {
        throw new Error("El RUT es obligatorio.");
      }
      if (!formData.telefono.trim()) {
        throw new Error("El teléfono es obligatorio.");
      }
      if (!formData.region.trim() || !formData.comuna.trim()) {
        throw new Error("La región y la comuna son obligatorias.");
      }
      if (!formData.direccion.trim()) {
        throw new Error("La dirección es obligatoria.");
      }
      if (!formData.tipodireccion.trim()) {
        throw new Error("El tipo de dirección es obligatorio.");
      }
      if (!formData.rol.trim()) {
        throw new Error("El rol es obligatorio.");
      }

      const payload = {
        correo: formData.correo.trim(),
        contrasena: formData.contrasena.trim(),
        nombre: formData.nombre.trim(),
        apellidos: formData.apellidos.trim(),
        rut: formData.rut.trim(),
        telefono: formData.telefono.trim(),
        region: formData.region.trim(),
        comuna: formData.comuna.trim(),
        direccion: formData.direccion.trim(),
        tipodireccion: formData.tipodireccion.trim(),
        codigopostal: formData.codigopostal.trim() || null,
        rol: formData.rol.trim(),
      };

      if (!editingUser) {
        await createUser(payload);
        setFeedback({
          message: "Usuario creado correctamente.",
          type: "success",
        });
      } else {
        const payloadUpdate = {
          nombre: payload.nombre,
          apellidos: payload.apellidos,
          telefono: payload.telefono,
          region: payload.region,
          comuna: payload.comuna,
          direccion: payload.direccion,
          tipodireccion: payload.tipodireccion,
          codigopostal: payload.codigopostal,
          rol: payload.rol,
        };
        await updateUser(editingUser.id, payloadUpdate);
        setFeedback({
          message: "Usuario actualizado correctamente.",
          type: "success",
        });
      }

      await loadUsers();
      handleCloseModal();
    } catch (err) {
      console.error("Error guardando usuario:", err);
      setFeedback({
        message:
          err.message || "Ocurrió un error al guardar el usuario. Intenta nuevamente.",
        type: "danger",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`¿Seguro que deseas eliminar al usuario #${id}?`)) {
      return;
    }

    try {
      await deleteUserById(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
      setFeedback({
        message: `Usuario #${id} eliminado correctamente.`,
        type: "success",
      });
    } catch (err) {
      console.error("Error eliminando usuario:", err);
      setFeedback({
        message:
          err.message || "No se pudo eliminar el usuario. Intenta nuevamente.",
        type: "danger",
      });
    }
  };

  const filteredUsers = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return users.filter((u) => {
      const nombreCompleto = `${u.nombre || ""} ${u.apellidos || ""}`.toLowerCase();
      const correo = (u.correo || "").toLowerCase();
      const rut = (u.rut || "").toLowerCase();
      return (
        nombreCompleto.includes(term) ||
        correo.includes(term) ||
        rut.includes(term)
      );
    });
  }, [users, searchTerm]);

  return (
    <div className="bg-light min-vh-100">
      <AdminHeader />

      <div className="container py-4 py-md-5">
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
          <div>
            <h1 className="h3 fw-bold mb-1">Gestión de Usuarios</h1>
            <p className="text-muted mb-0">
              Administra los usuarios registrados en EcoMarket.
            </p>
          </div>
          <Button variant="success" onClick={handleOpenCreateModal}>
            <i className="bi bi-plus-circle me-2"></i>
            Nuevo usuario
          </Button>
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
            <div className="row g-3 align-items-center">
              <div className="col-md-6 col-lg-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar por nombre, correo o RUT..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="col-md-3">
                <span className="text-muted small">
                  {filteredUsers.length} usuarios encontrados
                </span>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <p className="text-center text-muted">Cargando usuarios...</p>
        ) : (
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>RUT</th>
                  <th>Teléfono</th>
                  <th>Región / Comuna</th>
                  <th>Rol</th>
                  <th className="text-end">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u) => (
                  <tr key={u.id}>
                    <td className="fw-bold text-muted">#{u.id}</td>
                    <td>
                      {u.nombre} {u.apellidos}
                    </td>
                    <td>{u.correo}</td>
                    <td>{u.rut}</td>
                    <td>{u.telefono || "—"}</td>
                    <td>
                      {u.region || "—"} / {u.comuna || "—"}
                    </td>
                    <td>
                      <span className="badge bg-primary">{u.rol}</span>
                    </td>
                    <td className="text-end">
                      <Button
                        variant="outline-success"
                        size="sm"
                        className="me-2"
                        onClick={() => handleOpenEditModal(u)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDelete(u.id)}
                      >
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan="8" className="text-center text-muted py-4">
                      No se encontraron usuarios.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingUser ? "Editar usuario" : "Nuevo usuario"}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            {feedback.message && (
                <div className={`alert alert-${feedback.type}`} role="alert">
                    {feedback.message}
                </div>
            )}

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    placeholder="E.g. Juan"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Apellidos <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    name="apellidos"
                    value={formData.apellidos}
                    onChange={handleChange}
                    required
                    placeholder="E.g. Pérez Soto"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>RUT <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    name="rut"
                    value={formData.rut}
                    onChange={handleChange}
                    required
                    disabled={!!editingUser}
                    placeholder="E.g. 12.345.678-K"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Teléfono <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    required
                    placeholder="E.g. +56912345678"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Rol <span className="text-danger">*</span></Form.Label>
                  <Form.Select
                    name="rol"
                    value={formData.rol}
                    onChange={handleChange}
                    required
                  >
                    <option value="Cliente">Cliente</option>
                    <option value="Vendedor">Vendedor</option>
                    <option value="Administrador">Administrador</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Correo <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="email"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                required
                disabled={!!editingUser}
                placeholder="E.g. usuario@ejemplo.com"
              />
            </Form.Group>

            {!editingUser && (
              <Form.Group className="mb-3">
                <Form.Label>Contraseña <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="password"
                  name="contrasena"
                  value={formData.contrasena}
                  onChange={handleChange}
                  required
                  placeholder="Mínimo 8 caracteres"
                />
              </Form.Group>
            )}

            <hr className="my-4"/>
            <h5 className="mb-3">Datos de Domicilio</h5>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Región <span className="text-danger">*</span></Form.Label>
                  <Form.Select
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecciona...</option>
                    {regionesComunas.regiones.map((region) => (
                      <option key={region.nombre} value={region.nombre}>
                        {region.nombre}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Comuna <span className="text-danger">*</span></Form.Label>
                  <Form.Select
                    name="comuna"
                    value={formData.comuna}
                    onChange={handleChange}
                    required
                    disabled={!selectedRegion || filteredComunas.length === 0}
                  >
                    <option value="">Selecciona...</option>
                    {filteredComunas.map((comuna) => (
                      <option key={comuna} value={comuna}>
                        {comuna}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
                <Col md={9}>
                    <Form.Group className="mb-3">
                    <Form.Label>Dirección <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                        type="text"
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleChange}
                        required
                        placeholder="E.g. Calle Principal #123"
                    />
                    </Form.Group>
                </Col>
                <Col md={3}>
                    <Form.Group className="mb-3">
                        <Form.Label>Tipo Dirección <span className="text-danger">*</span></Form.Label>
                        <Form.Select
                            name="tipodireccion"
                            value={formData.tipodireccion}
                            onChange={handleChange}
                            required
                        >
                            <option value="Casa">Casa</option>
                            <option value="Departamento">Departamento</option>
                            <option value="Oficina">Oficina</option>
                            <option value="Otro">Otro</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Código Postal (Opcional)</Form.Label>
              <Form.Control
                type="text"
                name="codigopostal"
                value={formData.codigopostal}
                onChange={handleChange}
                placeholder="E.g. 7750000"
              />
            </Form.Group>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal} disabled={saving}>
              Cancelar
            </Button>
            <Button variant="success" type="submit" disabled={saving}>
              {saving
                ? "Guardando..."
                : editingUser
                ? "Guardar cambios"
                : "Crear usuario"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default UserList;