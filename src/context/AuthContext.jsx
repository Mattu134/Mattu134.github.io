import React, { createContext, useState, useContext } from "react";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  const login = async (username, password) => {
    /* ¡IMPORTANTE!
      Aquí harías una llamada a tu backend real.
      const response = await fetch('https://api.tu-dominio.com/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();

      Si la llamada es exitosa, el backend devolverá un token.
    */
    
    // --- Simulación de una respuesta exitosa del backend ---
    if (username === 'admin' && password === '1234') {
      const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // Token simulado
      const userData = { username: 'admin', role: 'administrator' };
      
      localStorage.setItem('token', fakeToken);
      localStorage.setItem('user', JSON.stringify(userData));
      setAuthToken(fakeToken);
      setUser(userData);
      return true;
    }
  };

  const logout = () => {
    setUser(null);
    setAuthToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setAuthToken(null);
    setUser(null);
  };


  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
  
};
