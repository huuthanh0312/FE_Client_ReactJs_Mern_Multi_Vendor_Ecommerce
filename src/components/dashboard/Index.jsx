import React, { useEffect } from 'react'
import { BsFillCartDashFill } from 'react-icons/bs'
import { FaCartFlatbed } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getDashBoardIndexData } from '../../store/Reducers/dashboardReducer'

const Index = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { userInfo } = useSelector((state) => state.auth)
  const { recentOrders, totalOrder, pendingOrder, cancelledOrder } = useSelector(
    (state) => state.dashboard
  )

  useEffect(() => {
    dispatch(getDashBoardIndexData(userInfo.id))
  }, [])

  // handle PayNow
  const handlePayNow = (orders) => {
    let items = 0
    for (let i = 0; i < orders.length; i++) {
      items = orders.products[i].quantity + items
    }
    navigate('/payment', { state: { price: orders.price, items, orderId: orders.Id } })
  }
  return (
    <div>
      {/*  */}
      <div className="w-full grid sm:grid-cols-1 md-lg:grid-cols-2 grid-cols-3 gap-5">
        <div className="flex justify-between items-center p-5 bg-white rounded-md gap-3 shadow-lg hover:shadow-indigo-200">
          <div className="flex flex-col justify-start items-start text-[#383737]">
            <h2 className="text-2xl font-bold">{totalOrder}</h2>
            <span className="text-md font-medium">Orders</span>
          </div>
          <div className="w-[50px] h-[50px] justify-center items-center flex rounded-full border-2 border-yellow-500 shadow-lg">
            <FaCartFlatbed size="26px" />
          </div>
        </div>
        <div className="flex justify-between items-center p-5 bg-white rounded-md gap-3 shadow-lg hover:shadow-indigo-200">
          <div className="flex flex-col justify-start items-start text-[#383737]">
            <h2 className="text-2xl font-bold">{pendingOrder}</h2>
            <span className="text-md font-medium">Pending Orders</span>
          </div>
          <div className="w-[50px] h-[50px] justify-center items-center flex rounded-full border-2 border-blue-500 shadow-lg">
            <BsFillCartDashFill size="26px" />
          </div>
        </div>

        <div className="flex justify-between items-center p-5 bg-white rounded-md gap-3 shadow-lg hover:shadow-indigo-200">
          <div className="flex flex-col justify-start items-start text-[#383737]">
            <h2 className="text-2xl font-bold">{cancelledOrder}</h2>
            <span className="text-md font-medium">Cancelled Orders</span>
          </div>
          <div className="w-[50px] h-[50px] justify-center items-center flex rounded-full border-2 border-rose-500 shadow-lg">
            <BsFillCartDashFill size="26px" />
          </div>
        </div>
      </div>
      {/*  */}
      <div className="bg-white mt-5 p-5 rounded-md shadow-md hover:shadow-indigo-200">
        <h2>Recent Orders</h2>
        <div className="pt-4">
          <div className="relative overflow-x-auto rounded-md min-h-[240px]">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Order Id
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Payment Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Order Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((o, i) => (
                  <tr key={i} className="bg-white border-b">
                    <td className="px-6 py-4 font-medium whitespace-nowrap">#{o._id}</td>
                    <td className="px-6 py-4 font-medium whitespace-nowrap">${o.price}</td>
                    <td className="px-6 py-4 font-medium whitespace-nowrap">{o.payment_status}</td>
                    <td className="px-6 py-4 font-medium whitespace-nowrap">{o.delivery_status}</td>
                    <td className="px-6 py-4 font-medium whitespace-nowrap">
                      <Link to={`/dashboard/order/details/${o._id}`}>
                        <span className="bg-green-200 text-green-700 text-md font-semibold mr-2 px-3 py-1 rounded shadow-sm cursor-pointer hover:shadow-green-600">
                          View
                        </span>
                      </Link>
                      {o.payment_status !== 'paid' && (
                        <button
                          onClick={() => handlePayNow(o)}
                          className="bg-blue-200 text-blue-700 text-md font-semibold mr-2 px-3 py-1 rounded shadow-sm cursor-pointer hover:shadow-blue-600 "
                        >
                          Pay Now
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index
