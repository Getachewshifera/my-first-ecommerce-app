import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import products from "../pages/Products";
import checkout from "../pages/Checkout";
import productsDetails from "../pages/ProductsDetails";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/products/:id" element={<ProductsDetails />} />


    </Routes>
  );
}

export default AppRoutes;