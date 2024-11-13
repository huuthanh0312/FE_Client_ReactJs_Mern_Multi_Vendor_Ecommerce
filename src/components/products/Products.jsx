import React from 'react'
import config from '../../utils/config'
import Carousel from 'react-multi-carousel'
import { Link } from 'react-router-dom'
import 'react-multi-carousel/lib/styles.css'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

const Products = ({ title }) => {
  const products = [
    [1, 2, 3],
    [4, 5, 6]
  ]

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
        <div className="text-xl font-bold ">{title}</div>
        <div className="flex justify-center items-center gap-3">
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
          <div key={i} className="flex flex-col justify-start gap-2">
            {productRow.map((p, j) => (
              <Link key={j} to="#" className="flex justify-start items-start">
                <img
                  src={`${config.BASE_URL}/images/products/${p}.webp`}
                  alt=""
                  className="w-[110px] h-[110px]"
                />
                <div className="px-3 flex justify-start items-start gap-1 flex-col text-slate-600">
                  <h2 className="font-bold">Product Name</h2>
                  <div className="flex justify-start items-center gap-3">
                    <div className="text-md font-semibold"> $3443</div>
                    {/* <div className="flex ">
                      <Rating ratings={4.5} />
                    </div> */}
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
