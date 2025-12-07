import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import { fetchProductById } from "../services/productServices";

const fallbackImage = "https://via.placeholder.com/400x260?text=EcoMarket";

function ProductoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    const idStr = String(id);

    const local = products.find((p) => String(p.id) === idStr);
    if (local) {
      setProduct(local);
      setLoading(false);
    }

    const load = async () => {
      try {
        const data = await fetchProductById(idStr);
        if (mounted) setProduct(data);
      } catch (err) {
        console.error(err);
        if (mounted && !local) {
          setError("No se pudo cargar el producto.");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, [id, products]);

  const view = useMemo(() => {
    if (!product) return null;

    const nombre = product.nombre;
    const descripcion = product.descripcion;
    const categoria = product.categoria;
    const precio = product.precio ?? 0;
    const precioOriginal = product.precio_original;

    const imagen =
      product.imagenUrl || product.imagen_url || product.image || "";
    const rawImage =
      imagen && String(imagen).trim() !== "" ? imagen : fallbackImage;
    const isExternal = rawImage.startsWith("http");
    const imageSrc = isExternal ? rawImage : `/images/${rawImage}`;

    return {
      nombre,
      descripcion,
      categoria,
      precio,
      precioOriginal,
      imageSrc,
      rawImage,
      stock: product.stock,
    };
  }, [product]);

  if (loading && !product) {
    return (
      <div className="container py-5">
        <p className="text-center">Cargando producto...</p>
      </div>
    );
  }

  if (error || !product || !view) {
    return (
      <div className="container py-5 text-center">
        <h3 className="mb-3">Producto no disponible</h3>
        <p className="text-muted mb-4">
          {error || "No encontramos el producto que estás buscando."}
        </p>
        <button className="btn btn-success" onClick={() => navigate(-1)}>
          Volver
        </button>
      </div>
    );
  }

  const {
    nombre,
    descripcion,
    categoria,
    precio,
    precioOriginal,
    imageSrc,
    rawImage,
    stock,
  } = view;
  const isOffer = precioOriginal && precio < precioOriginal;

  const handleAddToCart = () => {
    const prodId = product.id;
    addToCart(nombre, precio, prodId, rawImage);
  };

  return (
    <div className="container py-5">
      <div className="mb-3">
        <button
          type="button"
          className="btn btn-outline-success rounded-pill d-inline-flex align-items-center shadow-sm px-3 py-1"
          onClick={() => navigate(-1)}
        >
          <i className="bi bi-arrow-left me-2"></i>
          <span>Volver a la tienda</span>
        </button>
      </div>

      <div className="row g-4">
        <div className="col-md-5">
          <div className="card shadow-sm border-0 h-100">
            <div
              className="d-flex align-items-center justify-content-center bg-white"
              style={{ height: "320px", borderRadius: "1rem" }}
            >
              <img
                src={imageSrc}
                alt={nombre}
                className="img-fluid"
                style={{
                  maxHeight: "100%",
                  maxWidth: "100%",
                  objectFit: "contain",
                  padding: "16px",
                }}
              />
            </div>
          </div>
        </div>
        <div className="col-md-7">
          <h1 className="h3 fw-bold mb-2">{nombre}</h1>

          {categoria && (
            <p className="text-muted mb-2">
              Categoría: <span className="fw-semibold">{categoria}</span>
            </p>
          )}

          <div className="mb-3">
            {isOffer && (
              <p className="text-muted text-decoration-line-through mb-1 small">
                ${precioOriginal.toLocaleString("es-CL")}
              </p>
            )}
            <p
              className={`fw-bold fs-3 ${
                isOffer ? "text-success" : "text-dark"
              }`}
            >
              ${precio.toLocaleString("es-CL")}
            </p>
          </div>

          {descripcion && (
            <div className="mb-3">
              <h5 className="fw-semibold mb-2">Descripción del producto</h5>
              <p className="text-muted" style={{ whiteSpace: "pre-line" }}>
                {descripcion}
              </p>
            </div>
          )}

          {typeof stock === "number" && (
            <p className="text-muted small mb-3">
              <strong>Stock disponible: </strong>
              {stock} unidad(es)
            </p>
          )}

          <div className="d-flex flex-wrap gap-2">
            <button
              className="btn btn-success btn-lg px-4 d-flex align-items-center"
              onClick={handleAddToCart}
            >
              <i className="bi bi-cart-plus me-2"></i>
              Agregar al carrito
            </button>

            <button
              className="btn btn-outline-secondary"
              onClick={() => navigate("/")}
            >
              Seguir comprando
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductoDetalle;
