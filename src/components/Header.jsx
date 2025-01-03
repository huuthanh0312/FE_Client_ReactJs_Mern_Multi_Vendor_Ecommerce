import React, { useEffect, useState } from 'react'
import { MdEmail, MdLanguage, MdOutlineEmail } from 'react-icons/md'
import { IoIosArrowDown, IoIosArrowUp, IoMdArrowDropdown, IoMdPhonePortrait } from 'react-icons/io'
import {
  FaFacebookSquare,
  FaGithub,
  FaHeart,
  FaLinkedin,
  FaList,
  FaPhoneAlt,
  FaShoppingCart,
  FaTwitterSquare,
  FaUser
} from 'react-icons/fa'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import config from '../utils/config'
import { BsList } from 'react-icons/bs'
import { FaUserAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { getCartProducts, getWishlistProducts } from '../store/Reducers/cartReducer'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { categories } = useSelector((state) => state.home)
  const { userInfo } = useSelector((state) => state.auth)
  const { cart_product_count, wishlist_count } = useSelector((state) => state.cart) //state loader

  const { pathname } = useLocation()
  const [showSidebar, setShowSidebar] = useState(true)
  const [categoryShow, setCategoryShow] = useState(true)

  const [searchValue, setSearchValue] = useState('')
  const [category, setCategory] = useState('')

  const search = () => {
    navigate(`/products/search?category=${category}&&value=${searchValue}`)
  }
  useEffect(() => {
    if (userInfo) {
      dispatch(getCartProducts(userInfo.id))
      dispatch(getWishlistProducts(userInfo.id))
    }
  }, [])
  // redirect Cart Page
  const redirectCartPage = () => {
    if (userInfo) {
      navigate('/cart')
    } else {
      navigate('/login')
    }
  }
  // redirect Cart Page
  const redirectWishlistPage = () => {
    if (userInfo) {
      navigate('/dashboard/my-wishlists')
    } else {
      navigate('/login')
    }
  }

  return (
    <div className="w-full bg-white mb-5">
      {/* Header top */}
      <div className="header-top bg-[#010101] md-lg:hidden">
        <div className="container mx-auto">
          <div className="flex w-full justify-between items-center h-[45px] text-slate-500">
            <ul className="flex justify-start items-center gap-8 font-semibold text-white">
              <li className="flex relative justify-center items-center text-sm gap-2 after:absolute after:h-[18px] after:w-[2px] after:bg-[#afafaf] after:-right-[16px]">
                <span>
                  <MdOutlineEmail />
                </span>
                <span>support@gmail.com</span>
              </li>

              <li className="flex relative justify-center items-center text-sm gap-2 ">
                <span>
                  <IoMdPhonePortrait />
                </span>
                <span>+(123) 123 1234</span>
              </li>
            </ul>
            <div>
              <div className="flex justify-center items-center gap-10">
                <div className="flex justify-center items-center gap-4 text-white">
                  <Link to="/">
                    <FaFacebookSquare />
                  </Link>
                  <Link to="/">
                    <FaTwitterSquare />
                  </Link>
                  <Link to="/">
                    <FaLinkedin />
                  </Link>
                  <Link to="/">
                    <FaGithub />
                  </Link>
                </div>
                <div
                  className="flex group cursor-pointer text-slate-800 text-sm justify-center items-center gap-2 relative after:absolute after:h-[18px] after:w-[2px] after:bg-[#afafaf] after:-right-[16px]
                   before:absolute before:h-[18px] before:w-[2px] before:bg-[#afafaf] before:-left-[18px]"
                >
                  <div className="flex justify-center items-center gap-2 px-1 text-white">
                    <div className="inline-flex justify-center items-center gap-1">
                      <MdLanguage />
                      <span>EN</span>
                      <span>
                        <IoMdArrowDropdown />
                      </span>
                      <ul className="absolute invisible transition-all top-12 rounded-sm duration-200 p-2 w-[100px] flex flex-col justify-center items-center gap-3 group-hover:visible group-hover:top-6 group-hover:bg-black z-10 shadow-lg">
                        <li className="hover:border-b-2 hover:border-white">ENGLISH</li>
                        <li className="hover:border-b-2 hover:border-white">VIETNAM</li>
                      </ul>
                    </div>
                  </div>
                </div>
                {userInfo ? (
                  <Link
                    to="/dashboard"
                    className="flex cursor-pointer justify-center items-center gap-2 text-sm text-white "
                  >
                    <span>
                      <FaUser />
                    </span>
                    <span>{userInfo.name}</span>
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="flex cursor-pointer justify-center items-center gap-2 text-sm text-white "
                  >
                    <span>
                      <FaUserAlt />
                    </span>
                    <span>Login / Register</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End header top */}
      {/* Sidebar header*/}
      <div className="w-white ">
        <div className="container mx-auto">
          <div className="h-[80px] md-lg:h-[100px] justify-between items-center flex flex-wrap ">
            <div className="md-lg:w-full w-3/12 md-lg:pt-4">
              <div className="flex justify-between items-center">
                <Link to="/">
                  <img src={`${config.BASE_URL}/logo.png`} alt="Logo" className="w-[80%]" />
                </Link>

                <div
                  className="justify-center items-center p-1 bg-white text-black hover:scale-105 rounded-md hover:shadow-md hover:shadow-indigo-200 cursor-pointer lg:hidden md-lg:flex xl:hidden hidden"
                  onClick={() => setShowSidebar(false)}
                >
                  <span>
                    <BsList size={28} />
                  </span>
                </div>
              </div>
            </div>
            {/*  */}
            <div className="md-lg:w-full w-7/12 md-lg:hidden">
              <div className="flex justify-center items-center">
                <ul className="flex justify-center items-center gap-8 text-sm font-bold uppercase">
                  <li>
                    <Link
                      to="/"
                      className={`p-2 block ${
                        pathname === '/' ? 'text-[#34548d]' : 'text-[#1c1c1c]'
                      } `}
                    >
                      <span className="hover:border-b-2 hover:border-blue-900 hover:text-[#34548d]">
                        Home
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/shop"
                      className={`p-2 block ${
                        pathname === '/shop' ? 'text-[#34548d]' : 'text-[#1c1c1c]'
                      } `}
                    >
                      <span className="hover:border-b-2 hover:border-blue-900 hover:text-[#34548d]">
                        Shop
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`p-2 block ${
                        pathname === '/blog' ? 'text-[#34548d]' : 'text-[#1c1c1c]'
                      } `}
                    >
                      <span className="hover:border-b-2 hover:border-blue-900 hover:text-[#34548d]">
                        Blog
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`p-2 block ${
                        pathname === '/about' ? 'text-[#34548d]' : 'text-[#1c1c1c]'
                      } `}
                    >
                      <span className="hover:border-b-2 hover:border-blue-900 hover:text-[#34548d]">
                        About Us
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`p-2 block ${
                        pathname === '/contact' ? 'text-[#34548d]' : 'text-[#1c1c1c]'
                      } `}
                    >
                      <span className="hover:border-b-2 hover:border-blue-900 hover:text-[#34548d]">
                        Contact Us
                      </span>
                    </Link>
                  </li>
                </ul>
                {/*  */}
              </div>
            </div>
            <div className="md-lg:w-full w-2/12">
              <div className="flex justify-end items-center flex-wrap">
                <div className="flex md-lg:hidden justify-center items-center gap-5 ">
                  <div className="flex justify-center gap-5">
                    <div
                      onClick={redirectWishlistPage}
                      className="relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]"
                    >
                      <span className="text-xl text-[#34548d]">
                        <FaHeart />
                      </span>
                      {wishlist_count > 0 && (
                        <div className="w-[20px] h-[20px] absolute bg-red-500 rounded-full text-white text-sm flex justify-center items-center -top-[3px] -right-[5px]">
                          {wishlist_count}
                        </div>
                      )}
                    </div>
                    <div
                      onClick={redirectCartPage}
                      className="relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]"
                    >
                      <span className="text-xl text-[#34548d]">
                        <FaShoppingCart />
                      </span>
                      {cart_product_count !== 0 && (
                        <div className="w-[20px] h-[20px] absolute bg-red-500 rounded-full text-white text-sm flex justify-center items-center -top-[3px] -right-[5px]">
                          {cart_product_count}
                        </div>
                      )}
                    </div>
                    {/* <div className="relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]">
                      <span className="text-xl text-[#34548d]">
                        <FaUser />
                      </span>
                      <div className="w-[20px] h-[20px] absolute bg-red-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]">
                        {wishlist_count}
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="hidden md-lg:block">
          <div
            onClick={() => setShowSidebar(true)}
            className={`fixed duration-300 transition-all ${
              showSidebar ? 'invisible' : 'visible'
            } hidden md-lg:block w-screen h-screen bg-[rgba(0,0,0,0.3)] top-0 left-0 z-[9999]`}
          >
            <div
              className={`w-[300px] h-screen z-[9999] transition-all duration-200 fixed ${
                showSidebar ? '-left-[300px]' : 'left-0 top-0'
              } overflow-y-auto bg-white py-6 px-8`}
            >
              <div className="flex justify-between items-center relative">
                <Link to="/">
                  <img src={`${config.BASE_URL}/logo.png`} alt="Logo" className="w-[80%]" />
                </Link>
              </div>
              {/*  */}
              <div className="flex justify-start items-center gap-8 font-semibold">
                <div className="flex group cursor-pointer text-[#1c1c1c] text-sm justify-center items-center gap-2 relative after:absolute after:h-[18px] after:w-[2px] after:bg-[#afafaf] after:-right-[16px]">
                  <div className="flex justify-center items-center font-bold gap-1 px-1 text-[#1c1c1c]">
                    <div className="inline-flex justify-center items-center gap-1">
                      <MdLanguage />
                      <span>EN</span>
                      <span>
                        <IoMdArrowDropdown />
                      </span>
                      <ul className="absolute invisible transition-all top-12 rounded-sm duration-200 p-2 w-[100px] flex flex-col justify-center items-center gap-3 group-hover:visible group-hover:top-6 group-hover:bg-black z-10 shadow-lg text-white">
                        <li className="hover:border-b-2 hover:border-white">ENGLISH</li>
                        <li className="hover:border-b-2 hover:border-white">VIETNAM</li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/*  */}
                {userInfo ? (
                  <Link
                    to="/dashboard"
                    className="flex cursor-pointer justify-center items-center gap-2 text-sm text-[#1c1c1c] "
                  >
                    <span>
                      <FaUser />
                    </span>
                    <span className="text-[#34548d]">{userInfo.name}</span>
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="flex cursor-pointer justify-center items-center gap-2 text-sm text-[#1c1c1c] "
                  >
                    <span>
                      <FaUserAlt />
                    </span>
                    <span>Login / Register</span>
                  </Link>
                )}
              </div>
              {/*  */}
              <ul className="flex flex-col justify-start items-start text-sm font-bold uppercase py-2">
                <li>
                  <Link
                    to="/"
                    className={`py-2 block ${
                      pathname === '/' ? 'text-[#34548d]' : 'text-slate-700'
                    } `}
                  >
                    <span className="hover:border-b-2 hover:border-blue-900 hover:text-[#34548d]">
                      Home
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/shop"
                    className={`py-2 block ${
                      pathname === '/shop' ? 'text-[#34548d]' : 'text-slate-700'
                    } `}
                  >
                    <span className="hover:border-b-2 hover:border-blue-900 hover:text-[#34548d]">
                      Shop
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    className={`py-2 block ${
                      pathname === '/blog' ? 'text-[#34548d]' : 'text-slate-700'
                    } `}
                  >
                    <span className="hover:border-b-2 hover:border-blue-900 hover:text-[#34548d]">
                      Blog
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    className={`py-2 block ${
                      pathname === '/about' ? 'text-[#34548d]' : 'text-slate-700'
                    } `}
                  >
                    <span className="hover:border-b-2 hover:border-blue-900 hover:text-[#34548d]">
                      About Us
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    className={`py-2 block ${
                      pathname === '/contact' ? 'text-[#34548d]' : 'text-slate-700'
                    } `}
                  >
                    <span className="hover:border-b-2 hover:border-blue-900 hover:text-[#34548d]">
                      Contact Us
                    </span>
                  </Link>
                </li>
              </ul>
              {/*  */}
              <div className="flex justify-start items-center gap-4 text-[#1c1c1c]">
                <Link to="/">
                  <FaFacebookSquare />
                </Link>
                <Link to="/">
                  <FaTwitterSquare />
                </Link>
                <Link to="/">
                  <FaLinkedin />
                </Link>
                <Link to="/">
                  <FaGithub />
                </Link>
              </div>
              {/*  */}
              <div className="w-full flex justify-end md-lg:justify-start gap-3 items-center py-4">
                <div className="w-[48px] h-[48px] rounded-full flex bg-[#f5f5f5] justify-center items-center text-[#34548d]">
                  <span>
                    <FaPhoneAlt className="animate-bounce" />
                  </span>
                </div>
                <div className="flex justify-end flex-col gap-1 text-[#1c1c1c]">
                  <h2 className="text-sm font-medium text-[#34548d]">+(123) 123 1234</h2>
                  <span className="text-xs font-semibold">Support 24/7</span>
                </div>
              </div>
              {/*  */}
              <ul className="flex flex-col justify-start items-start gap-3 text-[#1c1c1c]">
                <li className="flex justify-start items-center gap-2 text-sm font-semibold">
                  <span>
                    <MdEmail size={18} />
                  </span>
                  <span>support@gmail.com</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/*End Sidebar */}
      {/* Category and search */}
      <div className="container mx-auto">
        <div className="flex w-full flex-wrap md-lg:gap-8">
          <div className="w-3/12 md-lg:w-full">
            <div className="bg-white relative">
              <div
                onClick={() => setCategoryShow(!categoryShow)}
                className="h-[50px] bg-[#34548d] text-white flex justify-between items-center px-6 gap-3 font-bold text-md cursor-pointer"
              >
                <div className="flex justify-center items-center gap-3">
                  <span>
                    <FaList />
                  </span>
                  <span>All Category </span>
                </div>
                <span className="">
                  {categoryShow ? <IoIosArrowDown size={18} /> : <IoIosArrowUp size={18} />}
                </span>
              </div>
              {/*  */}
              <div
                className={`${
                  categoryShow ? 'h-0' : 'h-auto py-4'
                } w-full overflow-hidden transition-all md-lg:absolute duration-500 absolute z-[9991] bg-[#dddbdb]`}
              >
                <ul className=" text-slate-600 font-medium ">
                  {categories.map((c, i) => {
                    return (
                      <li
                        key={i}
                        className="flex justify-start items-center gap-2 px-[24px] py-[6px] hover:bg-[#34548d] hover:text-white hover:scale-105"
                      >
                        <img
                          src={c.image}
                          alt=""
                          className="w-6 h-6 rounded-full overflow-hidden"
                        />
                        <Link to={`/products?category=${c.slug}`} className="text-md block">
                          {c.name}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
              {/*  */}
            </div>
          </div>
          {/* End Category   */}
          <div className=" w-7/12 md-lg:w-full pl-2 md-lg:pl-0">
            <div className="flex justify-center items-center w-full">
              <div className="flex border h-[50px] items-center gap-6 md-lg:w-full">
                <div className="relative after:absolute after:h-[25px] after:w-[2px] after:bg-[#afafaf] after:-right-[15px] md:hidden">
                  <select
                    name=""
                    id=""
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-auto text-slate-600 font-semibold bg-transparent px-2 h-full outline-0 border-none"
                  >
                    <option value="">Select Category</option>
                    {categories.map((c, i) => (
                      <option key={i} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                {/*  */}
                <input
                  type="text"
                  className="w-full h-full relative bg-transparent text-slate-500 outline-0 px-4 "
                  onChange={(e) => setSearchValue(e.target.value)}
                  name=""
                  id=""
                  placeholder="What do you need "
                />
                {/*  */}
                <button
                  onClick={search}
                  className="bg-[#34548d] right-0 px-8 h-full font-semibold uppercase text-white"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          {/*  */}
          <div className="w-2/12 block md-lg:hidden pl-2 md-lg:w-full md-lg:pl-0">
            <div className="w-full flex justify-end md-lg:justify-start gap-1 items-center">
              <div className="w-[48px] h-[48px] rounded-full flex bg-[#f5f5f5] justify-center items-center text-[#34548d]">
                <span>
                  <FaPhoneAlt className="animate-bounce" />
                </span>
              </div>
              <div className="flex justify-end items-center flex-col gap-2 text-[#1c1c1c] ">
                <h2 className="font-medium xl:text-xs text-[#34548d]">+(123) 123 1234</h2>
                <span className="text-xs font-semibold">Support 24/7</span>
              </div>
            </div>
            {/*  */}
          </div>
        </div>
      </div>
      {/*  */}
    </div>
  )
}

export default Header
