import React, { useState } from 'react'
import Header from '../components/Header'
import Breadcrumbs from '../components/Breadcrumbs'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import {
  FaEye,
  FaFacebookF,
  FaFacebookMessenger,
  FaGithub,
  FaHeart,
  FaHome,
  FaLinkedin,
  FaRegHeart,
  FaShoppingCart,
  FaTwitter
} from 'react-icons/fa'
import { IoIosArrowForward } from 'react-icons/io'
import config from '../utils/config'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import Rating from '../components/Rating'
import { BsFillCartCheckFill, BsShop } from 'react-icons/bs'
import Reviews from '../components/Reviews'
// import Swiper core and required modules
import { Pagination } from 'swiper/modules'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/react'
import { RiShoppingCartLine } from 'react-icons/ri'
const Details = () => {
  const [image, setImage] = useState('')
  const images = [1, 2, 3, 4, 5, 6]
  const discount = 5
  const stock = 5
  const [state, setState] = useState('reviews')

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5
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
    <div className="w-full">
      <Header />
      {/*Section  Breadcrumbs */}
      <Breadcrumbs title="Product Details" showHome={false} />
      {/* End Breadcrumbs */}
      <section className="bg-slate-100">
        <div className="w-[90%] mx-auto py-16">
          <div className="flex justify-start items-center text-md text-slate-600 w-full hover:text-[#34548d] gap-2 px-1">
            <Link to="/" className="inline-flex items-center gap-2 ">
              <FaHome size={20} />
              <span>Home</span>
            </Link>
            <IoIosArrowForward className="pt-1" />
            <div className="inline-flex items-center gap-2">
              <span>Category Name</span>
            </div>

            <IoIosArrowForward className="pt-1" />
            <div className="inline-flex items-center gap-2">
              <div className="xs:hidden">
                <img
                  src={`${config.BASE_URL}/images/products/8.webp`}
                  alt=""
                  className="w-[18px] h-[18px] rounded-lg "
                />
              </div>
              <span>Product Name</span>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white">
        <div className="w-[90%] mx-auto py-12">
          <div className="grid grid-cols-2 md-lg:grid-cols-1 gap-8">
            <div className="">
              <div className="p-5 border rounded-md m-1">
                <img
                  src={
                    image
                      ? `${config.BASE_URL}/images/products/${image}.webp`
                      : `${config.BASE_URL}/images/products/${images[2]}.webp`
                  }
                  alt=""
                  className="w-full h-[400px] rounded-md"
                />
              </div>
              <div className="py-3">
                {images && (
                  <div>
                    <Carousel
                      autoPlay={true}
                      infinite={true}
                      arrows={true}
                      responsive={responsive}
                      transitionDuration={500}
                    >
                      {images.map((img, i) => (
                        <div
                          key={i}
                          onClick={() => setImage(img)}
                          className="w-full h-full relative flex justify-center items-center transition-all duration-500 rounded-md cursor-pointer px-1"
                        >
                          <img
                            src={`${config.BASE_URL}/images/products/${img}.webp`}
                            alt=""
                            className="w-auto h-[120px] rounded-md object-cover hover:scale-95"
                          />
                        </div>
                      ))}
                    </Carousel>
                  </div>
                )}
              </div>
            </div>
            {/* end show images product */}
            <div className="flex flex-col gap-5">
              <div className="text-3xl text-slate-600 font-bold">
                <h3>Product Name ASDCFGG</h3>
              </div>
              <div className="flex justify-start items-center gap-4">
                <div className="flex text-xl">
                  <Rating ratings={4.5} />
                </div>
                <span className="text-[#34548d]">(24 reviews)</span>
              </div>
              {/* Price */}
              <div className=" text-slate-600 font-bold flex items-center gap-3">
                {discount !== 0 ? (
                  <>
                    <h2 className="text-orange-500 text-3xl">
                      ${500 - Math.floor((500 * discount) / 100)}
                    </h2>
                    <h3 className="text-slate-600 line-through text-2xl">$500</h3>
                    <span className="h-5 flex justify-start items-center text-red-500 rounded-md text-sm bg-red-100 p-1 ">
                      {discount} %
                    </span>
                  </>
                ) : (
                  <>
                    <h2 className="text-orange-500 text-3xl">$400</h2>
                  </>
                )}
              </div>
              {/* Description */}
              <div className=" text-slate-600 ">
                <p>
                  Product is a long established fact that a reader will be distracted by the
                  readable content of a page when looking at its layout. The point of using Lorem
                  Ipsum is that it has a more-or-less normal distribution of letters, as opposed to
                  using 'Content here.
                </p>
              </div>
              {/*  */}
              <div className="flex xs:flex-col gap-3 pb-10 border-b xs:w-full">
                {stock ? (
                  <>
                    <div className="flex bg-slate-200 h-[50px] justify-center items-center text-xl xs:w-full">
                      <div className="px-6 cursor-pointer"> -</div>
                      <div className="px-6 "> 2</div>
                      <div className="px-6 cursor-pointer"> -</div>
                    </div>
                    <div className="xs:w-full">
                      <button className="w-full flex justify-center items-center gap-2 px-8 py-3 h-[50px] cursor-pointer text-white font-semibold hover:shadow-md hover:shadow-[#34548d] bg-[#34548d]">
                        <FaShoppingCart /> <span>Add To Cart</span>
                      </button>
                    </div>
                  </>
                ) : (
                  ''
                )}
                <div
                  className="w-[50px] xs:w-full h-[50px] cursor-pointer border-2 border-[#34548d] text-[#34548d] bg-white flex justify-center items-center rounded-sm shadow-md transition-all 
                  hover:bg-[#34548d] hover:text-white "
                >
                  <FaHeart size={24} />
                </div>
              </div>
              {/* End show add to cart  */}
              <div className="flex justify-start items-center py-5 gap-5">
                <div className="w-[150px] text-slate-600 font-bold text-xl flex flex-col gap-5">
                  <span>Availability</span>
                  <span>Share On</span>
                </div>
                <div className="flex flex-col gap-5">
                  <span className={`text-${stock ? 'green-500' : 'red-500'}`}>
                    {stock ? `In Stock(${stock})` : 'Out Of Stock'}
                  </span>
                  <ul className="flex justify-start items-center gap-3 ">
                    <li>
                      <Link
                        to="#"
                        className="w-[38px] h-[38px] text-white  hover:bg-[#34548d] hover:text-white flex justify-center items-center bg-indigo-500 rounded-full"
                      >
                        <FaFacebookF />
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="#"
                        className="w-[38px] h-[38px] text-white hover:bg-[#34548d] hover:text-white flex justify-center items-center bg-cyan-500 rounded-full"
                      >
                        <FaTwitter />
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="#"
                        className="w-[38px] h-[38px] text-white hover:bg-[#34548d] hover:text-white flex justify-center items-center bg-blue-500 rounded-full border"
                      >
                        <FaLinkedin />
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="#"
                        className="w-[38px] h-[38px] text-white hover:bg-[#34548d] hover:text-white flex justify-center items-center bg-gray-500 rounded-full"
                      >
                        <FaGithub />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex gap-3">
                {stock ? (
                  <button className="flex justify-center items-center gap-2 px-8 py-3 h-[50px] cursor-pointer text-white font-semibold hover:shadow-md hover:shadow-[#34548d] bg-[#34548d]">
                    <BsFillCartCheckFill size={20} /> <span>Buy Now</span>
                  </button>
                ) : (
                  ''
                )}
                <Link
                  to="#"
                  className="flex justify-center items-center gap-2 px-8 py-3 h-[50px] cursor-pointer text-white font-semibold hover:shadow-md hover:shadow-[#34548d] bg-blue-500"
                >
                  <FaFacebookMessenger size={20} /> <span>Chat Seller</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white">
        <div className="w-[90%] h-full mx-auto pb-12">
          <div className="flex flex-wrap">
            <div className="w-[72%] md-lg:w-full">
              <div className="pr-4 md-lg:pr-0">
                <div className="grid grid-cols-2 font-semibold">
                  <button
                    onClick={() => setState('reviews')}
                    className={`py-2 px-5 rounded-sm ${
                      state === 'reviews'
                        ? 'bg-[#34548d] text-white'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    Reviews
                  </button>
                  <button
                    onClick={() => setState('description')}
                    className={`py-2 px-5 rounded-sm ${
                      state === 'description'
                        ? 'bg-[#34548d] text-white'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    Description
                  </button>
                </div>
                <div className="">
                  {state === 'reviews' ? (
                    <Reviews />
                  ) : (
                    <p className="py-5 text-slate-600">
                      Contrary to popular belief, Lorem Ipsum is not simply random text. It has
                      roots in a piece of classical Latin literature from 45 BC, making it over 2000
                      years old. Richard McClintock, a Latin professor at Hampden-Sydney College in
                      Virginia, looked up one of the more obscure Latin words, consectetur, from a
                      Lorem Ipsum passage, and going through the cites of the word in classical
                      literature, discovered the undoubtable source. Lorem Ipsum comes from sections
                      1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good
                      and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory
                      of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,
                      "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                    </p>
                  )}
                </div>
              </div>
            </div>
            {/*  */}
            <div className="w-[28%] md-lg:w-full">
              <div className="pl-4 md-lg:pl-0">
                <div className="px-3 py-1.5 text-slate-600 bg-slate-200 gap-1 flex justify-start items-center rounded-sm">
                  <BsShop />
                  <h2 className="text-xl font-bold">Thanh Shop</h2>
                </div>
                <div className="flex flex-col gap-5 mt-3 p-3">
                  {[1, 2, 3].map((p, j) => (
                    <Link
                      key={j}
                      to="#"
                      className="flex justify-start items-start transition-all duration-500 hover:scale-105 hover:shadow-lg relative"
                    >
                      {discount !== 0 && (
                        <div className="flex justify-center items-center absolute text-white w-6 h-6 rounded-full shadow-md bg-red-500 font-semibold text-xs left-1 top-1">
                          {discount}%
                        </div>
                      )}

                      <img
                        src={`${config.BASE_URL}/images/products/${p}.webp`}
                        alt=""
                        className="w-[110px] h-[110px] rounded-md"
                      />
                      <div className="px-3 flex justify-start items-start gap-1 flex-col text-slate-600">
                        <h2 className="font-bold">Product Name</h2>
                        <div className="flex flex-col justify-start items-start gap-3">
                          <div className="text-md font-semibold"> $3443</div>
                          <div className="flex justify-center items-center">
                            <Rating ratings={4.5} />
                            <span className="text-[#34548d] text-sm">(23)</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Review And description */}
      <section className="bg-white border-t">
        <div className="w-[90%] h-full mx-auto pb-12">
          <h2 className="text-2xl font-bold py-8 text-slate-600">Related Products</h2>
          <div className="">
            <Swiper
              slidesPerView="auto"
              breakpoints={{ 1280: { slidesPerView: 4 }, 565: { slidesPerView: 2 } }}
              spaceBetween={25}
              loop={true}
              pagination={{ clickable: true, el: '.custom_bullet' }}
              modules={[Pagination]}
              className="mySwiper"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((p, i) => (
                <SwiperSlide>
                  <div
                    key={i}
                    className=" group transition-all duration-500 border rounded-md shadow-md hover:shadow-md hover:-mt-3"
                  >
                    <div className="relative overflow-hidden ">
                      {discount !== 0 && (
                        <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full shadow-md bg-red-500 font-semibold text-xs left-2 top-2">
                          {discount}%
                        </div>
                      )}

                      <div className="flex w-full h-[210px] justify-center items-center">
                        <img
                          src={`${config.BASE_URL}/images/products/${p}.webp`}
                          alt=""
                          className="w-auto h-full"
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
                    <div className="py-3 px-4 text-slate-600 ">
                      <h2 className="font-bold">Product Name</h2>
                      <div className="flex justify-start items-center gap-3">
                        <div className="text-md font-semibold"> $3443</div>
                        <div className="flex ">
                          <Rating ratings={4.5} />
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="w-full flex justify-center items-center py-10">
            <div className="custom_bullet justify-center items-center gap-5 !w-auto"></div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Details
