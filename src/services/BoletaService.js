
const BASE_URL =
  import.meta.env.VITE_API_URL || "http://3.23.132.70:8080/api";

export const crearBoleta = async (boletaPayload) => {
  const resp = await fetch(`${BASE_URL}/boletas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
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
  const resp = await fetch(`${BASE_URL}/boletas`);

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
