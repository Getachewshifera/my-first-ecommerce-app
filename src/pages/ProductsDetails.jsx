import { Link, useParams } from "react-router-dom";
import { useCart } from "../App";
import products from "../data/products";

const ProductsDetails = () => {
  const { id } = useParams();
  const product = products.find((item) => item.id === Number(id));
  const { addToCart } = useCart();
  if (!product)
    return (
      <main className="container empty-state">
        <h1>Product not found.</h1>
        <Link className="button button-dark" to="/shop">
          <span className="button-icon" aria-hidden="true">
            ←
          </span>{" "}
          Back to shop
        </Link>
      </main>
    );
  return (
    <main className="container detail-page">
      <div className="detail-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="detail-copy">
        <span className="eyebrow">{product.category}</span>
        <h1>{product.name}</h1>
        <div className="detail-rating">
          ★ {product.rating} <span>· Free shipping over $100</span>
        </div>
        <p className="detail-price">${product.price.toFixed(2)}</p>
        <p className="lead">{product.description}</p>
        <button
          className="button button-dark button-wide"
          onClick={() => addToCart(product)}
        >
          <span className="button-icon" aria-hidden="true">
            +
          </span>{" "}
          Add to bag
        </button>
        <div className="detail-notes">
          <p>
            <strong>Designed to last</strong>
            <br />
            Made with considered materials and careful attention to detail.
          </p>
          <p>
            <strong>Easy returns</strong>
            <br />
            Not quite right? Return it within 30 days, no questions asked.
          </p>
        </div>
      </div>
    </main>
  );
};

export default ProductsDetails;
