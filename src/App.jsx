import { createContext, useContext, useMemo, useState } from "react";
import {
  BrowserRouter,
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Footer from "./components/footer";
import Navbar from "./components/Navbar";
import products from "./data/products";
import Checkout from "./pages/Checkout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductsDetails from "./pages/ProductsDetails";

export const CartContext = createContext(null);
export const AuthContext = createContext(null);
export const ThemeContext = createContext(null);

export function useCart() {
  return useContext(CartContext);
}

export function useAuth() {
  return useContext(AuthContext);
}

export function useTheme() {
  return useContext(ThemeContext);
}

function AuthPage({ mode }) {
  const isRegister = mode === "register";
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register } = useAuth();
  const redirect = new URLSearchParams(location.search).get("redirect") || "/";
  const [error, setError] = useState("");

  const submit = (event) => {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget);
    const email = form.get("email").trim().toLowerCase();
    const password = form.get("password");
    if (isRegister && password !== form.get("confirmPassword")) {
      setError("Passwords do not match.");
      return;
    }
    const result = isRegister
      ? register(form.get("name").trim(), email, password)
      : login(email, password);
    if (!result.success) {
      setError(result.message);
      return;
    }
    navigate(redirect, { replace: true });
  };

  return (
    <main className="container auth-page">
      <div className="auth-card">
        <span className="eyebrow">
          {isRegister ? "Join ShopEase" : "Welcome back"}
        </span>
        <h1>{isRegister ? "Create your account." : "Sign in to continue."}</h1>
        <p className="lead">
          {isRegister
            ? "Save your details for a faster checkout."
            : "Log in before completing your order."}
        </p>
        <form className="checkout-form" onSubmit={submit}>
          {isRegister && (
            <label>
              Name
              <input required name="name" autoComplete="name" />
            </label>
          )}
          <label>
            Email
            <input required type="email" name="email" autoComplete="email" />
          </label>
          <label>
            Password
            <input required type="password" name="password" minLength="6" autoComplete={isRegister ? "new-password" : "current-password"} />
          </label>
          {isRegister && (
            <label>
              Confirm password
              <input
                required
                type="password"
                name="confirmPassword"
                minLength="6"
                autoComplete="new-password"
              />
            </label>
          )}
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          <button className="button button-dark button-wide" type="submit">
            <span className="button-icon" aria-hidden="true">{isRegister ? "+" : "→"}</span>
            {isRegister ? "Create account" : "Sign in"}
          </button>
        </form>
        <p className="auth-switch">
          {isRegister ? "Already have an account?" : "New to ShopEase?"}{" "}
          <Link
            to={`${isRegister ? "/login" : "/register"}?redirect=${encodeURIComponent(redirect)}`}
          >
            {isRegister ? "Sign in" : "Create an account"}
          </Link>
        </p>
      </div>
    </main>
  );
}

function ProtectedCheckout() {
  const { user } = useAuth();
  return user ? (
    <Checkout />
  ) : (
    <Navigate to="/login?redirect=%2Fcheckout" replace />
  );
}

function CartPage() {
  const { cart, changeQuantity, removeFromCart, subtotal } = useCart();
  const shipping = subtotal >= 100 || subtotal === 0 ? 0 : 8;

  if (!cart.length) {
    return (
      <main className="container empty-state">
        <span className="eyebrow">Your bag</span>
        <h1>Your cart is waiting.</h1>
        <p>Find something you love and it will appear here.</p>
        <Link className="button button-dark" to="/shop">
          Explore the collection <span className="button-icon" aria-hidden="true">→</span>
        </Link>
      </main>
    );
  }

  return (
    <main className="container cart-layout">
      <section>
        <span className="eyebrow">Your bag</span>
        <h1>Shopping cart</h1>
        <div className="cart-items">
          {cart.map(({ product, quantity }) => (
            <article className="cart-item" key={product.id}>
              <img src={product.image} alt={product.name} />
              <div className="cart-item-info">
                <span className="muted">{product.category}</span>
                <h3>{product.name}</h3>
                <strong>${product.price.toFixed(2)}</strong>
                <div className="quantity">
                  <button
                    className="icon-button"
                    onClick={() => changeQuantity(product.id, quantity - 1)}
                    aria-label={`Decrease ${product.name} quantity`}
                  >
                    <span aria-hidden="true">−</span>
                  </button>
                  <span>{quantity}</span>
                  <button
                    className="icon-button"
                    onClick={() => changeQuantity(product.id, quantity + 1)}
                    aria-label={`Increase ${product.name} quantity`}
                  >
                    <span aria-hidden="true">+</span>
                  </button>
                </div>
              </div>
              <button
                className="remove-button"
                onClick={() => removeFromCart(product.id)}
              >
                <span aria-hidden="true">×</span> Remove
              </button>
            </article>
          ))}
        </div>
      </section>
      <aside className="summary-card">
        <h2>Order summary</h2>
        <div>
          <span>Subtotal</span>
          <strong>${subtotal.toFixed(2)}</strong>
        </div>
        <div>
          <span>Shipping</span>
          <strong>{shipping ? `$${shipping.toFixed(2)}` : "Free"}</strong>
        </div>
        <div className="summary-total">
          <span>Total</span>
          <strong>${(subtotal + shipping).toFixed(2)}</strong>
        </div>
        <Link className="button button-dark button-wide" to="/checkout">
          Proceed to checkout <span className="button-icon" aria-hidden="true">→</span>
        </Link>
        <p className="small-note">Free shipping on orders over $100.</p>
      </aside>
    </main>
  );
}

function About() {
  return (
    <main className="container content-page">
      <span className="eyebrow">Our story</span>
      <h1>Less, but better.</h1>
      <p className="lead">
        ShopEase is a curated collection of useful, beautiful things for
        everyday life. We choose quality over clutter and work with makers who
        care about how things are made.
      </p>
      <div className="values-grid">
        <div>
          <strong>01</strong>
          <h3>Thoughtful design</h3>
          <p>Objects that earn their place in your home and routine.</p>
        </div>
        <div>
          <strong>02</strong>
          <h3>Made to last</h3>
          <p>Materials and construction chosen for years, not seasons.</p>
        </div>
        <div>
          <strong>03</strong>
          <h3>Good choices</h3>
          <p>
            Small-batch partners and considered packaging wherever possible.
          </p>
        </div>
      </div>
    </main>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <main className="container content-page narrow-page">
      <span className="eyebrow">Get in touch</span>
      <h1>We’re here to help.</h1>
      <p className="lead">
        Questions about an order, a product, or just want to say hello? Send us
        a note.
      </p>
      {sent ? (
        <div className="notice">
          Thanks for reaching out. We’ll be in touch shortly.
        </div>
      ) : (
        <form
          className="contact-form"
          onSubmit={(event) => {
            event.preventDefault();
            setSent(true);
          }}
        >
          <label>
            Name
            <input required name="name" />
          </label>
          <label>
            Email
            <input required type="email" name="email" />
          </label>
          <label>
            Message
            <textarea required name="message" rows="5" />
          </label>
          <button className="button button-dark" type="submit">
            Send message
          </button>
        </form>
      )}
    </main>
  );
}

function Storefront() {
  const [cart, setCart] = useState([]);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("shopease-theme") || "light",
  );
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("shopease-user")) || null;
    } catch {
      return null;
    }
  });
  const addToCart = (product) =>
    setCart((current) => {
      const existing = current.find((item) => item.product.id === product.id);
      if (existing)
        return current.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      return [...current, { product, quantity: 1 }];
    });
  const changeQuantity = (id, quantity) =>
    setCart((current) =>
      quantity < 1
        ? current.filter((item) => item.product.id !== id)
        : current.map((item) =>
            item.product.id === id ? { ...item, quantity } : item,
          ),
    );
  const removeFromCart = (id) =>
    setCart((current) => current.filter((item) => item.product.id !== id));
  const clearCart = () => setCart([]);
  const subtotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const value = useMemo(
    () => ({
      cart,
      addToCart,
      changeQuantity,
      removeFromCart,
      clearCart,
      subtotal,
      cartCount,
    }),
    [cart, subtotal, cartCount],
  );
  const auth = useMemo(
    () => ({
      user,
      login: (email, password) => {
        const saved = JSON.parse(
          localStorage.getItem(`shopease-account-${email.toLowerCase()}`) ||
            "null",
        );
        if (!saved || saved.password !== password)
          return { success: false, message: "Email or password is incorrect." };
        setUser(saved);
        localStorage.setItem("shopease-user", JSON.stringify(saved));
        return { success: true };
      },
      register: (name, email, password) => {
        const key = `shopease-account-${email.toLowerCase()}`;
        if (localStorage.getItem(key))
          return {
            success: false,
            message: "An account with this email already exists.",
          };
        const account = { name, email: email.toLowerCase(), password };
        localStorage.setItem(key, JSON.stringify(account));
        localStorage.setItem("shopease-user", JSON.stringify(account));
        setUser(account);
        return { success: true };
      },
      logout: () => {
        localStorage.removeItem("shopease-user");
        setUser(null);
      },
    }),
    [user],
  );
  const themeValue = useMemo(
    () => ({
      theme,
      toggleTheme: () =>
        setTheme((current) => {
          const nextTheme = current === "light" ? "dark" : "light";
          localStorage.setItem("shopease-theme", nextTheme);
          return nextTheme;
        }),
    }),
    [theme],
  );

  return (
    <AuthContext.Provider value={auth}>
      <CartContext.Provider value={value}>
        <ThemeContext.Provider value={themeValue}>
          <div className={`app theme-${theme}`}>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Products />} />
              <Route path="/product/:id" element={<ProductsDetails />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<ProtectedCheckout />} />
              <Route path="/login" element={<AuthPage mode="login" />} />
              <Route path="/register" element={<AuthPage mode="register" />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<Home />} />
            </Routes>
            <Footer />
          </div>
        </ThemeContext.Provider>
      </CartContext.Provider>
    </AuthContext.Provider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Storefront />
    </BrowserRouter>
  );
}

export { products };
export default App;
