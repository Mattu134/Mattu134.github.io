import { memo } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const ProductCard = memo(({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const prodId = product.id ?? product._id;
  const prodName = product.nombre || product.name;
  const prodImage = product.imagen_url || product.imagenUrl || product.image;
  const prodPrice = product.precio ?? product.price;
  const prodOriginal = product.precio_original ?? product.originalPrice;

  const isOffer = prodOriginal && prodPrice < prodOriginal;
  const fallbackImage =
    "https://via.placeholder.com/400x260?text=EcoMarket";

  const rawImage =
    prodImage && String(prodImage).trim() !== "" ? prodImage : fallbackImage;
  const isExternalImage = rawImage.startsWith("http");
  const imageSrc = isExternalImage ? rawImage : `/images/${rawImage}`;

  const handleCardClick = () => {
    if (!prodId) return; 
    navigate(`/producto/${prodId}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(prodName, prodPrice, prodId, rawImage);
  };

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 product-card">
      <div
        className="card product-card-item h-100 border-0 shadow-sm transition-all"
        style={{
          borderRadius: "1rem",
          overflow: "hidden",
          cursor: prodId ? "pointer" : "default",
        }}
        onClick={handleCardClick}
      >
        <div
          className="position-relative d-flex align-items-center justify-content-center bg-white"
          style={{
            height: "230px",
            borderBottom: "1px solid #eee",
          }}
        >
          <img
            src={imageSrc}
            alt={prodName}
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
              title={prodName}
            >
              {prodName}
            </h5>

            {isOffer && (
              <p className="text-muted text-decoration-line-through mb-1 small">
                ${prodOriginal.toLocaleString("es-CL")}
              </p>
            )}

            <p
              className={`fw-bold fs-5 ${
                isOffer ? "text-success" : "text-dark"
              }`}
            >
              ${prodPrice.toLocaleString("es-CL")}
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
