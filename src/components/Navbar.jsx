import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth, useCart, useTheme } from '../App';

const Navbar = () => {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return <header className={`navbar${menuOpen ? ' menu-open' : ''}`}>
    <Link className="navbar-logo" to="/" onClick={closeMenu}>Shop<span>Ease</span></Link>
    <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
      <span />
      <span />
    </button>
    <nav className="navbar__links" aria-label="Main navigation">
      <NavLink to="/" onClick={closeMenu}>Home</NavLink>
      <NavLink to="/shop" onClick={closeMenu}>Shop</NavLink>
      <NavLink to="/about" onClick={closeMenu}>About</NavLink>
      <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
      <div className="mobile-menu-actions">
        <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
          <span aria-hidden="true">{theme === 'light' ? '☾' : '☀'}</span>
          <span>{theme === 'light' ? 'Dark mode' : 'Light mode'}</span>
        </button>
        {user ? <button className="account-link" onClick={() => { logout(); closeMenu(); }}>Hi, {user.name.split(' ')[0]} · Log out</button> : <Link className="account-link" to="/login" onClick={closeMenu}>Sign in <span aria-hidden="true">→</span></Link>}
      </div>
    </nav>
    <div className="navbar-actions">
      <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
        <span aria-hidden="true">{theme === 'light' ? '☾' : '☀'}</span>
        <span className="theme-label">{theme === 'light' ? 'Dark' : 'Light'}</span>
      </button>
      {user ? <button className="account-link" onClick={logout}>Hi, {user.name.split(' ')[0]} · Log out</button> : <Link className="account-link" to="/login">Sign in</Link>}
      <Link className="cart-link" to="/cart" aria-label={`Shopping cart with ${cartCount} items`}>Bag <span>{cartCount}</span></Link>
    </div>
  </header>;
};

export default Navbar;
