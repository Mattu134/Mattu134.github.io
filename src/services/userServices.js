import axios from "axios";

const API_DELAY = 400;

export const fetchUsers = async () => {
  try {
    const response = await axios.get("/data/users.json");
    const users = response.data.users || [];

    return new Promise((resolve) =>
      setTimeout(() => resolve(users), API_DELAY)
    );
  } catch (error) {
    console.error("Error al cargar usuarios:", error);
    return [];
  }
};
