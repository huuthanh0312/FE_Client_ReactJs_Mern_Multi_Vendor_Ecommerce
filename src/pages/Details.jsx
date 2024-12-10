import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Breadcrumbs from '../components/Breadcrumbs'
import Footer from '../components/Footer'
import { Link, useNavigate, useParams } from 'react-router-dom'
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
import { useDispatch, useSelector } from 'react-redux'
import { productDetails } from '../store/Reducers/homeReducer'
import { toast } from 'react-hot-toast'
import { addToCart, addToWishlist, messageClear } from '../store/Reducers/cartReducer'
const Details = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { product, moreProducts, relatedProducts } = useSelector((state) => state.home)
  const { userInfo } = useSelector((state) => state.auth)
  const { loader, errorMessage, successMessage } = useSelector((state) => state.cart)

  // use Effect check toast message error
  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage)
      dispatch(messageClear()) //message clear function reudx
    }
    if (successMessage) {
      toast.success(successMessage)
      dispatch(messageClear()) //message clear function reudx
    }
  }, [errorMessage, successMessage])

  const [image, setImage] = useState('')
  const { slug } = useParams()
  useEffect(() => {
    setImage('')
    dispatch(productDetails(slug))
  }, [slug])

  const [state, setState] = useState('reviews')
  const [quantity, setQuantity] = useState(1)

  // handle quantity increment and decrement
  const Increment = () => {
    if (quantity >= product.stock) {
      toast.error('Out of Stock')
    } else {
      setQuantity(quantity + 1)
    }
  }
  const Decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  // Add to cart
  const add_to_cart = (id) => {
    if (userInfo) {
      dispatch(addToCart({ userId: userInfo.id, quantity: quantity, productId: id }))
    } else {
      navigate('/login')
    }
  }

  // Add To Wishlist
  const handleAddToWishlist = (product) => {
    console.log(product)
    if (userInfo) {
      dispatch(
        addToWishlist({
          userId: userInfo.id,
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.images[0],
          discount: product.discount,
          rating: product.rating,
          slug: product.slug
        })
      )
    } else {
      navigate('/login')
    }
  }

  const handleBuyNow = () => {
    if (userInfo) {
      let price = 0
      if (product.discount > 0) {
        price = product.price - Math.floor((product.price * product.discount) / 100)
      } else {
        price = product.price
      }
      const obj = [
        {
          sellerId: product.sellerId,
          shopName: product.shopName,
          price: quantity * (price - Math.floor((price * 5) / 100)),
          products: [
            {
              quantity: quantity,
              productInfo: product
            }
          ]
        }
      ]

      // redirect
      navigate('/shipping', {
        state: {
          products: obj,
          price: price * quantity,
          shipping_fee: 10 * quantity,
          items: 1
        }
      })
    } else {
      navigate('/login')
    }
  }

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
      <Breadcrumbs title="Product Details" showHome={true} />
      {/* End Breadcrumbs */}
      <section className="bg-slate-100">
        <div className="w-[90%] mx-auto py-6">
          <div className="flex justify-start items-center text-md text-slate-600 w-full hover:text-[#34548d] gap-2 px-1">
            <Link to="/" className="inline-flex justify-center items-center gap-2 ">
              <FaHome size={20} />
              <span>Home</span>
            </Link>
            <IoIosArrowForward className="pt-1" />
            <div className="flex justify-center items-center gap-2">
              <span>{product.category}</span>
            </div>

            <IoIosArrowForward className="pt-1" />
            <div className="inline-flex justify-center items-center gap-2">
              <div className="xs:hidden">
                <img src={product.images?.[0]} alt="" className="w-[18px] h-[18px] rounded-lg " />
              </div>
              <span>{product.name}</span>
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
                  src={image ? image : product.images?.[0]}
                  alt=""
                  className="w-full h-[400px] rounded-md object-contain"
                />
              </div>
              <div className="py-3">
                {product.images && (
                  <div>
                    <Carousel
                      autoPlay={true}
                      infinite={true}
                      arrows={true}
                      responsive={responsive}
                      transitionDuration={500}
                    >
                      {product.images.map((img, i) => (
                        <div
                          key={i}
                          onClick={() => setImage(img)}
                          className="w-full h-full relative flex justify-center items-center transition-all duration-500 rounded-md cursor-pointer px-1"
                        >
                          <img
                            src={img}
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
                <h3>{product.name}</h3>
              </div>
              {product.rating > 0 && (
                <div className="flex justify-start items-center gap-4">
                  <div className="flex text-xl">
                    <Rating ratings={product.rating} />
                  </div>
                  <span className="text-[#34548d]">(24 reviews)</span>
                </div>
              )}

              {/* Price */}
              <div className=" text-slate-600 font-bold flex items-center gap-3">
                {product.discount > 0 ? (
                  <>
                    <h2 className="text-orange-500 text-3xl">
                      ${product.price - Math.floor((product.price * product.discount) / 100)}
                    </h2>
                    <h3 className="text-slate-600 line-through text-2xl">${product.price}</h3>
                    <span className="h-5 flex justify-start items-center text-red-500 rounded-md text-sm bg-red-100 p-1 ">
                      {product.discount} %
                    </span>
                  </>
                ) : (
                  <>
                    <h2 className="text-orange-500 text-3xl">${product.price}</h2>
                  </>
                )}
              </div>
              {/* Description */}
              <div className=" text-slate-600 ">
                <p>{product?.description ? product.description.substring(0, 250) + '...' : ''}</p>
              </div>
              {/*  */}
              <div className="flex xs:flex-col gap-3 pb-10 border-b xs:w-full">
                {product.stock ? (
                  <>
                    <div className="flex bg-slate-200 h-[50px] justify-center items-center text-xl xs:w-full">
                      <div
                        onClick={() => Decrement()}
                        className="px-6 cursor-pointer border-r-2 border-gray-600"
                      >
                        {' '}
                        -{' '}
                      </div>
                      <div className="px-6 ">{quantity}</div>
                      <div
                        onClick={() => Increment()}
                        className="px-6 cursor-pointer border-l-2 border-gray-600"
                      >
                        {' '}
                        +
                      </div>
                    </div>
                    <div className="xs:w-full">
                      <button
                        onClick={() => add_to_cart(product._id)}
                        className="w-full flex justify-center items-center gap-2 px-8 py-3 h-[50px] cursor-pointer text-white font-semibold hover:shadow-md hover:shadow-[#34548d] bg-[#34548d]"
                      >
                        <FaShoppingCart /> <span>Add To Cart</span>
                      </button>
                    </div>
                  </>
                ) : (
                  ''
                )}
                <div
                  onClick={() => handleAddToWishlist(product)}
                  className="w-[50px] xs:w-full h-[50px] cursor-pointer border-2 border-[#34548d] text-[#34548d] bg-white flex justify-center items-center rounded-sm shadow-md transition-all 
                  hover:bg-[#34548d] hover:text-white hover:rotate-[360deg] transform ease-in-out duration-200"
                >
                  <FaHeart size={24} />
                </div>
              </div>
              {/* End show add to cart  */}
              <div className="flex justify-start items-center py-5 gap-5">
                <div className="w-[150px] text-slate-600 font-bold text-xl flex flex-col justify-start items-start  gap-5">
                  <span>Availability</span>
                  <span>Share On</span>
                </div>
                <div className="flex flex-col justify-start items-start gap-5">
                  <div className="pt-3">
                    <span className={`text-${product.stock ? 'green-500' : 'red-500'}`}>
                      {product.stock ? `In Stock(${product.stock})` : 'Out Of Stock'}
                    </span>
                  </div>
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
                {product.stock ? (
                  <button
                    onClick={handleBuyNow}
                    className="flex justify-center items-center gap-2 px-8 py-3 h-[50px] cursor-pointer text-white font-semibold hover:shadow-md hover:shadow-[#34548d] bg-[#34548d]"
                  >
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
                    <p className="py-5 text-slate-600">{product.description}</p>
                  )}
                </div>
              </div>
            </div>
            {/*  */}
            <div className="w-[28%] md-lg:w-full">
              <div className="pl-4 md-lg:pl-0">
                <div className="px-3 py-1.5 text-slate-600 bg-slate-200 gap-1 flex justify-start items-center rounded-sm">
                  <BsShop />
                  <h2 className="text-xl font-bold">{product.shopName}</h2>
                </div>
                <div className="flex flex-col gap-2 mt-3 py-3">
                  {moreProducts.map((p, j) => (
                    <Link
                      key={j}
                      to="#"
                      className="flex justify-start items-start transition-all duration-500 hover:scale-105 hover:shadow-lg relative p-2 shadow rounded-md"
                    >
                      {p.discount !== 0 && (
                        <div className="flex justify-center items-center absolute text-white w-6 h-6 rounded-full shadow-md bg-red-500 font-semibold text-xs left-1 top-1">
                          {p.discount}%
                        </div>
                      )}

                      <img
                        src={p.images[0]}
                        alt=""
                        className="min-w-20 h-20 object-contain rounded-md"
                      />
                      <div className="px-3 flex justify-start items-start gap-1 flex-col text-slate-600">
                        <Link to={`/product/details/${p.slug}`} className="text-lg font-bold">
                          {p?.name}
                        </Link>
                        <div className="flex flex-col justify-start items-start gap-3">
                          <div className="text-md font-bold">
                            <span className={`${p.discount > 0 ? 'line-through' : ''}`}>
                              ${p.price}
                            </span>{' '}
                            {p.discount > 0 && (
                              <span className="text-orange-500">
                                {' '}
                                ${p.price - Math.floor((p.price * p.discount) / 100)}
                              </span>
                            )}
                          </div>
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
              {relatedProducts.map((p, i) => (
                <SwiperSlide>
                  <div
                    key={i}
                    className="group transition-all duration-500 border rounded-md shadow-md hover:shadow-lg hover:shadow-indigo-200"
                  >
                    <div className="relative overflow-hidden ">
                      {p.discount > 0 && (
                        <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full shadow-md bg-red-500 font-semibold text-xs left-2 top-2">
                          {p.discount}%
                        </div>
                      )}

                      <div className="flex w-full h-[210px] justify-center items-center">
                        <img src={p.images[0]} alt="" className="w-auto h-full" />
                      </div>
                      <ul className="flex absolute transition-all duration-700 -bottom-10 justify-center items-center gap-2 w-full group-hover:bottom-5">
                        <Link
                          to={`/product/details/${p.slug}`}
                          className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full shadow-md transition-all 
                          hover:bg-[#34548d] hover:text-white hover:rotate-[720deg]"
                        >
                          <FaEye />
                        </Link>
                        <li
                          onClick={() => handleAddToWishlist(p)}
                          className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full shadow-md transition-all 
                            hover:bg-[#34548d] hover:text-white hover:rotate-[720deg]"
                        >
                          <FaRegHeart />
                        </li>
                        <li
                          onClick={() => add_to_cart(p._id)}
                          className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full shadow-md transition-all 
                              hover:bg-[#34548d] hover:text-white hover:rotate-[720deg]"
                        >
                          <RiShoppingCartLine />
                        </li>
                      </ul>
                      {/*  */}
                    </div>
                    <div className="py-3 px-4 text-slate-600 ">
                      <div className="min-h-14">
                        <Link to={`/product/details/${p.slug}`} className="text-lg font-bold">
                          {p?.name}
                        </Link>
                      </div>

                      <div className="flex justify-start items-center gap-3">
                        <div className="text-md font-bold">
                          <span className={`${p.discount > 0 ? 'line-through' : ''}`}>
                            ${p.price}
                          </span>{' '}
                          {p.discount > 0 && (
                            <span className="text-orange-500">
                              {' '}
                              ${p.price - Math.floor((p.price * p.discount) / 100)}
                            </span>
                          )}
                        </div>
                        {p.rating > 0 && (
                          <div className="flex justify-center items-center">
                            <Rating ratings={p.rating} />
                            <span className="text-[#34548d] text-sm">(23)</span>
                          </div>
                        )}
                      </div>
                      <div className="text-md font-base">
                        <p>
                          {product?.description ? product.description.substring(0, 50) + '...' : ''}
                        </p>
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
