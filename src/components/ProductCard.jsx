import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { id, name, price, originalPrice, image } = product;
  const isOffer = price < originalPrice;

<<<<<<< HEAD
  const imageUrl = `/images/${image}`;
  
=======
  // Ruta absoluta para la imagen, asumiendo que el archivo está en /public/images
  const imageUrl = `/images/${image}`; 
>>>>>>> f77728c43aaa4fbe583282363bc9707c467b9dc9

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 product-card">
      <div className="card h-100 shadow-sm">
<<<<<<< HEAD
        {}
        <img
          src={imageUrl}
          className="card-img-top"
          alt={name}
          loading="lazy"
=======
        
        <img 
          src={imageUrl} 
          className="card-img-top" 
          alt={name} 
          loading="lazy" 
>>>>>>> f77728c43aaa4fbe583282363bc9707c467b9dc9
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