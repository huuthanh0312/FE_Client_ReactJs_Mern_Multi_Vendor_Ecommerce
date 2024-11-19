import React, { useState } from 'react'
import Header from '../components/Header'
import Breadcrumbs from '../components/Breadcrumbs'
import Footer from '../components/Footer'
import { Link, useLocation } from 'react-router-dom'
import { HiOutlineClipboardDocumentCheck } from 'react-icons/hi2'
import { BsShop } from 'react-icons/bs'
import config from '../utils/config'
import { MdOutlineShoppingCartCheckout } from 'react-icons/md'

const Shipping = () => {
  const [res, setRes] = useState(false)
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
  return (
    <div className="w-full">
      <Header />
      {/*Section  Breadcrumbs */}
      <Breadcrumbs title="Shipping" showHome={true} />
      {/* End Breadcrumbs */}
      <section className="bg-[#eeeeee]">
        <div className="w-[90%] mx-auto py-16">
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
                  <div className="flex justify-start items-center border-b-2 pb-1">
                    <div className="gap-1 text-slate-600 inline-flex items-start">
                      <BsShop size={18} />
                      <h2 className="text-md font-bold">Thanh Shop</h2>
                    </div>
                  </div>
                  {[1, 2].map((p, i) => (
                    <div key={i} className="w-full flex flex-wrap">
                      <div className="w-full flex justify-start items-start gap-4 sm:gap-2 rounded-md shadow-lg">
                        <div className="flex gap-4 p-2 relative ">
                          <div className="flex justify-center items-center absolute text-white w-[24px] h-[24px] rounded-full shadow-md bg-red-500 font-semibold text-xs p-2 left-2 top-2">
                            8%
                          </div>
                          <div className="w-28 h-28">
                            <img
                              src={`${config.BASE_URL}/images/products/${p}.webp`}
                              alt=""
                              className="w-full h-full rounded-md object-contain"
                            />
                          </div>

                          <div className="flex flex-col gap-4">
                            <div>
                              <h3 className="text-base font-bold text-gray-800">
                                Product Name ABCDFSEF
                              </h3>
                              <p className="text-sm font-semibold text-gray-500 mt-2 flex items-center gap-2">
                                Brand: Macbook
                              </p>
                              <p className="text-sm font-semibold text-gray-500 mt-2 flex items-center gap-2">
                                Quantity: <span className="text-orange-500">5</span>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="ml-auto flex justify-start items-center px-6 py-3 sm:px-1">
                          <h3 className="text-base font-bold mt-auto gap-2">
                            <span className="text-slate-800 line-through">$320</span>
                            <span className="text-orange-500"> $120</span>
                          </h3>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* End In Stock */}
              </div>
            </div>
            {/*  */}
            <div className="w-[33%] md-lg:w-full">
              <div className="pl-5 md-lg:pl-0 md-lg:mt-5">
                <div className="bg-white font-semibold px-6 pt-4 pb-6 md:p-4 text-slate-600 flex flex-col gap-3 rounded-md shadow-lg hover:shadow-indigo-200">
                  <div className="border-b pb-4">
                    <h2 className="text-xl font-bold text-[#34548d] uppercase">Order Summary</h2>
                  </div>
                  <div className="flex justify-between items-center ">
                    <span>Items Total (34)</span>
                    <span>$343</span>
                  </div>
                  <div className="flex justify-between items-center ">
                    <span>Delivery Fee</span>
                    <span>$34</span>
                  </div>
                  <div className="flex justify-between items-center ">
                    <span>Total Payment</span>
                    <span>$343</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span>Total</span>
                    <span className="text-lg text-[#059473]">$343</span>
                  </div>
                  <button
                    disabled={res ? false : true}
                    className={`w-full inline-flex justify-center items-center gap-2 px-5 py-2  text-white rounded-sm uppercase text-sm shadow-md hover:shadow-blue-200 ${
                      res ? 'bg-[#34548d]' : 'bg-red-500'
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
