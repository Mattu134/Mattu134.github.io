import { memo, useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const ProductCard = memo(({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Normalización de datos
  const prodId = product.id ?? product._id;
  const prodName = product.nombre || product.name;
  const prodImage = product.imagen_url || product.imagenUrl || product.image;
  const prodPrice = product.precio ?? product.price;
  const prodOriginal = product.precio_original ?? product.originalPrice;
  // NUEVO: Detectamos si es granel (asegúrate que el backend mande este campo)
  const isBulk = product.esGranel || product.es_granel; 

  const isOffer = prodOriginal && prodPrice < prodOriginal;
  const fallbackImage = "https://via.placeholder.com/400x260?text=EcoMarket";

  const rawImage = prodImage && String(prodImage).trim() !== "" ? prodImage : fallbackImage;
  const isExternalImage = rawImage.startsWith("http");
  const imageSrc = isExternalImage ? rawImage : `/images/${rawImage}`;

  // NUEVO: Estado para la cantidad (Visual) ---
  // Si es granel, iniciamos en 500gr. Si es unidad, en 1.
  const [cantidad, setCantidad] = useState(isBulk ? 500 : 1);

  const handleCardClick = () => {
    if (!prodId) return;
    navigate(`/producto/${prodId}`);
  };

  // NUEVO: Función para agregar al carrito con la lógica de conversión ---
  const handleAddToCart = (e) => {
    e.stopPropagation();

    // Si es granel, convertimos gramos a Kilos (850gr -> 0.85 Kg)
    // Si es unidad, mandamos la cantidad tal cual (2 un -> 2)
    const finalQuantity = isBulk ? (cantidad / 1000) : cantidad;

    // IMPORTANTE: He actualizado esto para pasar el objeto completo o la cantidad.
    // Aquí paso los datos individuales + la cantidad calculada.
    addToCart({
        id: prodId,
        nombre: prodName,
        precio: prodPrice,
        imagen: rawImage,
        esGranel: isBulk // Importante para mostrar "Kg" o "Un" en el carrito
    }, finalQuantity);
  };

  // Cálculo visual del subtotal para el botón
  const subtotalVisual = isBulk 
    ? (prodPrice * cantidad) / 1000 // Precio por Kilo * (Gramos/1000)
    : prodPrice * cantidad;

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
        {/* --- Imagen del Producto --- */}
        <div
          className="position-relative d-flex align-items-center justify-content-center bg-white"
          style={{ height: "230px", borderBottom: "1px solid #eee" }}
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

        {/* --- Cuerpo de la Tarjeta --- */}
        <div className="card-body text-center d-flex flex-column justify-content-between">
          <div>
            <h5 className="card-title fw-semibold mb-2 text-truncate" title={prodName}>
              {prodName}
            </h5>

            {isOffer && (
              <p className="text-muted text-decoration-line-through mb-1 small">
                ${prodOriginal.toLocaleString("es-CL")}
              </p>
            )}

            <p className={`fw-bold fs-5 ${isOffer ? "text-success" : "text-dark"}`}>
              ${prodPrice.toLocaleString("es-CL")}
              {/* Mostramos si es por Kg o Unidad */}
              <span className="text-muted fs-6 fw-normal"> / {isBulk ? 'Kg' : 'Un'}</span>
            </p>
          </div>

          {/* --- NUEVO: Selector de Cantidad --- */}
          <div className="mt-3 mb-2" onClick={(e) => e.stopPropagation()}>
            {isBulk ? (
              // Lógica GRANEL (Input de Gramos)
              <div className="input-group input-group-sm justify-content-center">
                <span className="input-group-text bg-white border-end-0">Gr:</span>
                <input
                  type="number"
                  className="form-control text-center"
                  style={{ maxWidth: "80px" }}
                  step="50"
                  min="50"
                  value={cantidad}
                  onChange={(e) => setCantidad(Number(e.target.value))}
                />
              </div>
            ) : (
              // Lógica UNIDAD (Botones +/-)
              <div className="d-flex justify-content-center align-items-center gap-2">
                <button 
                  className="btn btn-sm btn-outline-secondary rounded-circle"
                  style={{width: '30px', height: '30px', padding: 0}}
                  onClick={() => setCantidad(c => Math.max(1, c - 1))}
                >-</button>
                <span className="fw-bold" style={{minWidth: '20px'}}>{cantidad}</span>
                <button 
                  className="btn btn-sm btn-outline-secondary rounded-circle"
                  style={{width: '30px', height: '30px', padding: 0}}
                  onClick={() => setCantidad(c => c + 1)}
                >+</button>
              </div>
            )}
          </div>

          {/* Botón Agregar */}
          <button
            className="btn btn-success w-100 mt-2 fw-semibold py-2 rounded-pill d-flex align-items-center justify-content-center"
            onClick={handleAddToCart}
          >
            <i className="bi bi-cart-plus me-2 fs-5"></i> 
            {/* Mostramos el total calculado en el botón */}
            Agregar ${Math.round(subtotalVisual).toLocaleString("es-CL")}
          </button>
        </div>
      </div>
    </div>
  );
});

export default ProductCard;