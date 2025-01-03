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
import Payment from './pages/Payment'
import Dashboard from './pages/Dashboard'
import ProtectUser from './utils/ProtectUser'
import Index from './components/dashboard/Index'
import Orders from './components/dashboard/Orders'
import ChangePassword from './components/dashboard/ChangePassword'
import Wishlist from './components/dashboard/Wishlist'
import OrderDetails from './components/dashboard/OrderDetails'
import Chat from './components/dashboard/Chat'
import ConfirmOrder from './pages/ConfirmOrder'

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
        <Route path="/payment" element={<Payment />}></Route>
        <Route path="/order/confirm" element={<ConfirmOrder />}></Route>

        <Route path="/products?" element={<CategoryShop />}></Route>
        <Route path="/products/search?" element={<SearchProduct />}></Route>
        <Route path="/product/details/:slug" element={<Details />}></Route>

        <Route path="/dashboard" element={<ProtectUser />}>
          <Route path="" element={<Dashboard />}>
            <Route path="" element={<Index />} />
            <Route path="my-orders" element={<Orders />} />
            <Route path="my-wishlists" element={<Wishlist />} />
            <Route path="chat" element={<Chat />} />
            <Route path="chat/:sellerId" element={<Chat />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="my-orders/details/:orderId" element={<OrderDetails />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
