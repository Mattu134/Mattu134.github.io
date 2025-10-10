import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(username, password);
    // Si la autenticación es exitosa, navega al panel de administración.
    if (success) navigate("/admin");
    else setError(true);
  };

  return (
    //Un fondo limpio para la imagen
    <div className="bg-light container-fluid vh-100 d-flex justify-content-center align-items-center">
      <div className="card border-0 shadow-lg p-4 p-md-5" style={{ width: "100%", maxWidth: "420px" }}>
        <div className="text-center mb-4">
          <img
            src="/images/logo.png"
            alt="Logo EcoMarket SPA"
            className="img-fluid"
            style={{ maxHeight: '80px' }}
          />
        </div>
        
        <h3 className="text-center mb-4 fw-normal">Acceso a Administración</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Usuario</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="1234"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          {error && (
            <div className="alert alert-danger text-center py-2" role="alert">
              Usuario o contraseña incorrectos
            </div>
          )}

          <button type="submit" className="btn btn-success btn-lg w-100 mt-3">
            Ingresar
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary w-100 mt-2"
            onClick={() => navigate("/")}
          >
            Volver
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;