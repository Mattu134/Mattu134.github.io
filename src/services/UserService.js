import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://3.23.132.70:8080/api";

const USERS_URL = `${API_BASE_URL}/usuarios`;

export const getUsers = async () => {
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(USERS_URL, config);
  return response.data;
};

export const createUser = async (userData) => {
  const token = localStorage.getItem("token"); 

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const payload = {
    correo: userData.correo,
    contrasena: userData.contrasena,
    nombre: userData.nombre,
    apellidos: userData.apellidos,
    rut: userData.rut,
    telefono: userData.telefono,
    region: userData.region,
    comuna: userData.comuna,
    direccion: userData.direccion,
    tipodireccion: userData.tipodireccion,
    codigopostal: userData.codigopostal,
    rol: userData.rol,
  };

  const response = await axios.post(USERS_URL, payload, config);
  return response.data;
};

// Actualizar un usuario existente
export const updateUser = async (id, data) => {
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const payload = {
    nombre: data.nombre ?? null,
    apellidos: data.apellidos ?? null,
    telefono: data.telefono ?? null,
    region: data.region ?? null,
    comuna: data.comuna ?? null,
    direccion: data.direccion ?? null,
    tipodireccion: data.tipodireccion ?? null,
    codigopostal: data.codigopostal ?? null,
    rol: data.rol ?? null,
    activo: data.activo ?? null,
  };

  const response = await axios.patch(`${USERS_URL}/${id}`, payload, config);
  return response.data;
};

// Eliminar un usuario por ID
export const deleteUserById = async (id) => {
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${USERS_URL}/${id}`, config);  
  return response.data;
};
