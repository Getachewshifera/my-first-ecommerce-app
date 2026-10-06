import React from 'react'
import {Routes,Route,BrowserRouter, NavLink } from 'react-router-dom'
import Home from '../pages/Home'
import Products from '../pages/Products'
import Checkout from '../pages/Checkout'
const Navbar = () => {
  return (
   
         <nav>

      <NavLink to="/">Home</NavLink>

      <NavLink to="/products">Products</NavLink>

      <NavLink to="/checkout">Checkout</NavLink>

    </nav>
    
  )
}

export default Navbar
