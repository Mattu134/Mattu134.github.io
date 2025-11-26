import { useState } from "react";
import { useCart } from "../context/CartContext";
import CheckoutForm from "../components/CheckoutForm";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart = [], totalAmount = 0 } = useCart();
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    setShowNotification(false);
    setError(null);

    try {
      if (!cart || cart.length === 0) {
        throw new Error("No hay productos en el carrito para procesar el pago.");
      }
      const sinStock = cart.filter(
        (item) =>
          typeof item.stock === "number" && item.quantity > item.stock
      );

      if (sinStock.length > 0) {
        const nombres = sinStock.map((i) => i.name).join(", ");
        throw new Error(
          `No hay stock suficiente para los siguientes productos: ${nombres}.`
        );
      }


      console.log("Datos del pedido:", formData);
      console.log("Pedido enviado correctamente.");
      setShowNotification(true);

      setTimeout(() => {
        setShowNotification(false);
        navigate("/");
      }, 1000);
    } catch (err) {
      console.error("Error en el proceso de pago:", err);
      setError(
        err.message ||
          "Ocurrió un error al procesar el pago. Por favor, inténtalo nuevamente."
      );
    }
  };
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

              <div className="d-flex flex-column flex-md-row justify-content-center gap-2">
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setError(null)}
                >
                  Volver al resumen del pedido
                </button>
                <button
                  className="btn btn-success"
                  onClick={() => navigate("/")}
                >
                  Ir al inicio
                </button>
              </div>

              <p className="mt-3 mb-0 text-muted small">
                Si el problema persiste, puedes contactarnos en{" "}
                <strong>ecomarket@contacto.cl</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
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
            <a href="/" className="btn btn-success mt-3">
              Volver a la tienda
            </a>
          </div>
        ) : (
          <>
            <div className="col-lg-7">
              <h2 className="mb-4 fw-bold">Información de envío y pago</h2>
              <CheckoutForm onSubmit={handleSubmit} />
            </div>

            <div className="col-lg-5">
              <div className="card shadow-sm p-3">
                <h5 className="fw-bold mb-3">Resumen del pedido</h5>

                <div className="list-group">
                  {cart.map((item) => {
                    const isExternalImage =
                      item.image && item.image.startsWith("http");
                    const imageSrc = item.image
                      ? isExternalImage
                        ? item.image
                        : `/images/${item.image}`
                      : "/images/placeholder.png";

                    return (
                      <div
                        key={item.id}
                        className="d-flex align-items-center mb-3 border-bottom pb-2"
                      >
                        <img
                          src={imageSrc}
                          alt={item.name || "Producto"}
                          width="60"
                          height="60"
                          style={{
                            objectFit: "contain",
                            backgroundColor: "#fff",
                            borderRadius: "8px",
                            border: "1px solid #eee",
                          }}
                          className="me-3"
                        />
                        <div className="flex-grow-1">
                          <p className="mb-1 fw-semibold">{item.name}</p>
                          <small className="text-muted">
                            {item.quantity} x $
                            {item.price.toLocaleString("es-CL")}
                          </small>
                        </div>
                        <p className="mb-0 fw-bold">
                          $
                          {(item.price * item.quantity).toLocaleString("es-CL")}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="d-flex justify-content-between fw-bold mt-3 border-top pt-3">
                  <span>Total:</span>
                  <span className="text-success">
                    ${totalAmount.toLocaleString("es-CL")}
                  </span>
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
