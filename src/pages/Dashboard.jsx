import React, { useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { FaHeart, FaList } from 'react-icons/fa'
import { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { IoIosHome } from 'react-icons/io'
import { RiLockPasswordFill } from 'react-icons/ri'
import { MdMessage } from 'react-icons/md'
import { BsCartCheckFill } from 'react-icons/bs'
import { FaSignOutAlt } from 'react-icons/fa'
import { FaListCheck } from 'react-icons/fa6'

const Dashboard = () => {
  const { pathname } = useLocation()
  //console.log(pathname)
  const [filterShow, setFilterShow] = useState(false)
  // Hàm theo dõi kích thước màn hình
  const handleResize = () => {
    if (window.innerWidth > 991) {
      setFilterShow(false) // Reset filterShow khi màn hình lớn hơn 991px
    }
  }
  useEffect(() => {
    // Gắn sự kiện resize
    window.addEventListener('resize', handleResize)
    handleResize() // Kiểm tra lần đầu khi component được render

    return () => {
      // Cleanup sự kiện resize khi component unmount
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  return (
    <div>
      <Header />
      <div className="bg-slate-200 md-lg:pt-5">
        <div className="container mx-auto md-lg:block hidden">
          <div>
            <button
              onClick={() => setFilterShow(!filterShow)}
              className="text-center py-3 px-3 bg-green-500 text-white rounded"
            >
              {!filterShow ? <FaList /> : <FaListCheck />}
            </button>
          </div>
        </div>
        {/* End Fa List */}
        <div className="h-full mx-auto">
          <div className="py-5 flex container mx-auto relative">
            <div
              className={`rounded-md z-50 md-lg:absolute bg-white shadow-md ml-0 transition-all duration-500 ${
                filterShow ? 'left-16 -top-10 w-[270px]' : '-left-[460px] top-0 w-[270px] '
              }`}
            >
              <ul className={`text-slate-600  ${filterShow ? 'p-2' : 'p-4'}`}>
                <li>
                  <Link
                    to="/dashboard"
                    className={`${
                      pathname === '/dashboard'
                        ? 'font-bold bg-gradient-to-t from-gray-200 to-white border-l-4 border-blue-600 text-blue-600 shadow-md shadow-gray-500/50 duration-500'
                        : 'text-[#383737] font-bold duration-200 hover:bg-gray-100'
                    } cursor-pointer px-3 py-2 flex justify-start items-center gap-2 hover:pl-5 transition-all w-full mb-1`}
                  >
                    <IoIosHome size={20} />
                    Dahsboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/my-orders"
                    className={`${
                      pathname.startsWith('/dashboard/my-orders')
                        ? 'font-bold bg-gradient-to-t from-gray-200 to-white border-l-4 border-blue-600 text-blue-600 shadow-md shadow-gray-500/50 duration-500'
                        : 'text-[#383737] font-bold duration-200 hover:bg-gray-100'
                    } cursor-pointer px-3 py-2 flex justify-start items-center gap-2 hover:pl-5 transition-all w-full mb-1`}
                  >
                    <BsCartCheckFill size={20} />
                    My Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/my-wishlists"
                    className={`${
                      pathname === '/dashboard/my-wishlists'
                        ? 'font-bold bg-gradient-to-t from-gray-200 to-white border-l-4 border-blue-600 text-blue-600 shadow-md shadow-gray-500/50 duration-500'
                        : 'text-[#383737] font-bold duration-200 hover:bg-gray-100'
                    } cursor-pointer px-3 py-2 flex justify-start items-center gap-2 hover:pl-5 transition-all w-full mb-1`}
                  >
                    <FaHeart size={20} />
                    My Wishlists
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/chat"
                    className={`${
                      pathname.startsWith('/dashboard/chat')
                        ? 'font-bold bg-gradient-to-t from-gray-200 to-white border-l-4 border-blue-600 text-blue-600 shadow-md shadow-gray-500/50 duration-500'
                        : 'text-[#383737] font-bold duration-200 hover:bg-gray-100'
                    } cursor-pointer px-3 py-2 flex justify-start items-center gap-2 hover:pl-5 transition-all w-full mb-1`}
                  >
                    <MdMessage size={20} />
                    Chat Seller
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/change-password"
                    className={`${
                      pathname === '/dashboard/change-password'
                        ? 'font-bold bg-gradient-to-t from-gray-200 to-white border-l-4 border-blue-600 text-blue-600 shadow-md shadow-gray-500/50 duration-500'
                        : 'text-[#383737] font-bold duration-200 hover:bg-gray-100'
                    } cursor-pointer px-3 py-2 flex justify-start items-center gap-2 hover:pl-5 transition-all w-full mb-1`}
                  >
                    <RiLockPasswordFill size={20} />
                    Change Password
                  </Link>
                </li>
                <li>
                  <button className="text-[#383737] font-bold duration-200 hover:bg-indigo-50 cursor-pointer px-3 py-2 rounded-md flex justify-start items-center gap-2 hover:pl-4 transition-all w-full mb-1 border-t">
                    <span>
                      <FaSignOutAlt />
                    </span>
                    <span>Logout</span>
                  </button>
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
