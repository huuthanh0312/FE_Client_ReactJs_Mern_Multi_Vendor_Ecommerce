import React, { useState } from 'react'
import Header from '../components/Header'
import Breadcrumbs from '../components/Breadcrumbs'
import Footer from '../components/Footer'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { HiOutlineClipboardDocumentCheck } from 'react-icons/hi2'
import { BsShop } from 'react-icons/bs'
import config from '../utils/config'
import { MdOutlineShoppingCartCheckout } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { ClipLoader } from 'react-spinners'
import { placeOrder } from './../store/Reducers/orderReducer'

const Shipping = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { userInfo } = useSelector((state) => state.auth)
  const [res, setRes] = useState(false)
  // infomation client
  const {
    state: { products, price, shipping_fee, items }
  } = useLocation()
  const loader = false
  const [state, setState] = useState({
    name: '',
    address: '',
    phone: '',
    post: '',
    province: '',
    city: '',
    area: ''
  })

  const inputHandle = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  // infomation client
  const save = (e) => {
    e.preventDefault()
    const { name, address, phone, post, province, city, area } = state
    if (name && address && phone && post && province && city && area) {
      setRes(true)
    }
  }

  // placeOrder submit
  const handlePlaceOrder = () => {
    dispatch(
      placeOrder({
        products,
        price,
        shipping_fee,
        items,
        shippingInfo: state,
        userId: userInfo.id,
        navigate
      })
    )
  }
  return (
    <div className="w-full">
      <Header />
      {/*Section  Breadcrumbs */}
      <Breadcrumbs title="Shipping" showHome={true} />
      {/* End Breadcrumbs */}
      <section className="bg-[#eeeeee]">
        <div className="container mx-auto py-16">
          <div className="flex flex-wrap">
            <div className="w-[67%] md-lg:w-full">
              <div className="flex flex-col gap-3">
                <div className="bg-white rounded-md shadow-lg hover:shadow-indigo-200 ">
                  <div className="border-b py-4 px-6">
                    <h2 className="text-xl text-[#34548d] font-bold uppercase">
                      Shipping Infomation
                    </h2>
                  </div>
                  <div className="pt-4 pb-6 px-6 ">
                    {!res && (
                      <form onSubmit={save}>
                        <div className="flex md:flex-col md:gap-2 w-full gap-5 font-semibold  text-slate-600">
                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="name">Name</label>
                            <input
                              type="text"
                              onChange={inputHandle}
                              value={state.name}
                              name="name"
                              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-[#34548d] rounded-md"
                              placeholder="Name"
                            />
                          </div>
                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="address">Address</label>
                            <input
                              type="text"
                              onChange={inputHandle}
                              value={state.address}
                              name="address"
                              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-[#34548d] rounded-md"
                              placeholder="Address"
                            />
                          </div>
                        </div>
                        {/*  */}
                        <div className="flex md:flex-col md:gap-2 w-full gap-5 font-semibold text-slate-600">
                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="phone">Phone</label>
                            <input
                              type="text"
                              onChange={inputHandle}
                              value={state.phone}
                              name="phone"
                              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-[#34548d] rounded-md"
                              placeholder="Phome"
                            />
                          </div>
                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="post">Post</label>
                            <input
                              type="text"
                              onChange={inputHandle}
                              value={state.post}
                              name="post"
                              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-[#34548d] rounded-md"
                              placeholder="Post"
                            />
                          </div>
                        </div>
                        {/*  */}
                        <div className="flex md:flex-col md:gap-2 w-full gap-5 font-semibold text-slate-600">
                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="province">Province</label>
                            <input
                              type="text"
                              onChange={inputHandle}
                              value={state.province}
                              name="province"
                              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-[#34548d] rounded-md"
                              placeholder="Province"
                            />
                          </div>
                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="city">City</label>
                            <input
                              type="text"
                              onChange={inputHandle}
                              value={state.city}
                              name="city"
                              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-[#34548d] rounded-md"
                              placeholder="City"
                            />
                          </div>
                        </div>
                        {/*  */}
                        <div className="flex md:flex-col md:gap-2 w-full gap-5 font-semibold text-slate-600">
                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="area">Area</label>
                            <input
                              type="text"
                              onChange={inputHandle}
                              value={state.area}
                              name="area"
                              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-[#34548d] rounded-md"
                              placeholder="Area"
                            />
                          </div>
                        </div>
                        <div className="flex w-full py-2">
                          <button className="w-full font-bold px-5 py-2 bg-[#34548d] text-white rounded-sm uppercase text-sm shadow-md hover:shadow-blue-200">
                            Save Changes
                          </button>
                        </div>
                      </form>
                    )}
                    {res && (
                      <div className="flex flex-col gap-1">
                        <h2 className="text-slate-600 font-semibold pb-2">
                          Deliver To {state.name}
                        </h2>
                        <p>
                          <span className="text-blue-800 text-sm font-medium mr-2 px-2 py-1 bg-blue-200">
                            Home
                          </span>
                          <span>
                            {' '}
                            {state.address} {state.phone} {state.post} {state.province} {state.city}
                            {state.area}{' '}
                          </span>
                          <span
                            onClick={() => setRes(false)}
                            className="text-indigo-500 cursor-pointer"
                          >
                            Change
                          </span>
                        </p>
                        <p className="text-slate-600 text-sm">Email to thanh@gmail.com</p>
                      </div>
                    )}
                  </div>
                </div>
                {/*  */}
                <div className="flex bg-white py-4 px-6 sm:px-2 flex-col gap-2 rounded-md shadow-lg hover:shadow-indigo-200">
                  {products.map((p, i) => (
                    <div key={i} className="flex flex-col gap-2 rounded-md">
                      <div className="flex justify-start items-center border-b-2 pb-1">
                        <div className="gap-1 text-slate-600 inline-flex items-start">
                          <BsShop size={18} />
                          <h2 className="text-md font-bold">{p.shopName}</h2>
                        </div>
                      </div>
                      {p.products.map((pt, i) => (
                        <div key={i} className="w-full flex flex-wrap">
                          <div className="w-full flex gap-4 sm:gap-2 bg-white rounded-md shadow-lg">
                            <div className="flex justify-center items-start gap-4 p-2 relative ">
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
                              </div>
                            </div>
                            <div className="flex flex-col ml-auto px-6 py-3 sm:px-1">
                              <h3 className="flex justify-start items-start text-base font-bold gap-2">
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
                              <div>
                                <p className="text-sm font-semibold text-gray-500 mt-2 flex items-center gap-2">
                                  Quantity: <span className="text-orange-500">{pt.quantity}</span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                {/* End In Stock */}
              </div>
            </div>
            {/*  */}
            <div className="w-[33%] md-lg:w-full">
              <div className="pl-5 md-lg:pl-0 md-lg:mt-5">
                <div className="bg-white relative font-semibold px-6 pt-4 pb-6 md:p-4 text-slate-600 flex flex-col gap-3 rounded-md shadow-lg hover:shadow-indigo-200">
                  {/* Overlay only displays when loading */}
                  {loader && (
                    <div className="absolute inset-0 bg-gray-50 bg-opacity-70 flex justify-center items-center z-10">
                      <ClipLoader color="#4A90E2" size={20} />
                    </div>
                  )}
                  <div className="border-b pb-4">
                    <h2 className="text-xl font-bold text-[#34548d] uppercase">Order Summary</h2>
                  </div>
                  <div className="flex justify-between items-center ">
                    <span>Items Total ({items})</span>
                    <span>${price}</span>
                  </div>
                  <div className="flex justify-between items-center ">
                    <span>Delivery Fee</span>
                    <span>${shipping_fee}</span>
                  </div>
                  <div className="flex justify-between items-center ">
                    <span>Total Payment</span>
                    <span>${price + shipping_fee}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span>Total</span>
                    <span className="text-lg text-orange-500">${price + shipping_fee}</span>
                  </div>
                  <button
                    disabled={res ? false : true}
                    onClick={handlePlaceOrder}
                    className={`w-full inline-flex justify-center items-center gap-2 px-5 py-2  text-white rounded-sm uppercase text-sm shadow-md hover:shadow-blue-200 ${
                      res ? 'bg-[#34548d]' : 'bg-red-300'
                    }`}
                  >
                    <MdOutlineShoppingCartCheckout size={20} />
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Shipping
