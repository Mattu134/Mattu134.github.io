import { API_BASE_URL } from "./apiConfig";

const BASE_URL = API_BASE_URL.replace(/\/$/, "");

const getToken = () =>
  sessionStorage.getItem("token") || localStorage.getItem("token");

const buildHeaders = () => ({
  "Content-Type": "application/json",
});


export const crearBoleta = async (boletaPayload) => {
  const resp = await fetch(`${BASE_URL}/boletas`, {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify(boletaPayload),
  });

  if (!resp.ok) {
    const errorData = await resp.json().catch(() => null);
    throw new Error(
      errorData?.message || errorData?.error || `Error al crear boleta (HTTP ${resp.status})`
    );
  }

  return resp.json();
};


export const listarBoletas = async () => {
  const resp = await fetch(`${BASE_URL}/boletas`, {
    method: "GET",
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
