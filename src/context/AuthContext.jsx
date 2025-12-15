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

    nombre: apiUser.nombre || "",
    apellidos: apiUser.apellidos || "",
    correo: apiUser.correo || apiUser.email || "",
    rut: apiUser.rut || "",
    telefono: apiUser.telefono || "",
    region: apiUser.region || "",
    comuna: apiUser.comuna || "",
    direccion: apiUser.direccion || "",
    tipodireccion: apiUser.tipodireccion || apiUser.tipoDireccion || "",
    codigopostal: apiUser.codigopostal || apiUser.codigoPostal || "",

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
  const resp = await fetch(`${base}/auth/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!resp.ok) {
    throw new Error(`Error al obtener usuario actual: ${resp.status}`);
  }

  return await resp.json();
}

export const AuthProvider = ({ children }) => {
  //sessionStorage (se borra al cerrar pestaña/ventana)
  const [authToken, setAuthToken] = useState(
    () => sessionStorage.getItem("token") || null
  );

  const [user, setUser] = useState(() => {
    const stored = sessionStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const clearAuth = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setAuthToken(null);
    setUser(null);
  };

  const setAuthFromToken = (token, apiUser = null) => {
    if (!token) {
      clearAuth();
      return;
    }

    const payload = parseJwt(token);
    if (!payload && !apiUser) {
      clearAuth();
      return;
    }

    let userData = null;

    if (apiUser) {
      userData = mapBackendUserToFront(apiUser);
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

    //Guardar en sessionStorage
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("user", JSON.stringify(userData));

    setAuthToken(token);
    setUser(userData);
  };

  useEffect(() => {
    const initAuth = async () => {
      // Si no hay token, no hacemos nada
      if (!authToken) return;

      // Si ya hay user cargado desde storage, listo
      if (user) return;

      try {
        const apiUser = await fetchCurrentUser(authToken);
        setAuthFromToken(authToken, apiUser);
      } catch (err) {
        console.warn(
          "No se pudo obtener el usuario desde la API, usando solo el token:",
          err
        );
        setAuthFromToken(authToken);
      }
    };

    initAuth();
  }, [authToken, user]);

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
        apiUser = await fetchCurrentUser(token);
      } catch (err) {
        console.warn("Login ok, pero no se pudo obtener /auth/me:", err);
      }

      setAuthFromToken(token, apiUser);
      const storedUser = sessionStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
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
  async function fetchUserByEmailNoAuth(email) {
  const base = API_BASE_URL.replace(/\/$/, "");
  const resp = await fetch(`${base}/usuarios`, { method: "GET" });

  if (!resp.ok) throw new Error(`Error al listar usuarios: ${resp.status}`);

  const users = await resp.json();
  return users.find((u) => (u.correo || u.email || "").toLowerCase() === email.toLowerCase()) || null;
}

};
