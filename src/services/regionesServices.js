import axios from "axios";

export const fetchRegiones = async () => {
  try {
    const response = await axios.get("/data/regiones-comunas.json");
    return response.data.regiones || [];
  } catch (error) {
    console.error("Error al cargar regiones:", error);
    return [];
  }
};
