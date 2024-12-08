import React from 'react'
import config from '../../utils/config'
import { FaEye, FaRegHeart } from 'react-icons/fa'
import { RiShoppingCartLine } from 'react-icons/ri'
import Rating from '../Rating'
import { Link } from 'react-router-dom'

const ShopProducts = ({ styles, products }) => {
  return (
    <div
      className={`w-full grid gap-6 ${
        styles === 'grid'
          ? 'grid-cols-4 2xl:grid-cols-3 md-lg:grid-cols-2 md:grid-cols-2'
          : 'grid-cols-1 md-lg:grid-cols-2 md:grid-cols-2'
      }`}
    >
      {products.map((p, i) => (
        <div
          key={i}
          className={`flex w-full gap-4 bg-white pb-4 rounded-md shadow-lg ${
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
            {p.discount > 0 && (
              <div className="flex justify-center items-center absolute text-white w-[35px] h-[35px] rounded-full shadow-md bg-red-500 font-semibold text-xs left-2 top-2 z-10">
                {p.discount}%
              </div>
            )}
            <div className=" flex justify-center items-center">
              <img
                src={p.images[0]}
                alt=""
                className={`h-[240px] md:h-[270px] xs:h[170px] transition-all duration-700 hover:scale-105 ${
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
          <div className="px-5 flex justify-start items-start gap-1 flex-grow flex-col text-slate-600">
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
          {/* <div className="px-5 w-full">
            <div
              //onClick={() => add_to_cart(p._id)}
              className="py-2 px-6 xl:px-2 w-30 flex justify-center items-center gap-3 cursor-pointer rounded-full shadow-md transition-all 
                  bg-[#34548d] hover:bg-white text-white hover:text-[#34548d] border-2 hover:border-[#34548d] "
            >
              <RiShoppingCartLine /> <span className="font-bold">Add To Cart</span>
            </div>
          </div> */}
        </div>
      ))}
    </div>
  )
}

export default ShopProducts
