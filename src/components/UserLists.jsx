import React, { useState, useEffect } from "react";
import AdminHeader from "./AdminHeader";
import { fetchUsers } from "../services/userServices";

function UsersList() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "Cliente",
    status: "Activo"
  });

  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        setLoading(true);
        const data = await fetchUsers();
        setUsuarios(data);
      } catch (error) {
        console.error("Error al cargar usuarios en admin:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarUsuarios();
  }, []);

  const handleEdit = (id) => {
    console.log(`[ACTION] Editar usuario ID: ${id}`);
    // futuro: abrir modal de edición
  };

  const handleDelete = (id) => {
    if (window.confirm(`¿Estás seguro de eliminar/suspender al usuario ${id}?`)) {
      setUsuarios((prev) => prev.filter((u) => u.id !== id));
      console.log(`[ACTION] Usuario con ID ${id} eliminado.`);
    }
  };

  const handleOpenModal = () => {
    setNewUser({
      name: "",
      email: "",
      role: "Cliente",
      status: "Activo"
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newUser.name.trim()) {
      alert("El nombre es obligatorio.");
      return;
    }

    if (!newUser.email.trim()) {
      alert("El email es obligatorio.");
      return;
    }

    if (!validateEmail(newUser.email)) {
      alert("El formato de email no es válido.");
      return;
    }

    const emailExists = usuarios.some(
      (u) => u.email.toLowerCase() === newUser.email.toLowerCase()
    );
    if (emailExists) {
      alert("Ya existe un usuario registrado con ese correo.");
      return;
    }

    // generar ID nuevo
    const nextId =
      usuarios.length > 0 ? Math.max(...usuarios.map((u) => u.id)) + 1 : 1;

    const today = new Date().toISOString().slice(0, 10); // yyyy-mm-dd

    const usuarioCreado = {
      id: nextId,
      name: newUser.name.trim(),
      email: newUser.email.trim(),
      role: newUser.role,
      status: newUser.status,
      createdAt: today
    };

    setUsuarios((prev) => [...prev, usuarioCreado]);
    setShowModal(false);
    console.log("[ACTION] Usuario creado:", usuarioCreado);
  };

  return (
    <div className="bg-light min-vh-100">
      <AdminHeader />

      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="fw-normal display-5">Administración de Usuarios</h1>
          <button
            className="btn btn-success btn-lg"
            onClick={handleOpenModal}
          >
            <i className="bi bi-person-plus-fill me-2"></i>
            Agregar Usuario
          </button>
        </div>

        <div className="card shadow-sm border-0">
          <div className="card-body p-0">
            {loading ? (
              <p className="text-center py-4">Cargando usuarios...</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-striped table-hover mb-0">
                  <thead>
                    <tr className="bg-success text-white">
                      <th className="p-3">ID</th>
                      <th className="p-3">Nombre</th>
                      <th className="p-3">Email</th>
                      <th className="p-3">Rol</th>
                      <th className="p-3">Estado</th>
                      <th className="p-3">Fecha registro</th>
                      <th className="p-3 text-center">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usuarios.map((usuario) => (
                      <tr key={usuario.id}>
                        <td className="p-3 text-muted">{usuario.id}</td>
                        <td className="p-3 fw-semibold">{usuario.name}</td>
                        <td className="p-3">{usuario.email}</td>
                        <td className="p-3">{usuario.role}</td>
                        <td className="p-3">
                          <span
                            className={
                              usuario.status === "Activo"
                                ? "badge bg-success"
                                : "badge bg-secondary"
                            }
                          >
                            {usuario.status}
                          </span>
                        </td>
                        <td className="p-3">{usuario.createdAt}</td>

                        <td className="p-3 text-center">
                          <button
                            className="btn btn-sm me-2 fw-bold"
                            style={{
                              borderColor: "#0d6efd",
                              color: "#0d6efd",
                              backgroundColor: "rgba(13, 110, 253, 0.1)"
                            }}
                            onClick={() => handleEdit(usuario.id)}
                          >
                            Editar
                          </button>
                          <button
                            className="btn btn-sm fw-bold"
                            style={{
                              borderColor: "#dc3545",
                              color: "#dc3545",
                              backgroundColor: "rgba(220, 53, 69, 0.1)"
                            }}
                            onClick={() => handleDelete(usuario.id)}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                    {usuarios.length === 0 && (
                      <tr>
                        <td colSpan="7" className="text-center py-4 text-muted">
                          No hay usuarios registrados.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
      {showModal && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content border-0 shadow">
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title">Agregar Usuario</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Nombre completo</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={newUser.name}
                      onChange={handleChange}
                      placeholder="Ej: Juan Pérez"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Correo electrónico</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={newUser.email}
                      onChange={handleChange}
                      placeholder="usuario@ecomarket.cl"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Rol</label>
                    <select
                      name="role"
                      className="form-select"
                      value={newUser.role}
                      onChange={handleChange}
                    >
                      <option value="Administrador">Administrador</option>
                      <option value="Vendedor">Vendedor</option>
                      <option value="Soporte">Soporte</option>
                      <option value="Cliente">Cliente</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Estado</label>
                    <select
                      name="status"
                      className="form-select"
                      value={newUser.status}
                      onChange={handleChange}
                    >
                      <option value="Activo">Activo</option>
                      <option value="Suspendido">Suspendido</option>
                    </select>
                  </div>

                  <p className="text-muted mb-0" style={{ fontSize: "0.85rem" }}>
                    La fecha de registro se asignará automáticamente al día de hoy.
                  </p>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCloseModal}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-success">
                    Guardar Usuario
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UsersList;
