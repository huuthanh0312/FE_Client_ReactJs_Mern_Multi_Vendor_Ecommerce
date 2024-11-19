import React from 'react'
import config from '../../utils/config'
import { FaEye, FaRegHeart } from 'react-icons/fa'
import { RiShoppingCartLine } from 'react-icons/ri'
import Rating from '../Rating'
import { Link } from 'react-router-dom'

const ShopProducts = ({ styles }) => {
  return (
    <div
      className={`w-full grid gap-6 ${
        styles === 'grid'
          ? 'grid-cols-3 md-lg:grid-cols-2 md:grid-cols-2'
          : 'grid-cols-1 md-lg:grid-cols-2 md:grid-cols-2'
      }`}
    >
      {[1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6].map((p, i) => (
        <div
          key={i}
          className={`flex transition-all duration-800 hover:-translate-y-3 w-full gap-4 bg-white pb-4 rounded-md shadow-lg ${
            styles === 'grid'
              ? 'flex-col justify-start items-start'
              : 'md-lg:flex-col justify-start items-center md-lg:items-start'
          }`}
        >
          <div
            className={`${
              styles === 'grid'
                ? 'w-full relative group h-[210px] md:h-[270px] xs:h[170px] overflow-hidden'
                : 'md-lg:w-full relative group h-[210px] md:h-[270px] overflow-hidden'
            }`}
          >
            {/* discount */}
            <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full shadow-md bg-red-500 font-semibold text-xs left-2 top-2">
              8%
            </div>
            <div className=" flex justify-center items-center">
              <img
                src={`${config.BASE_URL}/images/products/${p}.webp`}
                alt=""
                className={`h-[240px] md:h-[270px] xs:h[170px] ${
                  styles === 'grid' ? 'w-auto' : 'w-[240px]'
                } `}
              />
            </div>
            <ul className="flex absolute transition-all duration-700 -bottom-10 justify-center items-center gap-2 w-full group-hover:bottom-5">
              <Link
                to={`/product/details/1344322`}
                className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full shadow-md transition-all 
                  hover:bg-[#34548d] hover:text-white hover:rotate-[720deg]"
              >
                <FaEye />
              </Link>
              <li
                className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full shadow-md transition-all 
                  hover:bg-[#34548d] hover:text-white hover:rotate-[720deg]"
              >
                <FaRegHeart />
              </li>
              <li
                className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full shadow-md transition-all 
                  hover:bg-[#34548d] hover:text-white hover:rotate-[720deg]"
              >
                <RiShoppingCartLine />
              </li>
            </ul>
            {/*  */}
          </div>
          <div className="px-3 flex justify-start items-start gap-1 flex-col text-slate-600">
            <h2 className="font-bold">Product Name</h2>
            <div className="flex justify-start items-center gap-3">
              <div className="text-md font-semibold">$3443</div>
              <div className="flex ">
                <Rating ratings={4.5} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ShopProducts
