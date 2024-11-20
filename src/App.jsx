import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import React, { useEffect } from 'react'
import Shop from './pages/Shop'
import Cart from './pages/Cart'
import Shipping from './pages/Shipping'
import Details from './pages/Details'
import Login from './pages/Login'
import Register from './pages/Register'
import { getCategories } from './store/Reducers/homeReducer'
import { useDispatch } from 'react-redux'
import CategoryShop from './pages/CategoryShop'
import SearchProduct from './pages/SearchProduct'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCategories())
  }, [])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/shop" element={<Shop />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/shipping" element={<Shipping />}></Route>
        <Route path="/products?" element={<CategoryShop />}></Route>
        <Route path="/products/search?" element={<SearchProduct />}></Route>
        <Route path="/product/details/:slug" element={<Details />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
