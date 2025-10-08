// src/components/ProductCard.jsx
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { id, name, price, originalPrice, image } = product;
  const isOffer = price < originalPrice;

  const imageUrl = `/images/${image}`; 

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 product-card"> 
      <div className="card h-100 shadow-sm">
        {}
        <img 
          src={imageUrl} 
          className="card-img-top" 
          alt={name} 
          loading="lazy" 
        />
        <div className="card-body text-center">
          <h5 className="card-title">{name}</h5>
          {isOffer && <p className="text-muted text-decoration-line-through mb-1">Precio: ${originalPrice.toLocaleString('es-CL')}</p>}
          <p className="text-success fw-bold fs-5">Oferta: ${price.toLocaleString('es-CL')}</p>
          <button
            className="btn btn-success w-100 add-to-cart"
            onClick={() => addToCart(name, price, id)} 
          >
            <i className="bi bi-cart-plus"></i> Agregar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;