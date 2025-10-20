import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { id, name, price, originalPrice, image } = product;
  const isOffer = price < originalPrice;

  // Ruta absoluta para la imagen, asumiendo que los archivos están en /public/images
  const imageUrl = `/images/${image}`;

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 product-card">
      <div className="card h-100 shadow-sm border-0">
        <img
          src={imageUrl}
          className="card-img-top rounded-top"
          alt={name}
          loading="lazy"
        />
        <div className="card-body text-center">
          <h5 className="card-title fw-semibold mb-2">{name}</h5>

          {isOffer && (
            <p className="text-muted text-decoration-line-through mb-1">
              Precio: ${originalPrice.toLocaleString('es-CL')}
            </p>
          )}

          <p className="text-success fw-bold fs-5">
            ${price.toLocaleString('es-CL')}
          </p>

          <button
            className="btn btn-success w-100 mt-2 add-to-cart"
            onClick={() => addToCart(name, price, id)}
          >
            <i className="bi bi-cart-plus me-2"></i> Agregar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
