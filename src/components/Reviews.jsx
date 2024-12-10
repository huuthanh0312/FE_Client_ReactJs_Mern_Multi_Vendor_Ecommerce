import React, { useEffect, useState } from 'react'
import Rating from './Rating'
import RatingTemp from './products/RatingTemp'
import Pagination from './Pagination'
import { IoMdLogIn } from 'react-icons/io'
import { Link } from 'react-router-dom'
import RatingReact from 'react-rating'
import { CiStar } from 'react-icons/ci'
import { AiFillStar } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import {
  customerReview,
  getReviews,
  messageClear,
  productDetails
} from '../store/Reducers/homeReducer'
import toast from 'react-hot-toast'

const Reviews = ({ product }) => {
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.auth)
  const { errorMessage, successMessage, reviews, ratingReview, totalReview } = useSelector(
    (state) => state.home
  )
  //pagination
  const [pageNumber, setPageNumber] = useState(1)
  const [parPage, setParPage] = useState(10)

  //review
  const [rating, setRating] = useState('')
  const [review, setReview] = useState('')
  const [rating_review, setRatingReview] = useState([])

  const reviewSubmit = (e) => {
    e.preventDefault()
    const obj = {
      name: userInfo.name,
      review: review,
      rating: rating,
      productId: product._id
    }
    dispatch(customerReview(obj))
  }
  useEffect(() => {
    if (product._id) {
      dispatch(getReviews({ productId: product._id, pageNumber: pageNumber }))
    }
  }, [pageNumber, product])
  // use Effect check toast message error
  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage)
      dispatch(messageClear()) //message clear function reudx
    }
    if (successMessage) {
      toast.success(successMessage)
      setRating('')
      setReview('')
      dispatch(productDetails(product.slug))
      dispatch(messageClear()) //message clear function reudx
    }
  }, [errorMessage, successMessage])

  return (
    <div>
      <div className="mt-8">
        <div className="flex gap-8 xs:gap-0 md-lg:flex-col px-4 xs:p-2">
          <div className="flex flex-col gap-2 justify-center items-start py-4">
            <div className="">
              <span className="text-5xl font-semibold">{product.rating}</span>
              <span className="text-3xl font-semibold text-slate-600">/5</span>
            </div>
            <div className="flex text-3xl gap-1">
              <Rating ratings={product.rating} />
            </div>
            <p className="text-sm text-slate-600">{totalReview} Reviews</p>
          </div>
          {/*  */}
          <div className="flex gap-2 flex-col py-4">
            <div className="flex justify-start items-center gap-5 xs:gap-2">
              <div className="text-md flex">
                <RatingTemp rating={5} />
              </div>
              <div className="w-[200px] h-[15px] bg-slate-300 relative">
                <div
                  className="h-full bg-[#EDBB0E]"
                  style={{
                    width: `${
                      ratingReview[0]?.sum > 0
                        ? Math.floor((100 * (ratingReview[0]?.sum || 0)) / totalReview)
                        : 0
                    }%`
                  }}
                ></div>
              </div>
              <p className="text-sm text-orange-500 w-[10%]">{ratingReview[0]?.sum}</p>
            </div>
            {/*  */}
            <div className="flex justify-start items-center gap-5 xs:gap-2">
              <div className="text-md flex">
                <RatingTemp rating={4} />
              </div>
              <div className="w-[200px] h-[15px] bg-slate-300 relative">
                <div
                  className="h-full bg-[#EDBB0E]"
                  style={{
                    width: `${
                      ratingReview[1]?.sum > 0
                        ? Math.floor((100 * (ratingReview[1]?.sum || 0)) / totalReview)
                        : 0
                    }%`
                  }}
                ></div>
              </div>
              <p className="text-sm text-orange-500 w-[10%]">{ratingReview[1]?.sum}</p>
            </div>
            {/*  */}
            <div className="flex justify-start items-center gap-5 xs:gap-2">
              <div className="text-md flex">
                <RatingTemp rating={3} />
              </div>
              <div className="w-[200px] h-[15px] bg-slate-300 relative">
                <div
                  className="h-full bg-[#EDBB0E]"
                  style={{
                    width: `${
                      ratingReview[2]?.sum > 0
                        ? Math.floor((100 * (ratingReview[2]?.sum || 0)) / totalReview)
                        : 0
                    }%`
                  }}
                ></div>
              </div>
              <p className="text-sm text-orange-500 w-[10%]">{ratingReview[2]?.sum}</p>
            </div>
            {/*  */}
            <div className="flex justify-start items-center gap-5 xs:gap-2">
              <div className="text-md flex">
                <RatingTemp rating={2} />
              </div>
              <div className="w-[200px] h-[15px] bg-slate-300 relative">
                <div
                  className="h-full bg-[#EDBB0E]"
                  style={{
                    width: `${
                      ratingReview[3]?.sum > 0
                        ? Math.floor((100 * (ratingReview[3]?.sum || 0)) / totalReview)
                        : 0
                    }%`
                  }}
                ></div>
              </div>
              <p className="text-sm text-orange-500 w-[10%]">{ratingReview[3]?.sum}</p>
            </div>
            {/*  */}
            <div className="flex justify-start items-center gap-5 xs:gap-2">
              <div className="text-md flex">
                <RatingTemp rating={1} />
              </div>
              <div className="w-[200px] h-[15px] bg-slate-300 relative">
                <div
                  className="h-full bg-[#EDBB0E]"
                  style={{
                    width: `${
                      ratingReview[4]?.sum > 0
                        ? Math.floor((100 * (ratingReview[4]?.sum || 0)) / totalReview)
                        : 0
                    }%`
                  }}
                ></div>
              </div>
              <p className="text-sm text-orange-500 w-[10%]">{ratingReview[4]?.sum}</p>
            </div>
            {/*  */}
          </div>
        </div>
        {/*  */}
        <div className="bg-[#eeeeee] rounded-md px-4">
          <h2 className="text-xl font-bold text-slate-600 border-b py-4 ">
            Product Review <span className="text-orange-500">({totalReview})</span>
          </h2>
          {/*  */}
          <div className="flex flex-col gap-4 pb-8 pt-4">
            {reviews.map((r, i) => (
              <div key={i} className="gap-1 flex flex-col border rounded-md shadow p-4 bg-white ">
                <div className="flex justify-between items-center">
                  <div className="flex gap-1 text-xl">
                    <RatingTemp rating={r.rating} />
                  </div>
                  <span className="text-slate-600">{r.date}</span>
                </div>
                <span className="text-slate-600 text-md font-semibold">{r.name}</span>
                <p className="text-slate-600 text-sm">{r.review}</p>
              </div>
            ))}
            {/*  */}
            <div className="flex justify-end">
              {
                <Pagination
                  pageNumber={pageNumber}
                  setPageNumber={setPageNumber}
                  totalItem={totalReview}
                  parPage={parPage}
                  showItem={Math.floor(totalReview / 3)}
                />
              }
            </div>
          </div>
        </div>
        <div className="md:pb-4">
          {userInfo ? (
            <div className="flex flex-col py-4">
              <div className="flex flex-col gap-3">
                <h3 className="text-lg font-semibold text-slate-600 pb-2 border-b">
                  Leave a Comment
                </h3>
                <RatingReact
                  onChange={(e) => setRating(e)}
                  initialRating={rating}
                  emptySymbol={
                    <span className="text-slate-600 text-3xl">
                      <CiStar />
                    </span>
                  }
                  fullSymbol={
                    <span className="text-[#EDBB0E] text-3xl">
                      <AiFillStar />
                    </span>
                  }
                />
                <form onSubmit={reviewSubmit}>
                  <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    cols="30"
                    rows="5" // Chọn chiều cao của textarea
                    name="comment"
                    id="comment"
                    className="w-full outline-0 p-3 border border-gray-300 rounded focus:border-blue-500"
                    placeholder="Write your comment here..."
                  />
                  <button className="mt-2 px-5 py-2 bg-blue-500 text-white rounded">Submit</button>
                </form>
              </div>
            </div>
          ) : (
            <div>
              <Link
                to="/login"
                className="flex justify-center items-center gap-2 px-7 py-2 cursor-pointer text-white font-semibold hover:shadow-md bg-[#34548d]"
              >
                <IoMdLogIn size={20} />
                <span>Please Login To Comment </span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Reviews
