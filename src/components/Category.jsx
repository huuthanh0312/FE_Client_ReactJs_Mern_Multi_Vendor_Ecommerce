import React from 'react'
import Carousel from 'react-multi-carousel'
import { Link } from 'react-router-dom'
import config from '../utils/config'
import 'react-multi-carousel/lib/styles.css'

const Category = () => {
  const categories = [
    'Laptops',
    'Mobiles',
    'Speaker',
    'Top wear',
    'Foot wear',
    'Watches',
    'Home Decor',
    'Smart Watches'
  ]
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
      items: 3
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
    <div className="w-full md-lg:mt-6">
      <div className="w-[90%] mx-auto">
        <div className="w-full flex flex-wrap md-lg:gap-8">
          <div className="w-full">
            <div className="my-8">
              <Carousel
                autoPlay={true}
                infinite={true}
                arrows={true}
                responsive={responsive}
                transitionDuration={500}
              >
                {categories.map((c, i) => (
                  <Link key={i} to="#" className="h-[185px] border block">
                    <div className="w-full h-full relative p-3">
                      <img src={`${config.BASE_URL}/images/products/${i + 1}.webp`} alt="" />
                      <div className="absolute bottom-6 w-full mx-auto font-bold left-0 flex justify-center items-center">
                        <span className="py-[2px] px-6 bg-[#3330305d] text-white shadow-lg">
                          {c}
                        </span>
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