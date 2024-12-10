import React, { useEffect } from 'react'
import config from '../../utils/config'
import { FaEye, FaRegHeart } from 'react-icons/fa'
import { RiShoppingCartLine } from 'react-icons/ri'
import Rating from '../Rating'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, addToWishlist, messageClear } from '../../store/Reducers/cartReducer'
import toast from 'react-hot-toast'

const FeatureProducts = ({ products }) => {
  const navigate = useNavigate() // điều hướng trang
  const dispatch = useDispatch() //kết nối component với Redux store để có thể gửi action và thay đổi state toàn cục của ứng dụng.

  const { userInfo } = useSelector((state) => state.auth) //state loader
  const { loader, errorMessage, successMessage } = useSelector((state) => state.cart) //state loader
  const add_to_cart = (id) => {
    if (userInfo) {
      dispatch(addToCart({ userId: userInfo.id, quantity: 1, productId: id }))
    } else {
      navigate('/login')
    }
  }

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

  // Add To Wishlist
  const handleAddToWishlist = (product) => {
    dispatch(
      addToWishlist({
        userId: userInfo.id,
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        discount: product.discount,
        rating: product.rating,
        slug: product.slug
      })
    )
  }

  return (
    <div className="w-[90%] flex flex-wrap mx-auto py-8">
      <div className="w-full ">
        <div className="text-center flex justify-center items-center flex-col text-4xl text-slate-600 font-bold relative pb-[45px] ">
          <h2>Feature Products</h2>
          <div className="w-[180px] h-[2px] bg-[#34548d] mt-4"></div>
        </div>
      </div>
      {/*  */}
      <div className="w-full grid grid-cols-4 xl:grid-cols-3 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
        {products.map((p, i) => (
          <div key={i} className="h-full group border rounded-md shadow-md hover:shadow-md">
            <div className="relative overflow-hidden ">
              {p.discount > 0 && (
                <div className="flex justify-center items-center absolute text-white w-[35px] h-[35px] rounded-full shadow-md bg-red-500 font-semibold text-xs left-2 top-2 z-10">
                  {p.discount}%
                </div>
              )}

              <div className="flex w-full h-[210px] justify-center items-center ">
                <img
                  src={p.images[0]}
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
                  onClick={() => handleAddToWishlist(p)}
                  className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full shadow-md transition-all 
                  hover:bg-[#34548d] hover:text-white hover:rotate-[720deg]"
                >
                  <FaRegHeart />
                </li>
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

export default FeatureProducts
