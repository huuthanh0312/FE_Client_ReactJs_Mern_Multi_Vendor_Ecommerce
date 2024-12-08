import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getOrderDetails } from '../../store/Reducers/orderReducer'
import { useDispatch, useSelector } from 'react-redux'
import Shipping from './../../pages/Shipping'
import { BsShop } from 'react-icons/bs'

const OrderDetails = () => {
  const dispatch = useDispatch()
  const { orderId } = useParams()
  const { myOrder } = useSelector((state) => state.order)
  const { userInfo } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(getOrderDetails(orderId))
  }, [orderId])
  return (
    <div>
      <div className="bg-white py-2 px-5 rounded-md shadow-md">
        <div className="border-b py-2">
          <h2 className="text-lg font-semibold text-[#34548d] uppercase">
            Order Details : <span className="text-orange-500">#{orderId} - </span>
            <span>{myOrder.date}</span>
          </h2>
        </div>
        <div className="py-4 grid grid-cols-2 md-lg:grid-cols-1 gap-5 ">
          <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-[#e5e5e5] rounded-md hover:shadow-lg ">
            <div className="flex gap-2 ">
              <span className="font-semibold">Deliver To :</span>
              <span className="text-[#34548d] font-semibold">{userInfo.name}</span>
            </div>
            <div className="flex gap-2 ">
              <span className="font-semibold">Address:</span>
              <span>
                {myOrder.shippingInfo?.address} {myOrder.shippingInfo?.province}{' '}
                {myOrder.shippingInfo?.city}
              </span>
            </div>
            <div className="flex gap-2 ">
              <span className="font-semibold">Email to:</span>
              <span>{userInfo.email}</span>
            </div>
          </div>
          {/*  */}
          <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-[#e5e5e5] rounded-md shadow hover:shadow-indigo-200 ">
            <div className="flex gap-2 ">
              <span className="font-semibold">Price:</span>
              <p>
                <span className="text-orange-500">${myOrder.price} </span>Include Shipping
              </p>
            </div>

            <div className="flex gap-2 ">
              <span className="font-semibold">Payment Status:</span>
              <p>
                <span
                  className={` text-xs cursor-pointer font-normal ml-2 px-2 py-1 rounded-md ${
                    myOrder.payment_status === 'paid'
                      ? 'bg-green-300 text-green-800'
                      : 'bg-red-300 text-red-800'
                  }`}
                >
                  {myOrder.payment_status}
                </span>
              </p>
            </div>
            <div className="flex gap-2 ">
              <span className="font-semibold">Order Status:</span>
              <p>
                <span
                  className={` text-xs cursor-pointer font-normal ml-2 px-2 py-1 rounded-md ${
                    myOrder.delivery_status === 'paid'
                      ? 'bg-green-300 text-green-800'
                      : 'bg-red-300 text-red-800'
                  }`}
                >
                  {myOrder.delivery_status}
                </span>
              </p>
            </div>
          </div>
          {/*  */}
        </div>
        <div className="">
          <div className="border-b py-2">
            <h2 className="text-lg font-semibold text-[#34548d] uppercase">Order Products</h2>
          </div>
          <div className="flex bg-[#e5e5e5] p-4 my-4 sm:px-2 flex-col gap-2 rounded-md shadow-md hover:shadow-indigo-200">
            {myOrder.products?.map((p, i) => (
              <div key={i} className="w-full flex flex-wrap">
                <div className="w-full flex gap-4 sm:gap-2 bg-white rounded-md shadow-lg">
                  <div className="flex justify-center items-start gap-4 p-2 relative ">
                    {p.discount > 0 && (
                      <div className="flex justify-center items-center absolute text-white w-[24px] h-[24px] rounded-full shadow-md bg-red-500 font-semibold text-[10px] p-2 left-2 top-2">
                        {p.discount}%
                      </div>
                    )}

                    <div className="w-16 h-16">
                      <img
                        src={p.images[0]}
                        alt=""
                        className="w-full h-full rounded-md object-contain"
                      />
                    </div>
                    <div className="flex flex-col gap-4">
                      <div>
                        <h3 className="text-base font-bold text-gray-800">{p.name}</h3>
                        <p className="text-sm font-semibold text-gray-500 mt-2 flex items-center gap-2">
                          Brand: {p.brand}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col ml-auto px-6 py-3 sm:px-1">
                    <h3 className="flex justify-start items-start text-base font-bold gap-2">
                      <span className="text-slate-800 line-through">${p.price}</span>{' '}
                      <span className="text-orange-500">
                        ${p.price - Math.floor((p.price * p.discount) / 100)}
                      </span>
                    </h3>
                    <div>
                      <p className="text-sm font-semibold text-gray-500 mt-2 flex items-center gap-2">
                        Quantity: <span className="text-orange-500">{p.quantity}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetails
