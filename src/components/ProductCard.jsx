import { memo } from "react";
import { useCart } from "../context/CartContext";

const ProductCard = memo(({ product }) => {
  const { addToCart } = useCart();
  const { id, name, price, originalPrice, image } = product;
  const isOffer = price < originalPrice;


  const handleAddToCart = () => {
    addToCart(name, price, id, image);
  };

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 product-card">
      <div
        className="card h-100 border-0 shadow-sm hover-shadow transition-all"
        style={{ borderRadius: "1rem", overflow: "hidden" }}
      >
        <div
          className="position-relative d-flex align-items-center justify-content-center bg-white"
          style={{
            height: "230px",
            borderBottom: "1px solid #eee",
          }}
        >
          <img
            src={`/images/${image}`}
            alt={name}
            loading="lazy"
            style={{
              maxHeight: "100%",
              maxWidth: "100%",
              objectFit: "contain",
              padding: "10px",
              backgroundColor: "white",
            }}
          />
          {isOffer && (
            <span className="badge bg-danger position-absolute top-0 start-0 m-2 px-3 py-2">
              OFERTA
            </span>
          )}
        </div>

        <div className="card-body text-center d-flex flex-column justify-content-between">
          <div>
            <h5
              className="card-title fw-semibold mb-2 text-truncate"
              title={name}
            >
              {name}
            </h5>

            {isOffer && (
              <p className="text-muted text-decoration-line-through mb-1 small">
                ${originalPrice.toLocaleString("es-CL")}
              </p>
            )}

            <p
              className={`fw-bold fs-5 ${
                isOffer ? "text-success" : "text-dark"
              }`}
            >
              ${price.toLocaleString("es-CL")}
            </p>
          </div>

          <button
            className="btn btn-success w-100 mt-2 fw-semibold py-2 rounded-pill d-flex align-items-center justify-content-center"
            onClick={handleAddToCart}
          >
            <i className="bi bi-cart-plus me-2 fs-5"></i> Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
});

export default ProductCard;
