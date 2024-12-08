import React from 'react'
import config from '../../utils/config'
import Carousel from 'react-multi-carousel'
import { Link } from 'react-router-dom'
import 'react-multi-carousel/lib/styles.css'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import Rating from '../Rating'

const Products = ({ title, products }) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  }
  const ButtonGroup = ({ next, previous }) => {
    return (
      <div className="flex justify-between items-center text-slate-600">
        <div className="text-2xl font-bold ">{title}</div>
        <div className="flex justify-center items-center gap-3 lg:px-2">
          <button
            onClick={() => previous()}
            className="w-[30px] h-[30px] flex justify-center items-center bg-slate-300 border border-slate-200"
          >
            <IoIosArrowBack />
          </button>
          <button
            onClick={() => next()}
            className="w-[30px] h-[30px] flex justify-center items-center bg-slate-300 border border-slate-200"
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    )
  }
  // const ButtonGroup = () => {}
  return (
    <div className="flex gap-8 flex-col-reverse">
      <Carousel
        autoPlay={false}
        infinite={false}
        arrows={false}
        responsive={responsive}
        transitionDuration={500}
        renderButtonGroupOutside={true}
        customButtonGroup={<ButtonGroup />}
      >
        {products.map((productRow, i) => (
          <div key={i} className="flex flex-col justify-start gap-3">
            {productRow.map((p, j) => (
              <Link
                key={j}
                to="#"
                className="flex justify-start items-center px-1 transition-all duration-500 hover:scale-95 rounded-md shadow-lg relative"
              >
                {p.discount > 0 && (
                  <div className="flex justify-center items-center absolute text-white w-[24px] h-[24px] p-1 rounded-full shadow-md bg-red-500 font-semibold text-[10px] left-1 top-1">
                    {p.discount}%
                  </div>
                )}
                <div className="w-[80px] flex justify-start items-start ">
                  <img
                    src={p.images[0]}
                    alt=""
                    className="w-[80px] h-[80px] rounded-md object-contain"
                  />
                </div>
                <div className="w-full px-3 py-1 flex justify-start items-start gap-1 flex-col text-slate-600 ">
                  <h5 className="font-bold">{p.name}</h5>
                  <div className="flex flex-col justify-center items-start">
                    <div className="text-md font-semibold">${p.price}</div>
                    {p.rating > 0 && (
                      <div className="flex justify-center items-center">
                        <Rating ratings={p.rating} />
                        <span className="text-[#34548d] text-sm">(23)</span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default Products
