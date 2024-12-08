import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { ClipLoader, PropagateLoader } from 'react-spinners'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaEye, FaEyeSlash, FaFacebook, FaGoogle } from 'react-icons/fa'
import config from '../utils/config'
import { overrideStyle } from '../utils/utils'
import toast from 'react-hot-toast'
import { customer_login, messageClear } from '../store/Reducers/authReducer'

const Login = () => {
  const navigate = useNavigate() // điều hướng trang
  const dispatch = useDispatch() //kết nối component với Redux store để có thể gửi action và thay đổi state toàn cục của ứng dụng.
  const { loader, userInfo, errorMessage, successMessage } = useSelector((state) => state.auth) //state loader

  const [showPassword, setShowPassword] = useState(false) // state show password
  const [state, setState] = useState({
    name: '',
    email: '',
    password: ''
  })
  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }
  const submit = (e) => {
    e.preventDefault()
    dispatch(customer_login(state))
  }
  // use Effect check toast message error
  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage)
      dispatch(messageClear()) //message clear function reudx
    }
    if (successMessage) {
      toast.success(successMessage)
      dispatch(messageClear()) //message clear function reudx
    }
    if (userInfo) {
      navigate('/')
    }
  }, [errorMessage, successMessage])

  // show hide password
  const showPasswordClick = () => {
    if (showPassword === true) {
      setShowPassword(false)
    } else {
      setShowPassword(true)
    }
  }
  return (
    <div>
      <Header />
      <div className="bg-slate-200 mt-4">
        <div className="w-full justify-center items-center p-12">
          <div className="grid grid-cols-2 md:grid-cols-1 w-[70%] md-lg:w-full md:w-[80%] xs:w-full mx-auto bg-white rounded-xl shadow-lg">
            <div className="p-6">
              <h2 className="font-bold text-center mb-2 uppercase text-xl">Thanh Shop! 👋</h2>
              <div className="text-center">
                <span className="mb-2 font-mono">Please login your account!</span>
              </div>

              <form onSubmit={submit}>
                <div className="flex flex-col w-full gap-1 mb-2 relative">
                  <label htmlFor="email">Email</label>
                  <input
                    onChange={inputHandle}
                    value={state.email}
                    disabled={loader ? true : false}
                    className="px-3 py-2 outline-none border border-slate-400 bg-transparent rounded-md focus:border-[#34548d]"
                    type="email"
                    name="email"
                    placeholder="Email"
                    id="email"
                    required
                  />
                  {loader ? (
                    <ClipLoader
                      size={20}
                      color="#f77001"
                      className="absolute top-10 right-3 end-0 items-center justify-center"
                    />
                  ) : (
                    <></>
                  )}
                </div>
                <div className="flex flex-col w-full gap-1 mb-3 relative">
                  <label htmlFor="password">Password</label>
                  <input
                    onChange={inputHandle}
                    value={state.password}
                    disabled={loader ? true : false}
                    type={showPassword ? 'text' : 'password'}
                    className="px-3 py-2 outline-none border border-slate-400 bg-transparent rounded-md focus:border-[#34548d]"
                    name="password"
                    placeholder={showPassword ? 'Password' : '••••••••'}
                    id="password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute top-7 end-0 p-3.5 rounded-e-md"
                    onClick={() => showPasswordClick()}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>

                <button className=" bg-slate-700 hover:bg-[#34548d] w-full hover:shadow-blue-300/hover:shadow-lg text-white rounded-md px-7 py-2 mb-2">
                  {loader ? (
                    <PropagateLoader size={10} color="#f77001" cssOverride={overrideStyle} />
                  ) : (
                    'Login'
                  )}
                </button>
                <div className="flex items-center mb-2 gap-3 justify-center xs:text-sm">
                  <p>
                    Dont't Have an acount ?{' '}
                    <Link className="font-bold text-[#34548d]" to="/register">
                      {' '}
                      Register
                    </Link>
                  </p>
                </div>
                {/*Dave*/}
                <div className="w-full flex justify-center items-center mb-2">
                  <div className="w-[45%] bg-slate-700 h-[1px]"></div>
                  <div className="w-[10%] flex justify-center items-center">
                    <span className="pb-1">Or</span>
                  </div>
                  <div className="w-[45%] bg-slate-700 h-[1px]"></div>
                </div>

                <div className="flex justify-center items-center gap-3">
                  <div
                    className="w-[135px] h-[35px] flex rounded-md bg-orange-600 shadow-lg hover:shadow-orange-700/50
                  justify-center cursor-pointer items-center overflow-hidden "
                  >
                    <span>
                      <FaGoogle className="text-white" size={20} />
                    </span>
                  </div>
                  <div
                    className="w-[135px] h-[35px] flex rounded-md bg-blue-700 shadow-lg hover:shadow-[#34548d]/50
                  justify-center cursor-pointer items-center overflow-hidden "
                  >
                    <span>
                      <FaFacebook className="text-white" size={20} />
                    </span>
                  </div>
                </div>
              </form>
            </div>
            <div className="md:hidden">
              <div className="w-full h-full py-4 pr-4 ">
                <img
                  src={`${config.BASE_URL}/images/login-1.png`}
                  alt=""
                  className="w-full h-full object-contain "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Login
