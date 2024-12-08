import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import config from '../utils/config'
import { useLocation } from 'react-router-dom'
import Stripe from '../components/Stripe'
import { MdOutlinePayments } from 'react-icons/md'

const Payment = () => {
  const {
    state: { price, items, orderId }
  } = useLocation()
  const [paymentMethod, setPaymentMethod] = useState('stripe')
  return (
    <div>
      <Header />
      <section className="bg-[#eeeeee]">
        <div className="w-[90%] mx-auto py-16 mt-4">
          <div className="flex flex-wrap md:flex-col-reverse">
            <div className="w-7/12 md:w-full">
              <div className="pr-2 md:pr-0 ">
                <div className="flex flex-wrap">
                  <div
                    className={`w-[20%] border-r   cursor-pointer py-8 px-12 ${
                      paymentMethod === 'stripe' ? 'bg-white' : 'bg-slate-100'
                    }`}
                    onClick={() => setPaymentMethod('stripe')}
                  >
                    <div className="flex flex-col gap-[3px] justify-center items-center">
                      <img src={`${config.BASE_URL}/images/payment/stripe.png`} alt="" />
                    </div>
                    <span className="text-slate-600">Stripe</span>
                  </div>
                  <div
                    className={`w-[20%] border-r   cursor-pointer py-8 px-12 ${
                      paymentMethod === 'cod' ? 'bg-white' : 'bg-slate-100'
                    }`}
                    onClick={() => setPaymentMethod('cod')}
                  >
                    <div className="flex flex-col gap-[3px] justify-center items-center">
                      <img src={`${config.BASE_URL}/images/payment/cod.jpg`} alt="" />
                    </div>
                    <span className="text-slate-600">COD</span>
                  </div>
                </div>
              </div>
              {/*  */}
              {paymentMethod === 'stripe' && (
                <div className="">
                  <Stripe />
                </div>
              )}
              {paymentMethod === 'cod' && (
                <div className="w-full px-5 py-8 bg-white shadow-sm ">
                  <button className="px-10 py-[6px] rounded-sm hover;shadow-green-500/20 hover:shadow-lg bg-[#34548d] text-white flex flex-wrap justify-center items-center gap-1">
                    <MdOutlinePayments size={20} /> Pay Now
                  </button>
                </div>
              )}
            </div>
            {/* 7/12 */}
            <div className="w-5/12 md:w-full">
              <div className="pl-5 md:pl-0 md:mb-0">
                <div className="bg-white p-5 text-slate-600 flex flex-col gap-3 rounded-md shadow-md hover:shadow-indigo-200">
                  <div className="border-b py-4 ">
                    <h2 className="text-xl text-[#34548d] font-bold uppercase">Order Sumary</h2>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>{items} Items and Shipping Fee Included</span>
                    <span>${price} </span>
                  </div>
                  <div className="flex justify-between items-center font-semibold">
                    <span>Total Amount</span>
                    <span className="text-orange-500">${price}</span>
                  </div>
                </div>
              </div>
            </div>
            {/* 5/12 */}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Payment
