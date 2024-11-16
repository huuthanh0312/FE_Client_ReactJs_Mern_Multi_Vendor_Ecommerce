import React from 'react'
import config from '../utils/config'
import { FaHome } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { IoIosArrowForward } from 'react-icons/io'

const Breadcrumns = ({ title }) => {
  let bgBanner = `${config.BASE_URL}/images/banner/shop.jpg`
  return (
    <div>
      {/*Section  Breadcrumbs */}
      <section
        className=" h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left"
        style={{ backgroundImage: `url(${bgBanner})` }}
      >
        <div className="absolute left-0 top-0 w-full h-full bg-[#2422228a] ">
          <div className="w-[90%] h-full mx-auto">
            <div className="flex flex-col justify-center items-center gap-2 h-full w-full text-white">
              <h2 className="text-3xl font-bold ">{title} Page</h2>
              <div className="flex justify-center items-center gap-2 text-2xl w-full">
                <div className="inline-flex justify-center items-center hover:text-[#34548d] gap-2">
                  <FaHome size={24} />
                  <Link to="/">Home</Link>
                </div>
                <span>
                  <IoIosArrowForward size={20} className="pt-1" />
                </span>
                <span>{title}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*  */}
    </div>
  )
}

export default Breadcrumns
