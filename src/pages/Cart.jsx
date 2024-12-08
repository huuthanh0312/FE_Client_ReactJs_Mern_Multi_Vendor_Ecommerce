import React, { useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link, useNavigate } from 'react-router-dom'
import config from '../utils/config'
import { BsShop } from 'react-icons/bs'
import { FaHeart, FaMinus, FaPlus } from 'react-icons/fa'
import { MdDelete, MdOutlineCancelPresentation } from 'react-icons/md'
import { IoMdCheckboxOutline } from 'react-icons/io'
import { HiOutlineClipboardDocumentCheck } from 'react-icons/hi2'
import Breadcrumbs from '../components/Breadcrumbs'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteCartProduct,
  getCartProducts,
  messageClear,
  quantityDecrease,
  quantityIncrease
} from '../store/Reducers/cartReducer'
import toast from 'react-hot-toast'
import { ClipLoader } from 'react-spinners'

const Cart = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.auth)
  const {
    cartProducts,
    cart_product_count,
    wishlist_count,
    wishlist,
    price,
    shipping_fee,
    outOfStockProducts,
    buy_product_item,
    loader,
    errorMessage,
    successMessage
  } = useSelector((state) => state.cart)

  // use Effect check toast message error
  useEffect(() => {
    dispatch(getCartProducts(userInfo.id))
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
      dispatch(getCartProducts(userInfo.id))
    }
  }, [errorMessage, successMessage])
  const redirect = () => {
    navigate('/shipping', {
      state: {
        products: cartProducts,
        price: price,
        shipping_fee: shipping_fee,
        items: buy_product_item
      }
    })
  }

  // quatity incretion
  const handleIncrease = (quantity, stock, cartId) => {
    const temp = quantity + 1
    if (temp <= stock) {
      dispatch(quantityIncrease(cartId))
    }
  }
  //handleDecrease
  const handleDecrease = (quantity, cartId) => {
    const temp = quantity - 1
    if (temp !== 0) {
      dispatch(quantityDecrease(cartId))
    }
  }
  return (
    <div className="w-full">
      <Header />
      {/*Section  Breadcrumbs */}
      <Breadcrumbs title="Cart" showHome={true} />
      {/* End Breadcrumbs */}
      <section className="bg-[#eeeeee]">
        <div className="w-[90%] mx-auto py-16">
          {cartProducts.length > 0 || outOfStockProducts.length > 0 ? (
            <div className="flex flex-wrap">
              <div className="w-[67%] md-lg:w-full">
                <div className="flex flex-col gap-3">
                  <div className="bg-white rounded-md shadow-lg hover:shadow-indigo-200 ">
                    <div className="border-b p-4">
                      <h2 className="text-md text-[#34548d] font-semibold inline-flex justify-center items-center gap-2 uppercase">
                        <IoMdCheckboxOutline size={18} className="text-green-500 " />
                        <span>Stock Products: </span>
                        <span className="text-red-700">{cart_product_count}</span>
                      </h2>
                    </div>
                    {cartProducts.map((p, i) => (
                      <div key={i} className="flex p-4 sm:px-2 flex-col gap-2 rounded-md">
                        <div className="flex justify-start items-center border-b-2 pb-1">
                          <div className="gap-1 text-slate-600 inline-flex items-start">
                            <BsShop size={18} />
                            <h2 className="text-md font-bold">{p.shopName}</h2>
                          </div>
                        </div>
                        {p.products.map((pt, i) => (
                          <div key={i} className="w-full flex flex-wrap">
                            <div className="w-full relative flex gap-4 sm:gap-2 bg-white rounded-md shadow-lg">
                              {/* Overlay only displays when loading */}
                              {loader && (
                                <div className="absolute inset-0 bg-gray-50 bg-opacity-70 flex justify-center items-center z-10">
                                  <ClipLoader color="#4A90E2" size={20} />
                                </div>
                              )}
                              <div className="flex justify-center items-center gap-4 p-2 relative ">
                                {pt.productInfo.discount > 0 && (
                                  <div className="flex justify-center items-center absolute text-white w-[24px] h-[24px] rounded-full shadow-md bg-red-500 font-semibold text-[10px] p-2 left-2 top-2">
                                    {pt.productInfo.discount}%
                                  </div>
                                )}

                                <div className="w-20 h-20">
                                  <img
                                    src={pt.productInfo.images[0]}
                                    alt=""
                                    className="w-full h-full rounded-md object-contain"
                                  />
                                </div>

                                <div className="flex flex-col gap-4">
                                  <div>
                                    <h3 className="text-base font-bold text-gray-800">
                                      {pt.productInfo.name}
                                    </h3>
                                    <p className="text-sm font-semibold text-gray-500 mt-2 flex items-center gap-2">
                                      Brand: {pt.productInfo.brand}
                                    </p>
                                  </div>

                                  <div className="mt-auto flex items-center gap-3 pb-2">
                                    <button
                                      onClick={() => handleDecrease(pt.quantity, pt._id)}
                                      className="flex items-center justify-center w-5 h-5 bg-gray-400 outline-none rounded-full"
                                    >
                                      <FaMinus className="w-2 fill-white" />
                                    </button>
                                    <span className="font-bold text-sm leading-[18px]">
                                      {pt.quantity}
                                    </span>
                                    <button
                                      onClick={() =>
                                        handleIncrease(pt.quantity, pt.productInfo.stock, pt._id)
                                      }
                                      className="flex items-center justify-center w-5 h-5 bg-gray-400 outline-none rounded-full"
                                    >
                                      <FaPlus className="w-2 fill-white" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className="ml-auto flex flex-col px-6 py-3 sm:px-1">
                                <div className="flex justify-center items-center gap-4 sm:gap-1 text-[#34548d]">
                                  <button className="w-[30px] h-[30px] cursor-pointer flex justify-center items-center rounded-full hover:shadow-md transition-all hover:bg-[#34548d] hover:text-white hover:rotate-[720deg]">
                                    <FaHeart size={18} />
                                  </button>
                                  <button
                                    onClick={() => dispatch(deleteCartProduct(pt._id))}
                                    className="w-[30px] h-[30px] cursor-pointer text-red-500 flex justify-center items-center rounded-full hover:shadow-md transition-all hover:bg-red-500 hover:text-white hover:rotate-[720deg]"
                                  >
                                    <MdDelete size={20} />
                                  </button>
                                </div>

                                <h3 className="text-base font-bold mt-auto gap-2">
                                  <span className="text-slate-800 line-through">
                                    ${pt.productInfo.price}
                                  </span>{' '}
                                  <span className="text-orange-500">
                                    $
                                    {pt.productInfo.price -
                                      Math.floor(
                                        (pt.productInfo.price * pt.productInfo.discount) / 100
                                      )}
                                  </span>
                                </h3>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                  {/* End In Stock */}
                  {outOfStockProducts.length > 0 && (
                    <div className="bg-white rounded-md shadow-lg hover:shadow-indigo-200 ">
                      <div className="border-b p-4">
                        <h2 className="text-md text-[#34548d] font-semibold inline-flex justify-center items-center gap-2 uppercase">
                          <MdOutlineCancelPresentation size={18} className="text-red-500 " />
                          <span>Out Of Stock: </span>
                          <span className="text-orange-500">{outOfStockProducts.length}</span>
                        </h2>
                      </div>

                      <div className="flex p-4 sm:px-2 flex-col gap-2 rounded-md">
                        {outOfStockProducts.map((pt, i) => (
                          <div key={i} className="w-full flex flex-wrap">
                            <div className="w-full  flex gap-4 sm:gap-2 bg-white rounded-md shadow-lg">
                              <div className="flex justify-center items-center gap-4 p-2 relative ">
                                {pt.productInfo.discount > 0 && (
                                  <div className="flex justify-center items-center absolute text-white w-[24px] h-[24px] rounded-full shadow-md bg-red-500 font-semibold text-[10px] p-2 left-2 top-2">
                                    {pt.productInfo.discount}%
                                  </div>
                                )}

                                <div className="w-20 h-20">
                                  <img
                                    src={pt.productInfo.images[0]}
                                    alt=""
                                    className="w-full h-full rounded-md object-contain"
                                  />
                                </div>

                                <div className="flex flex-col gap-4">
                                  <div>
                                    <h3 className="text-base font-bold text-gray-800">
                                      {pt.productInfo.name}
                                    </h3>
                                    <p className="text-sm font-semibold text-gray-500 mt-2 flex items-center gap-2">
                                      Brand: {pt.productInfo.brand}
                                    </p>
                                  </div>

                                  <div className="mt-auto flex items-center gap-3 pb-2">
                                    <button
                                      onClick={() => handleDecrease(pt.quantity, pt._id)}
                                      className="flex items-center justify-center w-5 h-5 bg-gray-400 outline-none rounded-full"
                                    >
                                      <FaMinus className="w-2 fill-white" />
                                    </button>
                                    <span className="font-bold text-sm leading-[18px]">
                                      {pt.quantity}
                                    </span>
                                    <button
                                      onClick={() =>
                                        handleIncrease(pt.quantity, pt.productInfo.stock, pt._id)
                                      }
                                      className="flex items-center justify-center w-5 h-5 bg-gray-400 outline-none rounded-full"
                                    >
                                      <FaPlus className="w-2 fill-white" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className="ml-auto flex flex-col px-6 py-3 sm:px-1">
                                <div className="flex justify-center items-center gap-4 sm:gap-1 text-[#34548d]">
                                  <button
                                    disabled
                                    className="w-[30px] h-[30px] text-slate-500 cursor-pointer flex justify-center items-center rounded-full hover:shadow-md transition-all "
                                  >
                                    <FaHeart size={18} />
                                  </button>
                                  <button
                                    onClick={() => dispatch(deleteCartProduct(pt._id))}
                                    className="w-[30px] h-[30px] cursor-pointer text-red-500 flex justify-center items-center rounded-full hover:shadow-md transition-all hover:bg-red-500 hover:text-white hover:rotate-[720deg]"
                                  >
                                    <MdDelete size={20} />
                                  </button>
                                </div>

                                <h3 className="text-base font-bold mt-auto gap-2">
                                  <span className="text-slate-800 line-through">
                                    ${pt.productInfo.price}
                                  </span>{' '}
                                  <span className="text-orange-500">
                                    $
                                    {pt.productInfo.price -
                                      Math.floor(
                                        (pt.productInfo.price * pt.productInfo.discount) / 100
                                      )}
                                  </span>
                                </h3>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/*  */}
              <div className="w-[33%] md-lg:w-full">
                <div className="pl-5 md-lg:pl-0 md-lg:mt-5">
                  {cartProducts.length > 0 && (
                    <div className="bg-white font-semibold px-6 pt-4 pb-6 md:p-4 text-slate-600 flex flex-col gap-3 rounded-md shadow-lg hover:shadow-indigo-200">
                      <div className="border-b pb-4">
                        <h2 className="text-xl text-[#34548d] font-bold uppercase">
                          Order Summary
                        </h2>
                      </div>
                      <div className="flex justify-between items-center ">
                        <span>{buy_product_item} Items</span>
                        <span>${price}</span>
                      </div>
                      <div className="flex justify-between items-center ">
                        <span>Shipping Fee</span>
                        <span>${shipping_fee}</span>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          className="w-full px-3 py-2 rounded-sm border border-slate-200 outline-0 focus:border-[#34548d]"
                          placeholder="Voucher Coupon"
                        />
                        <button className="px-5 py-[1px] bg-[#34548d] text-white rounded-sm uppercase text-sm">
                          Apply
                        </button>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Total</span>
                        <span className="text-lg text-orange-500">${price + shipping_fee}</span>
                      </div>
                      <button
                        onClick={redirect}
                        className="w-full inline-flex justify-center items-center gap-2 px-5 py-3 bg-[#34548d] text-white rounded-sm uppercase text-sm shadow-md hover:shadow-blue-200"
                      >
                        <HiOutlineClipboardDocumentCheck size={20} />
                        Process to Checkout ({buy_product_item})
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="">
              <Link
                to="/shop"
                className="px-8 py-2 bg-[#34548d] text-white rounded-md shadow-lg hover:scale-110"
              >
                Shop Now
              </Link>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Cart
