import { useEffect, useMemo, useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { crearBoleta } from "../services/BoletaService";
import { useAuth } from "../context/AuthContext";

function calcularTotalesCarrito(cart) {
  let subtotal = 0;
  let ivaTotal = 0;

  cart.forEach((item) => {
    const cantidad = item.quantity || 0;
    const precioFinal = item.price || 0;
    const lineTotal = cantidad * precioFinal;

    const ivaPorcentaje =
      typeof item.iva === "number" && item.iva >= 0 ? item.iva : 19;

    const baseLinea = Math.round(lineTotal / (1 + ivaPorcentaje / 100));
    const ivaLinea = lineTotal - baseLinea;

    subtotal += baseLinea;
    ivaTotal += ivaLinea;
  });

  return { subtotal, ivaTotal, total: subtotal + ivaTotal };
}

function calcularTotalesBoleta(boleta) {
  if (!boleta || !Array.isArray(boleta.items)) {
    return { subtotal: 0, ivaTotal: 0, total: boleta?.total || 0 };
  }

  let subtotal = 0;
  let ivaTotal = 0;

  boleta.items.forEach((item) => {
    const cantidad = item.cantidad || 0;
    const precioFinal = item.precioUnitario || 0;
    const lineTotal = cantidad * precioFinal;

    const ivaPorcentaje =
      typeof item.iva === "number" && item.iva >= 0 ? item.iva : 19;

    const baseLinea = Math.round(lineTotal / (1 + ivaPorcentaje / 100));
    const ivaLinea = lineTotal - baseLinea;

    subtotal += baseLinea;
    ivaTotal += ivaLinea;
  });

  const total = boleta.total ?? subtotal + ivaTotal;
  return { subtotal, ivaTotal, total };
}

const Checkout = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const cartCtx = useCart();
  const cart = cartCtx?.cart || [];
  const totalAmount = cartCtx?.totalAmount || 0;
  const resetCart = cartCtx?.resetCart || cartCtx?.clearCart || (() => {});

  const [showNotification, setShowNotification] = useState(false);
  const [error, setError] = useState(null);
  const [errorInfo, setErrorInfo] = useState(null);
  const [boleta, setBoleta] = useState(null);

  const { subtotal, ivaTotal, total } = useMemo(
    () => calcularTotalesCarrito(cart),
    [cart]
  );

  const [direccionUsuario, setDireccionUsuario] = useState({
    region: "",
    comuna: "",
    direccion: "",
    tipoDireccion: "",
    codigoPostal: "",
  });

  useEffect(() => {
    setDireccionUsuario({
      region: user?.region || "",
      comuna: user?.comuna || "",
      direccion: user?.direccion || "",
      tipoDireccion: user?.tipoDireccion || user?.tipodireccion || "",
      codigoPostal: user?.codigoPostal || user?.codigopostal || "",
    });
  }, [user]);

  const handleProcesarPago = async (e) => {
    e.preventDefault();
    setShowNotification(false);
    setError(null);
    setErrorInfo(null);
    setBoleta(null);

    try {
      if (!cart || cart.length === 0) {
        throw new Error("No hay productos en el carrito para procesar el pago.");
      }

      const sinStock = cart.filter(
        (item) => typeof item.stock === "number" && item.quantity > item.stock
      );

      if (sinStock.length > 0) {
        throw new Error("Producto sin stock");
      }

      if (!direccionUsuario.direccion?.trim()) {
        throw new Error(
          "Tu cuenta no tiene dirección registrada. Ve a tu perfil y completa tu dirección."
        );
      }
      if (!direccionUsuario.tipoDireccion?.trim()) {
        throw new Error(
          "Tu cuenta no tiene tipo de dirección registrado. Ve a tu perfil y completa tu dirección."
        );
      }

      const nombreUser = user?.nombre || user?.name || "";
      const apellidosUser = user?.apellidos || "";
      const correoUser = user?.correo || user?.email || "";
      const rutUser = user?.rut || "";
      const telefonoUser = user?.telefono || "";

      if (!nombreUser || !correoUser) {
        throw new Error(
          "No se encontraron datos básicos del usuario (nombre/correo). Re-inicia sesión."
        );
      }

      const boletaPayload = {
        cliente: {
          nombre: nombreUser,
          apellidos: apellidosUser,
          email: correoUser,
          rut: rutUser,
          telefono: telefonoUser,

          region: direccionUsuario.region?.trim() || "",
          comuna: direccionUsuario.comuna?.trim() || "",
          direccion: direccionUsuario.direccion.trim(),

          tipoDireccion: direccionUsuario.tipoDireccion.trim(),
          codigoPostal: direccionUsuario.codigoPostal?.trim() || null,
        },
        total: totalAmount,
        items: cart.map((item) => ({
          productoId: item.id,
          nombre: item.nombre || item.name,
          cantidad: item.quantity,
          precioUnitario: item.price,
        })),
      };

      const boletaCreada = await crearBoleta(boletaPayload);

      setBoleta(boletaCreada);
      setShowNotification(true);
      if (typeof resetCart === "function") resetCart();
    } catch (err) {
      console.error("Error en el proceso de pago / boleta:", err);

      const status = err?.response?.status;
      const data = err?.response?.data;

      const backendMessage =
        data?.message ||
        data?.error ||
        data?.detalle ||
        data?.details ||
        (typeof data === "string" ? data : "") ||
        err.message;

      const finalMessage = status
        ? `Error ${status} al procesar el pago: ${backendMessage}`
        : backendMessage ||
          "Ocurrió un error al procesar el pago. Por favor, inténtalo nuevamente.";

      setError(finalMessage);
      setErrorInfo({ status, data });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card shadow-sm border-0 p-4 text-center">
              <h2 className="fw-bold mb-3">Necesitas una cuenta para continuar</h2>
              <p className="text-muted mb-4">
                Para finalizar tu compra, primero debes registrarte en EcoMarket.
              </p>
              <button
                className="btn btn-success me-2"
                onClick={() => navigate("/registro")}
              >
                Regístrate
              </button>
              <button
                className="btn btn-outline-secondary"
                onClick={() => navigate("/login")}
              >
                Ya tengo cuenta
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow-sm border-0 p-4 text-center">
              <div className="mb-3">
                <i className="bi bi-exclamation-triangle-fill text-danger display-3"></i>
              </div>
              <h2 className="fw-bold mb-3">Hubo un problema con tu compra</h2>
              <p className="text-muted mb-4">{error}</p>

              <div className="d-flex flex-column flex-md-row justify-content-center gap-2 mt-4">
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setError(null)}
                >
                  Volver al resumen del pedido
                </button>
                <button className="btn btn-success" onClick={() => navigate("/")}>
                  Ir al inicio
                </button>
              </div>

              <p className="mt-3 mb-0 text-muted small">
                Si el problema persiste, puedes contactarnos en{" "}
                <strong>ecomarket@contacto.cl</strong>.
              </p>

              {errorInfo && (
                <pre className="text-start mt-3 small text-muted">
                  {JSON.stringify(errorInfo, null, 2)}
                </pre>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (boleta) {
    const { subtotal: subB, ivaTotal: ivaB, total: totalB } =
      calcularTotalesBoleta(boleta);

    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow-sm border-0 p-4">
              <div className="text-center mb-4">
                <i className="bi bi-check-circle-fill text-success display-3"></i>
                <h2 className="fw-bold mt-3">¡Compra realizada con éxito!</h2>
                <p className="text-muted mb-0">
                  Gracias por preferir <strong>EcoMarket</strong>.
                </p>
              </div>

              <hr />

              <div className="mb-3">
                <h5 className="fw-bold">Boleta #{boleta.id}</h5>
                <p className="text-muted mb-1">
                  Fecha:{" "}
                  {boleta.fecha
                    ? new Date(boleta.fecha).toLocaleString("es-CL")
                    : "—"}
                </p>
                <p className="text-muted mb-1">
                  Cliente: {boleta.cliente?.nombre || "—"}{" "}
                  {boleta.cliente?.apellidos || ""}
                </p>
                <p className="text-muted mb-0">
                  Email: {boleta.cliente?.email || "—"}
                </p>
              </div>

              <div className="mt-3">
                <h6 className="fw-bold mb-2">Detalle de la compra</h6>
                <div className="list-group">
                  {boleta.items?.map((item, idx) => (
                    <div
                      key={idx}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <p className="mb-1 fw-semibold">{item.nombre}</p>
                        <small className="text-muted">
                          {item.cantidad} x $
                          {item.precioUnitario.toLocaleString("es-CL")}
                        </small>
                      </div>
                      <span className="fw-bold">
                        $
                        {(item.cantidad * item.precioUnitario).toLocaleString(
                          "es-CL"
                        )}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-3 border-top pt-3">
                  <div className="d-flex justify-content-between">
                    <span className="text-muted small">Subtotal (sin IVA):</span>
                    <span className="small">
                      ${subB.toLocaleString("es-CL")}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted small">IVA incluido:</span>
                    <span className="small">
                      ${ivaB.toLocaleString("es-CL")}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between fw-bold mt-2">
                    <span>Total pagado:</span>
                    <span className="text-success">
                      ${totalB.toLocaleString("es-CL")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-center mt-4">
                <button className="btn btn-success" onClick={() => navigate("/")}>
                  Volver al inicio
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const roClass = "form-control bg-light";
  const roProps = { readOnly: true };

  return (
    <div className="container py-5">
      {showNotification && (
        <div className={`notification ${showNotification ? "show" : ""}`}>
          Compra realizada con éxito
        </div>
      )}

      <div className="row g-4">
        {cart.length === 0 ? (
          <div className="col-12 text-center py-5">
            <i className="bi bi-cart-x display-1 text-muted"></i>
            <h3 className="mt-3">Tu carrito está vacío.</h3>
            <p className="text-muted">Agrega productos antes de ir al pago.</p>
            <button className="btn btn-success mt-3" onClick={() => navigate("/")}>
              Volver a la tienda
            </button>
          </div>
        ) : (
          <>
            <div className="col-lg-7">
              <h2 className="mb-4 fw-bold">Confirmar datos y dirección de envío</h2>
              <div className="card shadow-sm p-3">
                <h5 className="fw-bold mb-3">Confirmación</h5>

                <form className="row g-3" onSubmit={handleProcesarPago}>
                  <div className="col-md-6">
                    <label className="form-label">Nombre</label>
                    <input
                      type="text"
                      className={roClass}
                      value={user?.nombre || user?.name || "—"}
                      {...roProps}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Apellidos</label>
                    <input
                      type="text"
                      className={roClass}
                      value={user?.apellidos || "—"}
                      {...roProps}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Correo electrónico</label>
                    <input
                      type="email"
                      className={roClass}
                      value={user?.correo || user?.email || "—"}
                      {...roProps}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Teléfono</label>
                    <input
                      type="text"
                      className={roClass}
                      value={user?.telefono || "—"}
                      {...roProps}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">RUT</label>
                    <input
                      type="text"
                      className={roClass}
                      value={user?.rut || "—"}
                      {...roProps}
                    />
                  </div>

                  <hr className="my-2" />

                  <div className="col-md-6">
                    <label className="form-label">Región</label>
                    <input
                      type="text"
                      className={roClass}
                      value={direccionUsuario.region}
                      {...roProps}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Comuna</label>
                    <input
                      type="text"
                      className={roClass}
                      value={direccionUsuario.comuna}
                      {...roProps}
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label">Dirección</label>
                    <input
                      type="text"
                      className={roClass}
                      value={direccionUsuario.direccion}
                      {...roProps}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Tipo de dirección</label>
                    <input
                      type="text"
                      className={roClass}
                      value={direccionUsuario.tipoDireccion}
                      {...roProps}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Código postal (opcional)</label>
                    <input
                      type="text"
                      className={roClass}
                      value={direccionUsuario.codigoPostal || ""}
                      {...roProps}
                    />
                  </div>

                  <div className="col-12 d-flex justify-content-between mt-3">
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => navigate("/")}
                    >
                      Cancelar
                    </button>
                    <button type="submit" className="btn btn-success">
                      Confirmar y pagar
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="card shadow-sm p-3">
                <h5 className="fw-bold mb-3">Resumen del pedido</h5>

              <div className="list-group">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="d-flex align-items-center mb-3 border-bottom pb-2"
                >
                  <img
                    src={
                      item.imagen ||
                      item.image ||
                      item.img ||
                      item.urlImagen ||
                      item.imagenUrl ||
                      "https://via.placeholder.com/60"
                    }
                    alt={item.name}
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginRight: "12px",
                      border: "1px solid #e5e5e5",
                    }}
                  />
                  <div className="flex-grow-1">
                    <p className="mb-1 fw-semibold">{item.name}</p>
                    <small className="text-muted d-block">
                      {item.quantity} x ${item.price.toLocaleString("es-CL")}
                    </small>
                  </div>

                  <p className="mb-0 fw-bold">
                    ${(item.price * item.quantity).toLocaleString("es-CL")}
                  </p>
                </div>
              ))}
            </div>


                <div className="mt-3 border-top pt-3">
                  <div className="d-flex justify-content-between">
                    <span className="text-muted small">Subtotal (sin IVA):</span>
                    <span className="small">${subtotal.toLocaleString("es-CL")}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted small">IVA incluido:</span>
                    <span className="small">${ivaTotal.toLocaleString("es-CL")}</span>
                  </div>
                  <div className="d-flex justify-content-between fw-bold mt-2">
                    <span>Total:</span>
                    <span className="text-success">${total.toLocaleString("es-CL")}</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Checkout;
