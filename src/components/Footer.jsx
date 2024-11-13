import React from 'react'
import config from '../utils/config'
import { Link } from 'react-router-dom'
import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="bg-[#f3f6fa]">
      <div className="w-[90%] flex flex-wrap mx-auto pb-16 pt-10 md-lg:pb-10 sm:pb-6">
        <div className="sm:w-full lg:w-4/12 w-3/12">
          <div className="flex flex-col gap-3">
            <Link to="/">
              <img src={`${config.BASE_URL}/logo.png`} alt="Logo" className="w-[190px] h-[70px]" />
            </Link>
            <ul className="flex flex-col gap-2 text-slate-600 font-semibold">
              <li>Address: 13th Street, 4432 W 13th, New York, USA </li>
              <li>Phone: +(123) 123 1234</li>
              <li>Email: support@example.com</li>
            </ul>
          </div>
        </div>
        {/*  */}
        <div className="sm:w-full lg:w-8/12 w-5/12">
          <div className="flex justify-center sm:justify-start sm:mt-6 w-full pt-4">
            <div className="">
              <h2 className="font-bold text-lg text-slate-600 mb-2">Usefull Links</h2>
              <div className="flex justify-between gap-[80px] lg:gap-[40px]">
                <ul className="flex flex-col gap-2 text-slate-600 text-sm font-semibold">
                  <li>
                    <Link>About Us</Link>
                  </li>
                  <li>
                    <Link>About Our Shop</Link>
                  </li>
                  <li>
                    <Link>Delivery Information</Link>
                  </li>
                  <li>
                    <Link>Privacy Policy</Link>
                  </li>
                  <li>
                    <Link>Blogs</Link>
                  </li>
                </ul>
                {/*  */}
                <ul className="flex flex-col gap-2 text-slate-600 text-sm font-semibold">
                  <li>
                    <Link>Our Service</Link>
                  </li>
                  <li>
                    <Link>Company Profile</Link>
                  </li>
                  <li>
                    <Link>Delivery Information</Link>
                  </li>
                  <li>
                    <Link>Privacy Policy</Link>
                  </li>
                  <li>
                    <Link>Blogs</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="lg:w-full w-4/12 lg:mt-6">
          <div className="w-full justify-start flex flex-col gap-3 pt-4">
            <h2 className="font-bold text-lg mb-2 text-slate-600">Join Our Shop</h2>
            <span className="font-semibold text-slate-600">
              Get Email updates tour latest anf shop specials offers
            </span>
            <div className="h-[50px] w-full bg-white border relative">
              <input
                type="text"
                className="h-full bg-transparent w-full px-3 outline-0"
                placeholder="Enter Your Email"
              />
              <button className="h-full absolute right-0 bg-[#34548d] text-white uppercase px-4 font-bold text-sm">
                Subscribe
              </button>
            </div>
            <ul className="flex justi items-center gap-3">
              <li>
                <Link
                  to="#"
                  className="w-[38px] h-[38px] hover:bg-[#34548d] hover:text-white flex justify-center items-center bg-white rounded-full"
                >
                  <FaFacebook />
                </Link>
              </li>

              <li>
                <Link
                  to="#"
                  className="w-[38px] h-[38px] hover:bg-[#34548d] hover:text-white flex justify-center items-center bg-white rounded-full"
                >
                  <FaTwitter />
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="w-[38px] h-[38px] hover:bg-[#34548d] hover:text-white flex justify-center items-center bg-white rounded-full"
                >
                  <FaLinkedin />
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="w-[38px] h-[38px] hover:bg-[#34548d] hover:text-white flex justify-center items-center bg-white rounded-full"
                >
                  <FaGithub />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/*  */}
      <div className="w-[90%] flex flex-wrap mx-auto justify-center items-center text-slate-600 py-5 text-center">
        <span>Copyright @ {currentYear} All Rights Reserved</span>
      </div>
    </footer>
  )
}

export default Footer
