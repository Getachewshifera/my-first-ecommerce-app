import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../App';

const Checkout = () => {
  const { cart, clearCart, subtotal } = useCart();
  const [complete, setComplete] = useState(false);
  const placeOrder = (event) => {
    event.preventDefault();
    clearCart();
    setComplete(true);
  };
  if (complete) return <main className="container empty-state"><span className="eyebrow">Order confirmed</span><h1>Thank you for your order.</h1><p>We’ve sent your confirmation and will let you know when it ships.</p><Link className="button button-dark" to="/shop"><span className="button-icon" aria-hidden="true">→</span> Continue shopping</Link></main>;
  if (!cart.length) return <main className="container empty-state"><h1>Your bag is empty.</h1><Link className="button button-dark" to="/shop"><span className="button-icon" aria-hidden="true">→</span> Shop the collection</Link></main>;
  return <main className="container checkout-page"><div><span className="eyebrow">Secure checkout</span><h1>Complete your order.</h1><form className="checkout-form" onSubmit={placeOrder}><h2>Contact information</h2><label>Email<input required type="email" /></label><h2>Shipping address</h2><div className="form-row"><label>First name<input required /></label><label>Last name<input required /></label></div><label>Address<input required /></label><div className="form-row"><label>City<input required /></label><label>Postal code<input required /></label></div><h2>Payment</h2><label>Card number<input required inputMode="numeric" placeholder="0000 0000 0000 0000" /></label><button className="button button-dark button-wide" type="submit"><span className="button-icon" aria-hidden="true">✓</span> Place order · ${(subtotal + (subtotal >= 100 ? 0 : 8)).toFixed(2)}</button></form></div><aside className="summary-card checkout-summary"><h2>In your bag</h2>{cart.map(({ product, quantity }) => <div className="mini-item" key={product.id}><img src={product.image} alt="" /><span>{product.name} × {quantity}</span><strong>${(product.price * quantity).toFixed(2)}</strong></div>)}<div className="summary-total"><span>Total</span><strong>${(subtotal + (subtotal >= 100 ? 0 : 8)).toFixed(2)}</strong></div></aside></main>;
};

export default Checkout;
