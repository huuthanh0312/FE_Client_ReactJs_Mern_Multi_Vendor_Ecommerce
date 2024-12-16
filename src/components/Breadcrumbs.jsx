import React from 'react'
import config from '../utils/config'
import { FaHome } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { IoIosArrowForward } from 'react-icons/io'

const Breadcrumbs = ({ title, showHome }) => {
  const bgBanner = `${config.BASE_URL}/images/banner/shop.jpg`

  return (
    <section
      className="h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left"
      style={{ backgroundImage: `url(${bgBanner})` }}
    >
      <div className="absolute inset-0 bg-[#2422228a]">
        <div className="container h-full mx-auto flex flex-col justify-center items-center text-white gap-2">
          <h2 className="text-3xl font-bold">{title} Page</h2>
          {showHome && (
            <div className="flex justify-end items-center gap-2 text-2xl">
              <Link to="/" className="flex justify-center items-center gap-2 hover:text-[#34548d]">
                <FaHome size={24} />
                <span>Home</span>
              </Link>
              <IoIosArrowForward size={20} className="mt-1" />
              <span>{title}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Breadcrumbs
