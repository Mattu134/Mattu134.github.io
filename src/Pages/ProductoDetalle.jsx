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
  
  // --- NUEVO: Estado para manejar la cantidad a comprar ---
  const [cantidad, setCantidad] = useState(1);

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

  // --- NUEVO: Efecto para reiniciar la cantidad según el tipo de producto ---
  useEffect(() => {
    if (product) {
        // Si es a granel iniciamos en 500gr, si no en 1 unidad
        setCantidad(product.esGranel ? 500 : 1);
    }
  }, [product]);

  const view = useMemo(() => {
    if (!product) return null;

    const nombre = product.nombre;
    const descripcion = product.descripcion;
    const categoria = product.categoria;
    const precio = product.precio ?? 0;
    const precioOriginal = product.precio_original;
    // --- NUEVO: Extraemos la bandera de granel
    const esGranel = product.esGranel || product.es_granel; 

    const imagen =
      product.imagenUrl || product.imagen_url || product.image || "";
    const rawImage =
      imagen && String(imagen).trim() !== "" ? imagen : fallbackImage;
    const isExternal = rawImage.startsWith("http");
    const imageSrc = isExternal ? rawImage : `/images/${rawImage}`;

    return {
      id: product.id, // Aseguramos tener el ID aquí
      nombre,
      descripcion,
      categoria,
      precio,
      precioOriginal,
      imageSrc,
      rawImage,
      stock: product.stock,
      esGranel, // La pasamos a la vista
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
    esGranel
  } = view;
  
  const isOffer = precioOriginal && precio < precioOriginal;

  // --- NUEVO: Cálculo del subtotal visual ---
  const subtotalVisual = esGranel 
      ? (precio * cantidad) / 1000 
      : precio * cantidad;

  // --- NUEVO: Función addToCart corregida ---
  const handleAddToCart = () => {
    // Si es granel, convertimos a Kilos (ej: 500gr -> 0.5kg)
    const cantidadFinal = esGranel ? (cantidad / 1000) : cantidad;

    addToCart({
        id: view.id,
        nombre: nombre,
        precio: precio,
        imagen: rawImage,
        esGranel: esGranel
    }, cantidadFinal); // Pasamos el objeto y la cantidad por separado
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
              {/* Indicador de unidad de medida */}
              <span className="fs-6 text-muted fw-normal"> {esGranel ? '/ Kg' : ' c/u'}</span>
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
              {/* Formateamos el stock para que no se vea raro (ej: 50.5 Kg) */}
              {stock} {esGranel ? 'Kg' : 'unidad(es)'}
            </p>
          )}

          {/* --- NUEVO: Selector de Cantidad --- */}
          <div className="p-3 bg-light rounded mb-4 border">
             <label className="fw-bold mb-2 d-block">Selecciona cantidad:</label>
             
             {esGranel ? (
                // MODO GRANEL: Input de gramos
                <div className="d-flex align-items-center flex-wrap gap-3">
                    <div className="input-group" style={{maxWidth: '200px'}}>
                        <input 
                            type="number" 
                            className="form-control"
                            step="50"
                            min="50"
                            value={cantidad}
                            onChange={(e) => setCantidad(Number(e.target.value))}
                        />
                        <span className="input-group-text">gr</span>
                    </div>
                    <span className="text-muted">
                        Equivale a: <strong>{(cantidad / 1000).toFixed(3)} Kg</strong>
                    </span>
                </div>
             ) : (
                // MODO UNIDAD: Botones +/-
                <div className="d-flex align-items-center gap-3">
                    <button 
                        className="btn btn-outline-secondary" 
                        onClick={() => setCantidad(c => Math.max(1, c - 1))}
                    >−</button>
                    <span className="fs-4 fw-bold" style={{minWidth: '40px', textAlign: 'center'}}>
                        {cantidad}
                    </span>
                    <button 
                        className="btn btn-outline-secondary" 
                        onClick={() => setCantidad(c => c + 1)}
                    >+</button>
                </div>
             )}
             
             <div className="mt-2 text-end">
                <small className="text-muted">Subtotal: </small>
                <span className="fw-bold text-success fs-5">
                    ${Math.round(subtotalVisual).toLocaleString("es-CL")}
                </span>
             </div>
          </div>

          <div className="d-flex flex-wrap gap-2">
            <button
              className="btn btn-success btn-lg px-4 d-flex align-items-center flex-grow-1 justify-content-center"
              onClick={handleAddToCart}
              disabled={stock <= 0}
            >
              <i className="bi bi-cart-plus me-2"></i>
              {stock > 0 ? 'Agregar al carrito' : 'Sin Stock'}
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