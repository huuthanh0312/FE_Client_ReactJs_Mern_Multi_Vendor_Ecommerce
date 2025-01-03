import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getOrdersByStatus } from '../../store/Reducers/orderReducer'

const Orders = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { userInfo } = useSelector((state) => state.auth)
  const { myOrders } = useSelector((state) => state.order)
  const [statusListOrder, setStatusListOrder] = useState('all')

  useEffect(() => {
    if (userInfo?.id) {
      dispatch(getOrdersByStatus({ customerId: userInfo.id, status: statusListOrder }))
    } else {
      console.warn('Customer ID is not available.')
    }
  }, [dispatch, userInfo?.id, statusListOrder])

  // handle PayNow
  const handlePaymentOrder = (o) => {
    const items = o.products.reduce((total, product) => total + product.quantity, 0)
    navigate('/payment', { state: { price: o.price, items, orderId: o._id } })
  }
  return (
    <div>
      <div className="bg-white p-4 rounded-md shadow-md">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-[#34548d] uppercase">My Orders</h2>
          <select
            value={statusListOrder}
            onChange={(e) => setStatusListOrder(e.target.value)}
            className="outline-none px-3 py-1 border rounded-md text-slate-600"
          >
            <option value="all">-- Order Status --</option>
            <option value="placed">Placed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
            <option value="warehouse">Warehouse</option>
          </select>
        </div>
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
                {myOrders.map((o, i) => (
                  <tr key={i} className="bg-white border-b">
                    <td className="px-6 py-4 font-medium whitespace-nowrap">#{o._id}</td>
                    <td className="px-6 py-4 font-medium whitespace-nowrap">${o.price}</td>
                    <td className="px-6 py-4 font-medium whitespace-nowrap">{o.payment_status}</td>
                    <td className="px-6 py-4 font-medium whitespace-nowrap">{o.delivery_status}</td>
                    <td className="px-6 py-4 font-medium whitespace-nowrap">
                      <Link to={`/dashboard/my-orders/details/${o._id}`}>
                        <span className="bg-green-200 text-green-700 text-md font-semibold mr-2 px-3 py-1 rounded shadow-sm cursor-pointer hover:shadow-green-600">
                          View
                        </span>
                      </Link>
                      {o.payment_status !== 'paid' && (
                        <button
                          onClick={() => handlePaymentOrder(o)}
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

export default Orders
