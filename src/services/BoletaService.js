import { API_BASE_URL } from "./apiConfig";

const BASE_URL = import.meta.env.VITE_API_URL || API_BASE_URL;

const buildHeaders = () => {
  const headers = {
    "Content-Type": "application/json",
  };

  const token = localStorage.getItem("token");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};

export const crearBoleta = async (boletaPayload) => {
  const resp = await fetch(`${BASE_URL}/boletas`, {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify(boletaPayload),
  });

  if (!resp.ok) {
    const errorData = await resp.json().catch(() => null);
    const message =
      errorData?.message ||
      errorData?.error ||
      `Error al crear boleta (HTTP ${resp.status})`;
    throw new Error(message);
  }

  return resp.json();
};

export const listarBoletas = async () => {
  const resp = await fetch(`${BASE_URL}/boletas`, {
    headers: buildHeaders(),
  });

  if (!resp.ok) {
    const errorData = await resp.json().catch(() => null);
    const message =
      errorData?.message ||
      errorData?.error ||
      `Error al obtener boletas (HTTP ${resp.status})`;
    throw new Error(message);
  }

  return resp.json();
};
