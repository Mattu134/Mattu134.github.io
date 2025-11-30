import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const user = login(username, password);

    if (!user) {
      setError("Usuario, contraseña o estado de la cuenta incorrectos.");
      return;
    }
    if (user.role === "Administrador" || user.role === "Vendedor") {
      navigate("/admin");
    } else if (user.role === "Cliente") {
      navigate("/");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="bg-light container-fluid vh-100 d-flex justify-content-center align-items-center">
      <div
        className="card border-0 shadow-lg p-4 p-md-5"
        style={{ width: "100%", maxWidth: "420px" }}
      >
        <div className="text-center mb-4">
          <img
            src="/images/logo.png"
            alt="Logo EcoMarket SPA"
            className="img-fluid"
            style={{ maxHeight: "80px" }}
          />
        </div>

        <h3 className="text-center mb-1 fw-normal">Iniciar sesión</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Usuario o correo
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="ej: matias.gonzalez@example.com"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="alert alert-danger text-center py-2" role="alert">
              {error}
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
            Volver a la tienda
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
