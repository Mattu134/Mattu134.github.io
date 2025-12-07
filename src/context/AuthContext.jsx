import React, { createContext, useState, useContext, useEffect } from "react";
import { API_BASE_URL } from "../services/apiConfig";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Función para decodificar el JWT
function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("No se pudo decodificar el token JWT:", e);
    return null;
  }
}
function mapRoleToFront(rolBackend) {
  switch (rolBackend) {
    case "ADMIN":
    case "ADMINISTRADOR":
      return "Administrador";
    case "VENDEDOR":
      return "Vendedor";
    case "CLIENTE":
      return "Cliente";
    default:
      return rolBackend || "Cliente";
  }
}

function mapBackendUserToFront(apiUser) {
  if (!apiUser) return null;

  const backendRole = apiUser.rol || apiUser.role;
  const roleFront = mapRoleToFront(backendRole);

  return {
    id: apiUser.id || apiUser.idUsuario || null,
    name: apiUser.nombre || apiUser.name || "",
    email: apiUser.correo || apiUser.email || "",
    role: roleFront,
    active:
      apiUser.activo !== undefined
        ? apiUser.activo
        : apiUser.active !== undefined
        ? apiUser.active
        : true,
  };
}

// Función para obtener el usuario actual usando el token
async function fetchCurrentUser(token) {
  const base = API_BASE_URL.replace(/\/$/, "");
  const resp = await fetch(`${base}/auth/me`, {  // Cambio aquí a '/auth/me' para obtener los datos del usuario
    method: "GET",  // Usamos GET para obtener el usuario actual
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,  // Enviar el token en los encabezados
    },
  });

  if (!resp.ok) {
    throw new Error(`Error al obtener usuario actual: ${resp.status}`);
  }

  const apiUser = await resp.json();
  return apiUser;
}

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(
    () => localStorage.getItem("token") || null
  );
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const clearAuth = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuthToken(null);
    setUser(null);
  };

  const setAuthFromToken = (token, apiUser = null) => {
    if (!token) {
      clearAuth();
      return;
    }

    const payload = parseJwt(token);  // Decodificar el token
    if (!payload && !apiUser) {
      clearAuth();
      return;
    }

    let userData = null;

    if (apiUser) {
      userData = mapBackendUserToFront(apiUser);  // Mapear el usuario del backend
    } else if (payload) {
      const roleFront = mapRoleToFront(payload.rol);

      userData = {
        id: payload.id || null,
        name: payload.nombre || payload.sub || "",
        email: payload.sub || "",
        role: roleFront,
        active: true,
      };
    }

    if (!userData) {
      clearAuth();
      return;
    }

    // Almacenar los datos del usuario y el token en `localStorage`
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));

    setAuthToken(token);
    setUser(userData);
  };

  useEffect(() => {
    const initAuth = async () => {
      if (!authToken || user) return;

      try {
        const apiUser = await fetchCurrentUser(authToken);
        setAuthFromToken(authToken, apiUser);  // Almacenar los datos del usuario
      } catch (err) {
        console.warn(
          "No se pudo obtener el usuario desde la API, usando solo el token:",
          err
        );
        setAuthFromToken(authToken);
      }
    };

    initAuth();
  }, []);

  const login = async (username, password) => {
    try {
      const base = API_BASE_URL.replace(/\/$/, "");
      const resp = await fetch(`${base}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correo: username,
          email: username,
          contrasena: password,
          password: password,
        }),
      });

      if (!resp.ok) {
        console.error("Error en login:", resp.status);
        return null;
      }

      const data = await resp.json();
      const { token } = data;

      if (!token) {
        console.error("La respuesta de login no trae token");
        return null;
      }

      let apiUser = null;
      try {
        apiUser = await fetchCurrentUser(token);  // Obtener el usuario actual con el token
      } catch (err) {
        console.warn("Login ok, pero no se pudo obtener /auth/me:", err);
      }

      setAuthFromToken(token, apiUser);  // Establecer los datos de autenticación
      return JSON.parse(localStorage.getItem("user"));
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      return null;
    }
  };

  const logout = () => {
    clearAuth();
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        authToken,
        isAuthenticated,
        role: user?.role || null,
        login,
        logout,
        setAuthFromToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
