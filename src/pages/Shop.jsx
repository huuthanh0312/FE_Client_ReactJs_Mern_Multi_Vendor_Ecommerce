import React, { useState } from 'react'
import Header from './../components/Header'
import Footer from './../components/Footer'
import { Link } from 'react-router-dom'
import { FaHome, FaList, FaThList } from 'react-icons/fa'
import { Range } from 'react-range'
import { CiStar } from 'react-icons/ci'
import { AiFillStar } from 'react-icons/ai'
import Products from '../components/products/Products'
import { BsFillGridFill } from 'react-icons/bs'
import ShopProducts from '../components/products/ShopProducts'
import Pagination from '../components/Pagination'
import { FaFilter } from 'react-icons/fa6'
import Breadcrumbs from '../components/Breadcrumbs'

const Shop = () => {
  const [filter, setFilter] = useState(true)

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

  const [state, setState] = useState({ values: [50, 1500] })
  const [rating, setRating] = useState('')
  const [styles, setStyles] = useState('grid')
  //pagination
  const [pageNumber, setPageNumber] = useState(1)
  const [parPage, setParPage] = useState(5)

  return (
    <div className="w-full">
      <Header />
      {/*Section  Breadcrumbs */}
      <Breadcrumbs title="Shop" showHome={true} />
      {/*  */}
      <section className="py-16">
        <div className="w-[90%] h-full mx-auto">
          <div className={`md:block hidden ${!filter ? 'mb-6' : 'mb-0'}`}>
            <button
              onClick={() => setFilter(!filter)}
              className="inline-flex justify-center gap-2 items-center text-center w-full py-2 px-3 bg-[#34548d] text-white"
            >
              <FaFilter size={18} /> Filter Product
            </button>
          </div>
          <div className="w-full flex flex-wrap">
            <div
              className={`w-3/12 md-lg:w-4/12 md:w-full pr-8 ${
                filter ? 'md:h-0 md:overflow-hidden xs:mb-6' : 'md:h-auto md:overflow-auto md:mb-0'
              }`}
            >
              <h2 className="text-3xl font-bold mb-3 text-slate-600">Category</h2>
              <div className="py-2">
                {categories.map((c, i) => (
                  <div className="flex justify-start items-center gap-2 py-1 ">
                    <input type="checkbox" id={c} aria-label={c} />
                    <label
                      className="text-slate-600 font-semibold block cursor-pointer hover:text-[#34548d]"
                      htmlFor={c}
                    >
                      {c}
                    </label>
                  </div>
                ))}
              </div>
              {/*end category */}
              <div className="py-2 flex flex-col gap-5">
                <h2 className="text-3xl font-bold mb-3 text-slate-600">Price</h2>
                <div className="px-2">
                  <Range
                    step={5}
                    min={50}
                    max={1500}
                    values={state.values}
                    onChange={(values) => setState({ values })}
                    renderTrack={({ props, children }) => (
                      <div
                        {...props}
                        className="w-full h-[6px] bg-slate-200 rounded-full cursor-pointer"
                      >
                        {children}
                      </div>
                    )}
                    renderThumb={({ props }) => (
                      <div {...props} className="w-[15px] h-[15px] bg-[#34548d] rounded-full"></div>
                    )}
                  />
                </div>
                <span className="text-slate-600 font-bold">
                  ${Math.floor(state.values[0])} - ${Math.floor(state.values[1])}
                </span>
              </div>
              {/* End Price  */}
              <div className="py-3 flex flex-col gap-4">
                <h2 className="text-3xl font-bold mb-3 text-slate-600">Rating</h2>
                <div className="flex flex-col gap-3">
                  {/*  */}
                  <div
                    onClick={() => setRating(5)}
                    className="text-[#EDBB0E] flex justify-start items-start gap-2 text-xl cursor-pointer"
                  >
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span className="text-sm text-orange-500">(12)</span>
                  </div>
                  {/*  */}
                  <div
                    onClick={() => setRating(4)}
                    className="text-[#EDBB0E] flex justify-start items-start gap-2 text-xl cursor-pointer"
                  >
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                    <span className="text-sm text-orange-500">(12)</span>
                  </div>
                  {/*  */}
                  <div
                    onClick={() => setRating(3)}
                    className="text-[#EDBB0E] flex justify-start items-start gap-2 text-xl cursor-pointer"
                  >
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                    <span className="text-sm text-orange-500">(12)</span>
                  </div>
                  {/*  */}
                  <div
                    onClick={() => setRating(2)}
                    className="text-[#EDBB0E] flex justify-start items-start gap-2 text-xl cursor-pointer"
                  >
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                    <span className="text-sm text-orange-500">(12)</span>
                  </div>
                  {/*  */}
                  <div
                    onClick={() => setRating(1)}
                    className="text-[#EDBB0E] flex justify-start items-start gap-2 text-xl cursor-pointer"
                  >
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                    <span className="text-sm text-orange-500">(12)</span>
                  </div>
                  {/*  */}
                </div>
              </div>
              {/* end Rating */}
              <div className="py-5 flex flex-col gap-4 md:hidden">
                <Products title="Latest Product" />
              </div>
            </div>
            {/* end w-3/12 */}
            <div className="w-9/12 md-lg:w-8/12 md:w-full">
              <div className="pl-8 md:pl-0">
                <div className="py-4 bg-white mb-10 px-3 rounded-md flex justify-between items-start border">
                  <h2 className="text-lg font-medium text-slate-600"> 50 Products</h2>
                  <div className="flex justify-center items-center gap-3 ">
                    <select
                      name=""
                      id=""
                      className="p-1 border outline-0 text-slate-600 dont-semibold"
                    >
                      <option value="">Sort By</option>
                      <option value="low-to-high">Low to Hight Price</option>
                      <option value="high-to-low">High to Low Price</option>
                    </select>
                    <div className="flex justify-center items-start gap-3 md-lg:hidden">
                      <div
                        className={`p-2 ${
                          styles === 'grid' && 'bg-slate-300'
                        } text-slate-600 hover:bg-slate-300 cursor-pointer rounded-sm`}
                        onClick={() => setStyles('grid')}
                      >
                        <BsFillGridFill size={18} />
                      </div>
                      <div
                        className={`p-2 ${
                          styles === 'list' && 'bg-slate-300'
                        } text-slate-600 hover:bg-slate-300 cursor-pointer rounded-sm`}
                        onClick={() => setStyles('list')}
                      >
                        <FaList size={18} />
                      </div>
                    </div>
                  </div>
                </div>
                {/*end grid */}
                <div className="pb-8">
                  <ShopProducts styles={styles} />
                </div>
                {/* Pagination */}
                <div className="flex md-lg:justify-center items-center">
                  <Pagination
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                    totalItem={12}
                    parPage={parPage}
                    showItem={Math.floor(12 / 3)}
                  />
                </div>
              </div>
            </div>
            {/* end w-9/12 */}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Shop
