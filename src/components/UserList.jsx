import React, { useState } from 'react';
import AdminHeader from './AdminHeader';
import { initialUsers } from '../data/usuarios';

function UserList() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState('');

  const handleEdit = (id) => {
    const user = users.find(u => u.id === id);
    if (user) {
      const newName = prompt('Editar nombre de usuario:', user.name);
      if (newName) {
        setUsers(users.map(u => u.id === id ? { ...u, name: newName } : u));
        console.log(`[ACTION] Usuario con ID ${id} actualizado.`);
      }
    }
  };

  const handleDelete = (id) => {
    if (window.confirm(`¿Estás seguro de eliminar el usuario con ID ${id}?`)) {
      setUsers(users.filter(u => u.id !== id));
      console.log(`[ACTION] Usuario con ID ${id} eliminado.`);
    }
  };

  const filteredUsers = users.filter(
    u => u.name.toLowerCase().includes(search.toLowerCase()) || 
         u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-light min-vh-100">
      <AdminHeader />

      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="fw-normal display-5">Administración de Usuarios</h1>
          <button 
            className="btn btn-success btn-lg"
            onClick={() => console.log('Abrir formulario de creación de usuario')}
          >
            <i className="bi bi-plus-lg me-2"></i>
            Agregar Usuario
          </button>
        </div>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por nombre o email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="card shadow-sm border-0">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-striped table-hover mb-0">
                <thead>
                  <tr className="bg-success text-white">
                    <th scope="col" className="p-3">ID</th>
                    <th scope="col" className="p-3">Nombre</th>
                    <th scope="col" className="p-3">Email</th>
                    <th scope="col" className="p-3">Rol</th>
                    <th scope="col" className="p-3">Estado</th>
                    <th scope="col" className="p-3 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(user => (
                    <tr key={user.id}>
                      <th scope="row" className="p-3 text-muted">{user.id}</th>
                      <td className="p-3 fw-semibold">{user.name}</td>
                      <td className="p-3">{user.email}</td>
                      <td className="p-3 text-primary fw-bold">{user.role}</td>
                      <td className={`p-3 fw-bold ${user.active ? 'text-success' : 'text-danger'}`}>
                        {user.active ? 'Activo' : 'Inactivo'}
                      </td>
                      <td className="p-3 text-center">
                        <button 
                          className="btn btn-sm me-2 fw-bold"
                          style={{ borderColor: '#ffc107', color: '#ffc107', backgroundColor: 'rgba(255, 193, 7, 0.1)' }}
                          onClick={() => handleEdit(user.id)}
                        >
                          Editar
                        </button>
                        <button 
                          className="btn btn-sm fw-bold"
                          style={{ borderColor: '#dc3545', color: '#dc3545', backgroundColor: 'rgba(220, 53, 69, 0.1)' }}
                          onClick={() => handleDelete(user.id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}

                  {filteredUsers.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center p-3 text-muted">
                        No se encontraron usuarios
                      </td>
                    </tr>
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

export default UserList;
