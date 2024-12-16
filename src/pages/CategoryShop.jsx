import React, { useEffect, useState } from 'react'
import Header from './../components/Header'
import Footer from './../components/Footer'
import { Link, useSearchParams } from 'react-router-dom'
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
import { useDispatch, useSelector } from 'react-redux'
import {
  getCategories,
  getProducts,
  priceRangeProduct,
  queryProducts
} from '../store/Reducers/homeReducer'

const CategoryShop = () => {
  let [searchParams, setSearchParams] = useSearchParams()
  const category = searchParams.get('category')

  const dispatch = useDispatch()
  const { categories, products, latestProducts, priceRange, totalProduct, parPage } = useSelector(
    (state) => state.home
  )

  useEffect(() => {
    setState({ values: [priceRange.low, priceRange.high] })
  }, [priceRange])

  const [filter, setFilter] = useState(true)
  const [styles, setStyles] = useState('grid')
  //pagination
  const [pageNumber, setPageNumber] = useState(1)

  //filter product
  const [state, setState] = useState({ values: [priceRange.low, priceRange.high] })
  const [rating, setRating] = useState('')
  const [sortPrice, setSortPrice] = useState('')

  useEffect(() => {
    dispatch(priceRangeProduct())
  }, [])

  useEffect(() => {
    dispatch(
      queryProducts({
        low: state.values[0] || '',
        high: state.values[1] || '',
        category,
        rating,
        sortPrice,
        pageNumber
      })
    )
  }, [state.values[0], state.values[1], category, rating, sortPrice, pageNumber])

  return (
    <div className="w-full">
      <Header />
      {/*Section  Breadcrumbs */}
      <Breadcrumbs title="Category Shop" showHome={true} />
      {/*  */}
      <section className="py-16 bg-[#eeeeee]">
        <div className="container h-full mx-auto ">
          <div className={`md:block hidden ${!filter ? 'mb-6' : 'mb-0'}`}>
            <button
              onClick={() => setFilter(!filter)}
              className="inline-flex justify-center gap-2 items-center text-center w-full py-2 px-3 bg-[#34548d] text-white"
            >
              <FaFilter size={18} /> Filter Product
            </button>
          </div>
          <div className="w-full flex flex-wrap ">
            <div
              className={`w-3/12 bg-white rounded-md shadow-lg md-lg:w-4/12 md:w-full ${
                filter
                  ? 'md:h-0 md:overflow-hidden md-lg:mb-6'
                  : 'md:h-auto md:overflow-auto md-lg:mb-6'
              }`}
            >
              <div className="p-5">
                {/*<h2 className="text-3xl font-bold mb-3 text-slate-600">Category</h2>
                 <div className="py-2">
                  {categories.map((c, i) => (
                    <div key={i} className="flex justify-start items-center gap-2 py-1 ">
                      <input
                        checked={category === c.name ? true : false}
                        onChange={(e) => queryCategory(e, c.name)}
                        name={c.name}
                        type="checkbox"
                        id={c.name}
                        aria-label={c.name}
                      />
                      <label
                        className="text-slate-600 font-semibold block cursor-pointer hover:text-[#34548d]"
                        htmlFor={c.name}
                      >
                        {c.name}
                      </label>
                    </div>
                  ))}
                </div> */}
                {/*end category */}
                <div className="py-2 flex flex-col gap-5">
                  <h2 className="text-3xl font-bold mb-3 text-slate-600">Price</h2>
                  <div className="px-2">
                    <Range
                      step={5}
                      min={priceRange.low}
                      max={priceRange.high}
                      values={state.values}
                      onChange={(values) => setState({ values })}
                      renderTrack={({ props, children }) => {
                        const { key, ...restProps } = props
                        return (
                          <div
                            {...restProps}
                            key={key}
                            className="w-full h-[6px] bg-slate-200 rounded-full cursor-pointer"
                          >
                            {children}
                          </div>
                        )
                      }}
                      renderThumb={({ props }) => {
                        const { key, ...restProps } = props
                        return (
                          <div
                            {...restProps}
                            key={key}
                            className="w-[15px] h-[15px] bg-[#34548d] rounded-full"
                          ></div>
                        )
                      }}
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
                      onClick={() => setRating(rating === 5 ? '' : 5)}
                      className={`text-[#EDBB0E] flex justify-start items-start gap-2 text-xl cursor-pointer ${
                        rating === 5 ? 'bg-[#f1f0f0] rounded-md px-1 py-1 text-[#ffd027]' : ''
                      } `}
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
                      onClick={() => setRating(rating === 4 ? '' : 4)}
                      className={`text-[#EDBB0E] flex justify-start items-start gap-2 text-xl cursor-pointer ${
                        rating === 4 ? 'bg-[#f1f0f0] rounded-md px-1 py-1 text-[#ffd027]' : ''
                      } `}
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
                      onClick={() => setRating(rating === 3 ? '' : 3)}
                      className={`text-[#EDBB0E] flex justify-start items-start gap-2 text-xl cursor-pointer ${
                        rating === 3 ? 'bg-[#f1f0f0] rounded-md px-1 py-1 text-[#ffd027]' : ''
                      } `}
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
                      onClick={() => setRating(rating === 2 ? '' : 2)}
                      className={`text-[#EDBB0E] flex justify-start items-start gap-2 text-xl cursor-pointer ${
                        rating === 2 ? 'bg-[#f1f0f0] rounded-md px-1 py-1 text-[#ffd027]' : ''
                      } `}
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
                      onClick={() => setRating(rating === 1 ? '' : 1)}
                      className={`text-[#EDBB0E] flex justify-start items-start gap-2 text-xl cursor-pointer ${
                        rating === 1 ? 'bg-[#f1f0f0] rounded-md px-1 py-1 text-[#ffd027]' : ''
                      } `}
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
                  <Products title="Latest Product" products={latestProducts} />
                </div>
              </div>
            </div>
            {/* end w-3/12 */}
            <div className="w-9/12 md-lg:w-8/12 md:w-full ">
              <div className="pl-8 md:pl-0">
                <div className="py-4 bg-white mb-8 px-3 rounded-md flex justify-between items-start border">
                  <h2 className="text-lg font-medium text-slate-600">
                    <span className="text-orange-500">{totalProduct}</span> Products
                  </h2>
                  <div className="flex justify-center items-center gap-3 ">
                    <select
                      onChange={(e) => setSortPrice(e.target.value)}
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
                  <ShopProducts styles={styles} products={products} />
                </div>
                {/* Pagination */}
                <div className="flex md-lg:justify-center items-center">
                  {totalProduct > parPage && (
                    <Pagination
                      pageNumber={pageNumber}
                      setPageNumber={setPageNumber}
                      totalItem={totalProduct}
                      parPage={parPage}
                      showItem={Math.floor(totalProduct / parPage)}
                    />
                  )}
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

export default CategoryShop
