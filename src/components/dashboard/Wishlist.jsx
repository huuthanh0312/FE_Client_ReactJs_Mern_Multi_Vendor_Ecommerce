import React, { useEffect, useState } from 'react'
import { FaEye, FaRegHeart, FaTrashAlt } from 'react-icons/fa'
import { RiShoppingCartLine } from 'react-icons/ri'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  addToCart,
  getWishlistProducts,
  removeWishlistProduct
} from './../../store/Reducers/cartReducer'
import Rating from './../Rating'
import toast from 'react-hot-toast'
import { messageClear } from '../../store/Reducers/homeReducer'

const Wishlist = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { userInfo } = useSelector((state) => state.auth)
  const { wishlist_count, wishlists, errorMessage, successMessage } = useSelector(
    (state) => state.cart
  ) //state loader
  useEffect(() => {
    if (userInfo) {
      dispatch(getWishlistProducts(userInfo.id))
    }
  }, [])

  // use Effect check toast message error
  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage)
      dispatch(messageClear()) //message clear function reudx
    }
    if (successMessage) {
      toast.success(successMessage)
      dispatch(messageClear()) //message clear function reudx
    }
  }, [errorMessage, successMessage])

  // handle add to cart
  const add_to_cart = (id) => {
    if (userInfo) {
      dispatch(addToCart({ userId: userInfo.id, quantity: 1, productId: id }))
    } else {
      navigate('/login')
    }
  }
  // remove Wishlist Product
  const handleRemoveWishlistProduct = (wishlistId) => {
    dispatch(removeWishlistProduct(wishlistId))
  }
  return (
    <div>
      <div className="p-4 bg-white mb-5 rounded-md flex justify-between items-center border">
        <h2 className="text-lg font-medium text-slate-600">
          <span className="text-orange-500">{wishlist_count > 0 ? wishlist_count : 0}</span>{' '}
          Products Wishlist
        </h2>
      </div>
      {/*end grid */}
      <div className="w-full grid grid-cols-5 2xl:grid-cols-4 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5">
        {wishlists.map((p, i) => (
          <div
            key={i}
            className="h-full bg-white group border rounded-md shadow-md hover:shadow-md"
          >
            <div className="relative overflow-hidden ">
              {p.discount > 0 && (
                <div className="flex justify-center items-center absolute text-white w-[35px] h-[35px] rounded-full shadow-md bg-red-500 font-semibold text-xs left-2 top-2 z-10">
                  {p.discount}%
                </div>
              )}
              <button
                onClick={() => handleRemoveWishlistProduct(p._id)}
                className="w-[35px] h-[35px] cursor-pointer bg-white flex justify-center items-center rounded-full shadow-md transition-all 
                  hover:bg-red-200 hover:rotate-[720deg] text-red-600 absolute right-2 top-2 z-10"
              >
                <FaTrashAlt />
              </button>
              <div className="flex w-full h-[210px] justify-center items-center ">
                <img
                  src={p.image}
                  alt=""
                  className="w-auto h-full object-contain hover:scale-110 transition-all duration-500"
                />
              </div>
              <ul className="flex absolute transition-all duration-700 -bottom-10 justify-center items-center gap-2 w-full group-hover:bottom-5">
                <Link
                  to={`/product/details/${p.slug}`}
                  className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full shadow-md transition-all 
                  hover:bg-[#34548d] hover:text-white hover:rotate-[720deg]"
                >
                  <FaEye />
                </Link>

                <li
                  onClick={() => add_to_cart(p._id)}
                  className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full shadow-md transition-all 
                  hover:bg-[#34548d] hover:text-white hover:rotate-[720deg]"
                >
                  <RiShoppingCartLine />
                </li>
              </ul>
              {/*  */}
            </div>
            <div className="py-3 px-5 text-slate-600 flex-grow">
              <h2 className="font-bold">{p.name}</h2>
              <div className="flex justify-start items-center gap-3">
                <div className="text-md font-semibold">${p.price}</div>
                {p.rating > 0 && (
                  <div className="flex justify-center items-center ">
                    <Rating ratings={p.rating} />
                    <span className="text-orange-500 text-sm">(23)</span>
                  </div>
                )}
              </div>
            </div>
            {/* <div className="pb-5 px-5">
              <div
                onClick={() => add_to_cart(p._id)}
                className="py-2 px-6 xl:px-2 w-30 flex justify-center items-center gap-3 cursor-pointer rounded-full shadow-md transition-all 
                  bg-[#34548d] hover:bg-white text-white hover:text-[#34548d] border-2 hover:border-[#34548d] "
              >
                <RiShoppingCartLine /> <span className="font-bold">Add To Cart</span>
              </div>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Wishlist
