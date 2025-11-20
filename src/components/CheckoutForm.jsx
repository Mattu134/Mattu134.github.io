// src/components/CheckoutForm.jsx
import { useState, useEffect } from "react";
import { fetchRegiones } from "../services/regionesServices";

const CheckoutForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    email: "",
    nombre: "",
    apellidos: "",
    rut: "",
    direccion: "",
    depto: "",
    codigoPostal: "",
    comuna: "",
    region: "",
    celular: "",
    suscripcion: true,
    guardarInfo: false,
  });

  const [regiones, setRegiones] = useState([]);
  const [comunas, setComunas] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const cargarRegiones = async () => {
      const data = await fetchRegiones();
      setRegiones(data);
    };
    cargarRegiones();
  }, []);

  useEffect(() => {
    const regionSeleccionada = regiones.find(
      (r) => r.nombre === formData.region
    );
    setComunas(regionSeleccionada ? regionSeleccionada.comunas : []);
    setFormData((prev) => ({ ...prev, comuna: "" }));
  }, [formData.region, regiones]);

  const validate = () => {
    const newErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) newErrors.email = "Correo inválido";
    if (!formData.nombre.trim()) newErrors.nombre = "Campo requerido";
    if (!formData.apellidos.trim()) newErrors.apellidos = "Campo requerido";
    if (!/^\d{7,8}-[0-9Kk]$/.test(formData.rut))
      newErrors.rut = "Formato RUT inválido (ej: 12345678-K)";
    if (!formData.direccion.trim()) newErrors.direccion = "Campo requerido";
    if (!formData.region) newErrors.region = "Debe seleccionar una región";
    if (!formData.comuna) newErrors.comuna = "Debe seleccionar una comuna";
    if (!/^[0-9]{8,12}$/.test(formData.celular))
      newErrors.celular = "Celular inválido (8 a 12 dígitos)";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmitInternal = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    } else {
      console.log("Formulario con errores de validación");
    }
  };

  return (
    <form onSubmit={handleSubmitInternal} className="needs-validation" noValidate>
      <h5 className="fw-semibold mb-3 border-bottom pb-2">Contacto</h5>
      <div className="row g-3 mb-4">
        <div className="col-12">
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <div className="col-12">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              name="suscripcion"
              checked={formData.suscripcion}
              onChange={handleChange}
              id="suscripcion"
            />
            <label className="form-check-label text-muted" htmlFor="suscripcion">
              Deseo recibir ofertas y noticias por correo electrónico.
            </label>
          </div>
        </div>
      </div>

      <h5 className="fw-semibold mb-3 border-bottom pb-2">Dirección de Envío</h5>
      <div className="row g-3">
        <div className="col-md-6">
          <input
            name="nombre"
            placeholder="Nombre"
            className={`form-control ${errors.nombre ? "is-invalid" : ""}`}
            value={formData.nombre}
            onChange={handleChange}
            required
          />
          {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
        </div>

        <div className="col-md-6">
          <input
            name="apellidos"
            placeholder="Apellidos"
            className={`form-control ${errors.apellidos ? "is-invalid" : ""}`}
            value={formData.apellidos}
            onChange={handleChange}
            required
          />
          {errors.apellidos && (
            <div className="invalid-feedback">{errors.apellidos}</div>
          )}
        </div>

        <div className="col-md-6">
          <input
            name="rut"
            placeholder="RUT (Ej: 12345678-K)"
            className={`form-control ${errors.rut ? "is-invalid" : ""}`}
            value={formData.rut}
            onChange={handleChange}
            required
          />
          {errors.rut && <div className="invalid-feedback">{errors.rut}</div>}
        </div>

        <div className="col-md-6">
          <input
            name="celular"
            placeholder="Teléfono Celular"
            className={`form-control ${errors.celular ? "is-invalid" : ""}`}
            value={formData.celular}
            onChange={handleChange}
            required
          />
          {errors.celular && (
            <div className="invalid-feedback">{errors.celular}</div>
          )}
        </div>

        <div className="col-md-6">
          <select
            name="region"
            className={`form-select ${errors.region ? "is-invalid" : ""}`}
            value={formData.region}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione Región</option>
            {regiones.map((r, idx) => (
              <option key={idx} value={r.nombre}>
                {r.nombre}
              </option>
            ))}
          </select>
          {errors.region && (
            <div className="invalid-feedback">{errors.region}</div>
          )}
        </div>

        <div className="col-md-6">
          <select
            id="comuna"
            name="comuna"
            value={formData.comuna}
            onChange={handleChange}
            className={`form-select ${errors.comuna ? "is-invalid" : ""}`}
            disabled={!formData.region}
          >
            <option value="">Seleccione Comuna</option>
            {comunas.map((c, idx) => (
              <option key={idx} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errors.comuna && <div className="invalid-feedback">{errors.comuna}</div>}
        </div>

        <div className="col-12">
          <input
            name="direccion"
            placeholder="Dirección"
            className={`form-control ${errors.direccion ? "is-invalid" : ""}`}
            value={formData.direccion}
            onChange={handleChange}
            required
          />
          {errors.direccion && (
            <div className="invalid-feedback">{errors.direccion}</div>
          )}
        </div>

        <div className="col-12">
          <input
            name="depto"
            placeholder="Casa, apartamento, etc. (opcional)"
            className="form-control"
            value={formData.depto}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <input
            name="codigoPostal"
            placeholder="Código postal (opcional)"
            className="form-control"
            value={formData.codigoPostal}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-check mt-3">
        <input
          className="form-check-input"
          type="checkbox"
          name="guardarInfo"
          checked={formData.guardarInfo}
          onChange={handleChange}
          id="guardarInfo"
        />
        <label className="form-check-label" htmlFor="guardarInfo">
          Guardar mi información para la próxima compra
        </label>
      </div>

      <h5 className="fw-semibold mb-3 border-bottom pb-2 mt-4">Método de Pago</h5>
      <div className="alert alert-info" role="alert">
        Pago al momento de la entrega (Transferencia o Efectivo)
      </div>

      <button type="submit" className="btn btn-success w-100 mt-4">
        Finalizar pedido
      </button>
    </form>
  );
};

export default CheckoutForm;
