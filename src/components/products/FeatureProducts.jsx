import React from 'react'
import config from '../../utils/config'
import { FaEye, FaRegHeart } from 'react-icons/fa'
import { RiShoppingCartLine } from 'react-icons/ri'
import Rating from '../Rating'
import { Link } from 'react-router-dom'

const FeatureProducts = ({ products }) => {
  return (
    <div className="w-[90%] flex flex-wrap mx-auto py-8">
      <div className="w-full ">
        <div className="text-center flex justify-center items-center flex-col text-4xl text-slate-600 font-bold relative pb-[45px] ">
          <h2>Feature Products</h2>
          <div className="w-[180px] h-[2px] bg-[#34548d] mt-4"></div>
        </div>
      </div>
      {/*  */}
      <div className="w-full grid grid-cols-4 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
        {products.map((p, i) => (
          <div
            key={i}
            className=" group transition-all duration-500 border rounded-md shadow-md hover:shadow-md hover:-mt-3"
          >
            <div className="relative overflow-hidden ">
              {p.discount > 0 && (
                <div className="flex justify-center items-center absolute text-white w-[35px] h-[35px] rounded-full shadow-md bg-red-500 font-semibold text-xs left-2 top-2">
                  {p.discount}%
                </div>
              )}

              <div className="flex w-full h-[210px] justify-center items-center">
                <img src={p.images[0]} alt="" className="w-auto h-full" />
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
            <div className="py-3 px-4 text-slate-600 ">
              <h2 className="font-bold">{p.name}</h2>
              <div className="flex justify-start items-center gap-3">
                <div className="text-md font-semibold">${p.price}</div>
                {p.rating > 0 && (
                  <div className="flex justify-center items-center">
                    <Rating ratings={p.rating} />
                    <span className="text-[#34548d] text-sm">(23)</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FeatureProducts
