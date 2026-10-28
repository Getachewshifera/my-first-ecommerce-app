import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import products from '../data/products';

const Home = () => <main><section className="hero"><div className="hero-copy"><span className="eyebrow">The everyday edit</span><h1>Make room for <em>good</em> things.</h1><p>Thoughtful goods for living well, selected with care and made to be used.</p><Link className="button button-dark" to="/shop">Shop the collection <span className="button-icon" aria-hidden="true">→</span></Link></div><div className="hero-image"><img src={products[1].image} alt="Leather tote on a chair" /><span className="image-caption">New season / 01</span></div></section><section className="container featured"><div className="section-heading"><div><span className="eyebrow">Curated for you</span><h2>Best sellers</h2></div><Link className="text-action" to="/shop">View all <span className="button-icon" aria-hidden="true">→</span></Link></div><div className="product-grid">{products.slice(0, 4).map((product) => <ProductCard key={product.id} product={product} />)}</div></section><section className="quote-section"><p>“Beautiful objects don’t need to shout.”</p><span>— The ShopEase edit</span></section></main>;

export default Home;
