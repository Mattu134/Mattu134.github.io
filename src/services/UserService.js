import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://3.23.132.70:8080/api";

const USERS_URL = `${API_BASE_URL}/usuarios`;

const getToken = () =>
  sessionStorage.getItem("token") || localStorage.getItem("token");

const authConfig = () => {
  const token = getToken();

  if (!token) {
    throw new Error("No hay token. Inicia sesión nuevamente.");
  }

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getUsers = async () => {
  const response = await axios.get(USERS_URL);
  return response.data;
};


export const createUser = async (userData) => {
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
    tipoDireccion: userData.tipoDireccion || userData.tipodireccion || null,
    codigoPostal: userData.codigoPostal || userData.codigopostal || null,
    rol: userData.rol,
  };

  const response = await axios.post(USERS_URL, payload, authConfig());
  return response.data;
};

export const updateUser = async (id, data) => {
  const payload = {
    nombre: data.nombre ?? null,
    apellidos: data.apellidos ?? null,
    telefono: data.telefono ?? null,
    region: data.region ?? null,
    comuna: data.comuna ?? null,
    direccion: data.direccion ?? null,
    tipoDireccion: data.tipoDireccion ?? data.tipodireccion ?? null,
    codigoPostal: data.codigoPostal ?? data.codigopostal ?? null,
    rol: data.rol ?? null,
    activo: data.activo ?? null,
  };

  const response = await axios.patch(`${USERS_URL}/${id}`, payload, authConfig());
  return response.data;
};

export const deleteUserById = async (id) => {
  const response = await axios.delete(`${USERS_URL}/${id}`, authConfig());
  return response.data;
};

export const updateUserAddress = async (userId, addressData) => {
  const token = getToken();

  if (!token) {
    throw new Error("No hay token de sesión. Vuelve a iniciar sesión.");
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const payload = {
    region: addressData.region,
    comuna: addressData.comuna,
    direccion: addressData.direccion,
    tipoDireccion: addressData.tipodireccion,
    codigoPostal: addressData.codigopostal || null,
  };

  await axios.patch(`${USERS_URL}/${userId}/direccion`, payload, config);
};
