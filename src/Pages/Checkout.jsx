import { useCart } from "../context/CartContext";
import CheckoutForm from "../components/CheckoutForm";

const Checkout = () => {
  const { cart = [], totalAmount = 0 } = useCart(); 

  const handleSubmit = (formData) => {
    console.log("Datos del pedido:", formData);
    console.log("Pedido enviado correctamente."); 
    
  };

  return (
    <div className="container py-5">
      <div className="row g-4">
        {cart.length === 0 ? (
           <div className="col-12 text-center py-5">
              <i className="bi bi-cart-x display-1 text-muted"></i>
              <h3 className="mt-3">Tu carrito está vacío.</h3>
              <p className="text-muted">Agrega productos antes de ir al pago.</p>
              <a href="/" className="btn btn-success mt-3">Volver a la tienda</a>
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
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="d-flex align-items-center mb-3 border-bottom pb-2"
                    >
                      <img
                        src={item.image ? `/images/${item.image}` : "/images/placeholder.png"}
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
                          {item.quantity} x ${item.price.toLocaleString("es-CL")}
                        </small>
                      </div>
                      <p className="mb-0 fw-bold">
                        ${(item.price * item.quantity).toLocaleString("es-CL")}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="d-flex justify-content-between fw-bold mt-3 border-top pt-3">
                  <span>Total:</span>
                  <span className="text-success">${totalAmount.toLocaleString("es-CL")}</span>
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
