import React, { createContext, useState, useContext } from "react";
import { initialUsers } from "../data/usuarios";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(
    () => localStorage.getItem("token") || null
  );
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  //Login de prueba: todos usan la misma contraseña
  const VALID_PASSWORD = "1234";

  const login = (username, password) => {
    // limpiar espacios y case
    const usernameNormalized = (username || "").trim().toLowerCase();
    // Buscar usuario
    const found = initialUsers.find(
      (u) =>
        u.active &&
        (u.email.toLowerCase() === usernameNormalized ||
          u.name.toLowerCase() === usernameNormalized)
    );
    // Validaciones
    if (!found) return null;
    if (password !== VALID_PASSWORD) return null;

    // Token fake solo para simular auth
    const fakeToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fake-demo-token.ecomarket";

    const userData = {
      id: found.id,
      name: found.name,
      email: found.email,
      role: found.role, // "Administrador" | "Vendedor" | "Cliente"
      active: found.active,
    };
    localStorage.setItem("token", fakeToken);
    localStorage.setItem("user", JSON.stringify(userData));

    setAuthToken(fakeToken);
    setUser(userData);
    return userData;
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setAuthToken(null);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
