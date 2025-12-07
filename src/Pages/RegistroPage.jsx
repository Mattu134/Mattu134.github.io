import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Col, Button, Alert } from "react-bootstrap";
import { API_BASE_URL } from "../services/apiConfig";
import { useAuth } from "../context/AuthContext";
import regionesComunas from "../data/Regiones-Comunas";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALPHA_SPACES_REGEX = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

const initialForm = {
  nombre: "",
  apellidos: "",
  correo: "",
  contrasena: "",
  confirmarContrasena: "",
  rut: "",
  telefono: "",
  region: "",
  comuna: "",
  direccion: "",
  tipodireccion: "Casa",
  codigopostal: "",
};

// Deja solo dígitos y K/k en el RUT
const cleanRut = (rut) => {
  if (!rut) return "";
  return rut.toUpperCase().replace(/[^0-9K]/g, "");
};

const RegistroPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, setAuthFromToken } = useAuth() || {};

  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [mensajeOk, setMensajeOk] = useState("");
  const [saving, setSaving] = useState(false);

  const filteredComunas = useMemo(() => {
    const regionData = regionesComunas.regiones.find(
      (region) => region.nombre === form.region
    );
    return regionData ? regionData.comunas : [];
  }, [form.region]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Nombre y apellidos: solo letras y espacios
    if (
      (name === "nombre" || name === "apellidos") &&
      value &&
      !ALPHA_SPACES_REGEX.test(value)
    ) {
      return;
    }

    setForm((prev) => {
      if (name === "region") {
        return { ...prev, region: value, comuna: "" };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleRutChange = (e) => {
    const { value } = e.target;
    setForm((prev) => ({
      ...prev,
      rut: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMensajeOk("");
    setSaving(true);

    const cleanRutValue = cleanRut(form.rut);

    try {
      // Validaciones nombre y apellidos
      if (!form.nombre.trim() || !form.apellidos.trim()) {
        throw new Error("El nombre y los apellidos son obligatorios.");
      }
      if (
        !ALPHA_SPACES_REGEX.test(form.nombre.trim()) ||
        !ALPHA_SPACES_REGEX.test(form.apellidos.trim())
      ) {
        throw new Error(
          "El nombre y los apellidos solo pueden contener letras y espacios."
        );
      }

      // Correo
      if (!form.correo.trim()) {
        throw new Error("El correo es obligatorio.");
      }
      if (!EMAIL_REGEX.test(form.correo.trim())) {
        throw new Error(
          "El formato del correo electrónico es inválido. Debe incluir '@' y un dominio (ej: .com o .cl)."
        );
      }

      // Contraseña
      if (!form.contrasena.trim() || !form.confirmarContrasena.trim()) {
        throw new Error(
          "La contraseña y su confirmación son obligatorias."
        );
      }
      if (form.contrasena !== form.confirmarContrasena) {
        throw new Error("Las contraseñas no coinciden.");
      }
      if (form.contrasena.trim().length < 8) {
        throw new Error("La contraseña debe tener al menos 8 caracteres.");
      }

      // RUT
      if (!form.rut.trim()) {
        throw new Error("El RUT es obligatorio.");
      }
      if (cleanRutValue.length < 5 || cleanRutValue.length > 10) {
        throw new Error(
          "El RUT parece ser inválido o demasiado corto/largo."
        );
      }

      // Otros campos obligatorios
      if (!form.telefono.trim()) {
        throw new Error("El teléfono es obligatorio.");
      }
      if (!form.region.trim() || !form.comuna.trim()) {
        throw new Error("La región y la comuna son obligatorias.");
      }
      if (!form.direccion.trim()) {
        throw new Error("La dirección es obligatoria.");
      }
      if (!form.tipodireccion.trim()) {
        throw new Error("El tipo de dirección es obligatorio.");
      }

      const base = API_BASE_URL.replace(/\/$/, "");
      const payload = {
        correo: form.correo.trim(),
        contrasena: form.contrasena.trim(),
        nombre: form.nombre.trim(),
        apellidos: form.apellidos.trim(),
        rut: cleanRutValue,
        telefono: form.telefono.trim(),
        region: form.region.trim(),
        comuna: form.comuna.trim(),
        direccion: form.direccion.trim(),
        tipodireccion: form.tipodireccion.trim(),
        codigopostal: form.codigopostal.trim() || null,
        rol: "Cliente",
      };

      const resp = await fetch(`${base}/auth/registrar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!resp.ok) {
        const data = await resp.json().catch(() => null);
        const backendMsg =
          data?.message ||
          data?.error ||
          `Error al registrar usuario (HTTP ${resp.status})`;
        throw new Error(backendMsg);
      }

      const data = await resp.json();
      const token = data.token;

      if (token) {
        if (setAuthFromToken) {
          setAuthFromToken(token);
        } else {
          localStorage.setItem("token", token);
        }
      }

      setMensajeOk("Tu cuenta ha sido creada con éxito.");
      setTimeout(() => {
        navigate("/checkout");
      }, 1500);
    } catch (err) {
      console.error(err);
      setError(err.message || "Ocurrió un error al registrar el usuario.");
    } finally {
      setSaving(false);
    }
  };

  if (isAuthenticated && user) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card shadow-sm border-0 p-4 text-center">
              <h2 className="fw-bold mb-3">Ya estás registrado</h2>
              <p className="text-muted mb-2">
                Usuario: <strong>{user.name || user.email}</strong>
              </p>
              <p className="text-muted mb-4">
                Puedes continuar al checkout para finalizar tu compra.
              </p>
              <button
                className="btn btn-success me-2"
                onClick={() => navigate("/checkout")}
              >
                Ir al checkout
              </button>
              <button
                className="btn btn-outline-secondary mt-2"
                onClick={() => navigate("/")}
              >
                Volver al inicio
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm border-0 p-4">
            <h2 className="fw-bold mb-3 text-center">
              CREA TU CUENTA EN ECOMARKET 
            </h2>
            <p className="text-muted text-center mb-4">
              Completa tus datos personales y de envío para crear tu cuenta y
              agilizar futuras compras.
            </p>

            {error && <Alert variant="danger">{error}</Alert>}
            {mensajeOk && <Alert variant="success">{mensajeOk}</Alert>}

            <Form onSubmit={handleSubmit} className="row g-3">
              <h5 className="mt-4 mb-3">Datos Personales</h5>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>
                    Nombre <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    required
                    maxLength={50}
                    placeholder="E.g. Juan"
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>
                    Apellidos <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="apellidos"
                    value={form.apellidos}
                    onChange={handleChange}
                    required
                    maxLength={50}
                    placeholder="E.g. Pérez Soto"
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>
                    RUT <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="rut"
                    value={form.rut}
                    onChange={handleRutChange}
                    required
                    maxLength={12}
                    placeholder="E.g. 12.345.678-K"
                  />
                  <Form.Text className="text-muted">
                    El formato (puntos y guion) se ajustará automáticamente al
                    guardar.
                  </Form.Text>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>
                    Teléfono <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="tel"
                    name="telefono"
                    value={form.telefono}
                    onChange={handleChange}
                    required
                    maxLength={15}
                    placeholder="E.g. +56912345678"
                  />
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group>
                  <Form.Label>
                    Correo electrónico{" "}
                    <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="email"
                    name="correo"
                    value={form.correo}
                    onChange={handleChange}
                    required
                    maxLength={100}
                    placeholder="E.g. usuario@ejemplo.com"
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>
                    Contraseña <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="password"
                    name="contrasena"
                    value={form.contrasena}
                    onChange={handleChange}
                    required
                    minLength={8}
                    maxLength={60}
                    placeholder="Mínimo 8 caracteres"
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>
                    Confirmar contraseña{" "}
                    <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmarContrasena"
                    value={form.confirmarContrasena}
                    onChange={handleChange}
                    required
                    minLength={8}
                    maxLength={60}
                  />
                </Form.Group>
              </Col>

              <hr className="my-4" />

              <h5 className="mb-3">Datos de Envío</h5>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>
                    Región <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select
                    name="region"
                    value={form.region}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecciona una región...</option>
                    {regionesComunas.regiones.map((region) => (
                      <option key={region.nombre} value={region.nombre}>
                        {region.nombre}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>
                    Comuna <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select
                    name="comuna"
                    value={form.comuna}
                    onChange={handleChange}
                    required
                    disabled={!form.region || filteredComunas.length === 0}
                  >
                    <option value="">Selecciona una comuna...</option>
                    {filteredComunas.map((comuna) => (
                      <option key={comuna} value={comuna}>
                        {comuna}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col xs={12} md={9}>
                <Form.Group>
                  <Form.Label>
                    Dirección (Calle y número){" "}
                    <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="direccion"
                    value={form.direccion}
                    onChange={handleChange}
                    required
                    maxLength={120}
                    placeholder="E.g. Calle Principal #123"
                  />
                </Form.Group>
              </Col>

              <Col xs={12} md={3}>
                <Form.Group>
                  <Form.Label>
                    Tipo Dirección <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select
                    name="tipodireccion"
                    value={form.tipodireccion}
                    onChange={handleChange}
                    required
                  >
                    <option value="Casa">Casa</option>
                    <option value="Departamento">Departamento</option>
                    <option value="Oficina">Oficina</option>
                    <option value="Otro">Otro</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Código Postal (Opcional)</Form.Label>
                  <Form.Control
                    type="text"
                    name="codigopostal"
                    value={form.codigopostal}
                    onChange={handleChange}
                    maxLength={10}
                    placeholder="E.g. 7750000"
                  />
                </Form.Group>
              </Col>

              <div className="col-12 d-flex justify-content-between mt-4">
                <Button
                  type="button"
                  variant="outline-secondary"
                  onClick={() => navigate("/")}
                  disabled={saving}
                >
                  Cancelar
                </Button>
                <Button type="submit" variant="success" disabled={saving}>
                  {saving ? "Registrando..." : "Crear cuenta"}
                </Button>
              </div>

              <div className="col-12 text-center mt-3">
                <p className="text-muted mb-0">
                  ¿Ya tienes cuenta?{" "}
                  <Button
                    type="button"
                    variant="link"
                    className="p-0"
                    onClick={() => navigate("/login")}
                  >
                    Inicia sesión
                  </Button>
                </p>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistroPage;
