import { Link } from "react-router-dom";
import { useCart } from "../App";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  return (
    <article className="product-card">
      <div className="product-image">
        <Link to={`/product/${product.id}`}>
          <img src={product.image} alt={product.name} />
        </Link>
        {product.badge && <span className="badge">{product.badge}</span>}
        <button className="quick-add" onClick={() => addToCart(product)}>
          <span aria-hidden="true">+</span> Add to bag
        </button>
      </div>
      <div className="product-meta">
        <div>
          <span className="muted">{product.category}</span>
          <Link to={`/product/${product.id}`}>
            <h3>{product.name}</h3>
          </Link>
        </div>
        <strong>${product.price.toFixed(2)}</strong>
      </div>
      <span className="rating">★ {product.rating}</span>
    </article>
  );
};

export default ProductCard;
