import React from 'react'
import Carousel from 'react-multi-carousel'
import { Link } from 'react-router-dom'
import config from '../utils/config'
import 'react-multi-carousel/lib/styles.css'
import { useSelector } from 'react-redux'

const Category = () => {
  const { categories } = useSelector((state) => state.home)
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 6
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4
    },
    mdtablet: {
      breakpoint: { max: 991, min: 464 },
      items: 4
    },
    smmobile: {
      breakpoint: { max: 640, min: 0 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2
    },
    xsmobile: {
      breakpoint: { max: 440, min: 0 },
      items: 2
    }
  }

  return (
    <div className="w-full mt-4 md-lg:mt-2">
      <div className="container mx-auto">
        <div className="w-full flex flex-wrap md-lg:gap-8">
          <div className="w-full ">
            <div className="text-center flex justify-center items-center flex-col text-4xl text-slate-600 font-bold relative pb-[45px] ">
              <h2>Top Category</h2>
              <div className="w-[180px] h-[2px] bg-[#34548d] mt-4"></div>
            </div>
            <div className="my-4">
              <Carousel
                autoPlay={true}
                infinite={true}
                arrows={true}
                showDots={true}
                responsive={responsive}
                transitionDuration={500}
              >
                {categories.map((c, i) => (
                  <Link
                    key={i}
                    to={`/products?category=${c.slug}`}
                    className="h-[185px] block border rounded-md shadow-lg mx-1"
                  >
                    <div className="w-full h-full hover:scale-105 transition-all duration-500 rounded-md">
                      <img
                        src={c.image}
                        alt=""
                        className="w-full h-full rounded-md object-contain"
                      />
                      <div className="absolute bottom-6 w-full mx-auto font-bold left-0 flex justify-center items-center">
                        <span className="py-[2px] px-6 bg-[#2220205d] text-white">{c.name}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Category
