import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { FaHeart, FaList } from 'react-icons/fa'
import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { IoIosHome } from 'react-icons/io'
import { RiLockPasswordFill } from 'react-icons/ri'
import { MdMessage } from 'react-icons/md'
import { BsCartCheckFill } from 'react-icons/bs'
import { IoLogOut } from 'react-icons/io5'

const Dashboard = () => {
  const [filterShow, setFilterShow] = useState(false)

  return (
    <div>
      <Header />
      <div className="bg-slate-200 md-lg:pt-5">
        <div className="w-[90%] mx-auto md-lg:block hidden">
          <div>
            <button
              onClick={() => setFilterShow(!filterShow)}
              className="text-center py-3 px-3 bg-green-500 text-white"
            >
              <FaList />
            </button>
          </div>
        </div>
        {/* End Fa List */}
        <div className="h-full mx-auto">
          <div className="py-5 flex w-[90%] mx-auto relative">
            <div
              className={`rounded-md z-50 md-lg:absolute bg-white shadow-md ml-0 ${
                filterShow ? '-left-4 md-lg:ml-4' : '-left-[360px] w-[270px] '
              }`}
            >
              <ul className="py-2 text-slate-600 px-4">
                <li className="flex justify-start items-center gap-2 py-2">
                  <span>
                    <IoIosHome size={20} />
                  </span>
                  <Link to="/dashboard" className="block">
                    Dahsboard
                  </Link>
                </li>
                <li className="flex justify-start items-center gap-2 py-2">
                  <span>
                    <BsCartCheckFill size={20} />
                  </span>
                  <Link to="/dashboard/my-orders" className="block">
                    My Orders
                  </Link>
                </li>
                <li className="flex justify-start items-center gap-2 py-2">
                  <span>
                    <FaHeart size={20} />
                  </span>
                  <Link to="/dashboard/my-wishlist" className="block">
                    Wishlist
                  </Link>
                </li>
                <li className="flex justify-start items-center gap-2 py-2">
                  <span>
                    <MdMessage size={20} />
                  </span>
                  <Link to="/dashboard" className="block">
                    Chat Seller
                  </Link>
                </li>
                <li className="flex justify-start items-center gap-2 py-2">
                  <span>
                    <RiLockPasswordFill size={20} />
                  </span>
                  <Link to="/dashboard/change-password" className="block">
                    Change Password
                  </Link>
                </li>
                <li className="flex justify-start items-center gap-2 py-2">
                  <span>
                    <IoLogOut size={20} />
                  </span>
                  <Link to="/dashboard" className="block">
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
            <div className="w-[calc(100%-270px)] md-lg:w-full">
              <div className="ml-5 md-lg:mx-0">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Dashboard
