import React from 'react'
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

const Cart = () => {
  const navigate = useNavigate()
  const cartProduct = [1, 2] // con hang
  const outOfStockProduct = [1, 2] // het hang

  const redirect = () => {
    navigate('/shipping', {
      state: {
        products: [],
        price: 100,
        shipping_fee: 20,
        items: 2
      }
    })
  }
  return (
    <div className="w-full">
      <Header />
      {/*Section  Breadcrumbs */}
      <Breadcrumbs title="Cart" showHome={true} />
      {/* End Breadcrumbs */}
      <section className="bg-[#eeeeee]">
        <div className="w-[90%] mx-auto py-16">
          {cartProduct.length > 0 || outOfStockProduct.length > 0 ? (
            <div className="flex flex-wrap">
              <div className="w-[67%] md-lg:w-full">
                <div className="flex flex-col gap-3">
                  <div className="bg-white rounded-md shadow-lg hover:shadow-indigo-200 ">
                    <div className="border-b p-4">
                      <h2 className="text-md text-[#34548d] font-semibold inline-flex justify-center items-center gap-2 uppercase">
                        <IoMdCheckboxOutline size={18} className="text-green-500 " />
                        <span>Stock Products: </span>
                        <span className="text-red-700">{cartProduct.length}</span>
                      </h2>
                    </div>
                    {cartProduct.map((p, i) => (
                      <div key={i} className="flex p-4 sm:px-2 flex-col gap-2 rounded-b-md">
                        <div className="flex justify-start items-center border-b-2 pb-1">
                          <div className="gap-1 text-slate-600 inline-flex items-start">
                            <BsShop size={18} />
                            <h2 className="text-md font-bold">Thanh Shop</h2>
                          </div>
                        </div>
                        {[1, 2].map((p, i) => (
                          <div key={i} className="w-full flex flex-wrap">
                            <div className="w-full flex gap-4 sm:gap-2 bg-white rounded-md shadow-lg">
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
                                  </div>

                                  <div className="mt-auto flex items-center gap-3 pb-2">
                                    <button className="flex items-center justify-center w-5 h-5 bg-gray-400 outline-none rounded-full">
                                      <FaMinus className="w-2 fill-white" />
                                    </button>
                                    <span className="font-bold text-sm leading-[18px]">2</span>
                                    <button className="flex items-center justify-center w-5 h-5 bg-gray-400 outline-none rounded-full">
                                      <FaPlus className="w-2 fill-white" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className="ml-auto flex flex-col px-6 py-3 sm:px-1">
                                <div className="flex justify-center items-center gap-4 sm:gap-1 text-[#34548d]">
                                  <span className="w-[30px] h-[30px] cursor-pointer flex justify-center items-center rounded-full hover:shadow-md transition-all hover:bg-[#34548d] hover:text-white hover:rotate-[720deg]">
                                    <FaHeart size={18} />
                                  </span>
                                  <span className="w-[30px] h-[30px] cursor-pointer text-red-500 flex justify-center items-center rounded-full hover:shadow-md transition-all hover:bg-red-500 hover:text-white hover:rotate-[720deg]">
                                    <MdDelete size={20} />
                                  </span>
                                </div>

                                <h3 className="text-base font-bold mt-auto gap-2">
                                  <span className="text-slate-800 line-through">$320</span>
                                  <span className="text-orange-500"> $120</span>
                                </h3>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                  {/* End In Stock */}
                  <div className="bg-white rounded-md shadow-lg hover:shadow-indigo-200 ">
                    <div className="border-b p-4">
                      <h2 className="text-md text-[#34548d] font-semibold inline-flex justify-center items-center gap-2 uppercase">
                        <MdOutlineCancelPresentation size={18} className="text-red-500 " />
                        <span>Out Of Stock: </span>
                        <span className="text-orange-500">{outOfStockProduct.length}</span>
                      </h2>
                    </div>

                    <div className="flex p-4 sm:px-2 flex-col gap-2 rounded-md">
                      {[1, 2].map((p, i) => (
                        <div key={i} className="w-full flex flex-wrap">
                          <div className="w-full flex gap-4 sm:gap-2 rounded-md shadow-lg">
                            <div className="flex gap-4 p-2 relative ">
                              <div className="flex justify-center items-center absolute text-white w-[24px] h-[24px] rounded-full shadow-md bg-red-500 font-semibold text-xs p-2 left-2 top-2">
                                8%
                              </div>
                              <div className="w-28 h-28 ">
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
                                </div>

                                <div className="mt-auto flex items-center gap-3 pb-2">
                                  <button className="flex items-center justify-center w-5 h-5 bg-gray-400 outline-none rounded-full">
                                    <FaMinus className="w-2 fill-white" />
                                  </button>
                                  <span className="font-bold text-sm leading-[18px]">2</span>
                                  <button className="flex items-center justify-center w-5 h-5 bg-gray-400 outline-none rounded-full">
                                    <FaPlus className="w-2 fill-white" />
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="ml-auto flex flex-col px-6 py-3 sm:px-1">
                              <div className="flex items-center gap-4 sm:gap-2 justify-center  text-[#34548d]">
                                <button className="w-[30px] h-[30px] cursor-pointer flex justify-center items-center text-gray-300 rounded-full hover:shadow-md ">
                                  <FaHeart size={18} />
                                </button>
                                <button className="w-[30px] h-[30px] cursor-pointer  text-red-500 flex justify-center items-center rounded-full hover:shadow-md transition-all hover:bg-red-500 hover:text-white hover:rotate-[720deg]">
                                  <MdDelete size={20} />
                                </button>
                              </div>

                              <h3 className="text-base font-bold mt-auto gap-2">
                                <span className="text-slate-800 line-through">$320</span>
                                <span className="text-orange-500"> $120</span>
                              </h3>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {/*  */}
              <div className="w-[33%] md-lg:w-full">
                <div className="pl-5 md-lg:pl-0 md-lg:mt-5">
                  {cartProduct.length > 0 && (
                    <div className="bg-white font-semibold px-6 pt-4 pb-6 md:p-4 text-slate-600 flex flex-col gap-3 rounded-md shadow-lg hover:shadow-indigo-200">
                      <div className="border-b pb-4">
                        <h2 className="text-xl text-[#34548d] font-bold uppercase">
                          Order Summary
                        </h2>
                      </div>
                      <div className="flex justify-between items-center ">
                        <span>2 Items</span>
                        <span>$343</span>
                      </div>
                      <div className="flex justify-between items-center ">
                        <span>Shipping Fee</span>
                        <span>$343</span>
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
                        <span className="text-lg text-[#059473]">$343</span>
                      </div>
                      <button
                        onClick={redirect}
                        className="w-full inline-flex justify-center items-center gap-2 px-5 py-3 bg-[#34548d] text-white rounded-sm uppercase text-sm shadow-md hover:shadow-blue-200"
                      >
                        <HiOutlineClipboardDocumentCheck size={20} />
                        Process to Checkout
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
