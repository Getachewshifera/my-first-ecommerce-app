import { Link } from 'react-router-dom';

const Footer = () => <footer><div className="footer-inner"><div><Link className="navbar-logo" to="/">Shop<span>Ease</span></Link><p>Good things for everyday living.</p></div><div className="footer-links"><Link to="/shop">Shop all</Link><Link to="/about">Our story</Link><Link to="/contact">Contact</Link></div></div><p className="copyright">© {new Date().getFullYear()} ShopEase. Made with intention.</p></footer>;

export default Footer;
