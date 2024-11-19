import React, { useState } from 'react'
import Rating from './Rating'
import RatingTemp from './products/RatingTemp'
import Pagination from './Pagination'
import { IoMdLogIn } from 'react-icons/io'
import { Link } from 'react-router-dom'
import RatingReact from 'react-rating'
import { CiStar } from 'react-icons/ci'
import { AiFillStar } from 'react-icons/ai'

const Reviews = () => {
  const userInfo = true
  //pagination
  const [pageNumber, setPageNumber] = useState(1)
  const [parPage, setParPage] = useState(10)

  //review
  const [rating, setRating] = useState('')
  const [re, setRe] = useState('')
  return (
    <div>
      <div className="mt-8">
        <div className="flex gap-10 md-lg:flex-col">
          <div className="flex flex-col gap-2 justify-center items-start py-4">
            <div className="">
              <span className="text-5xl font-semibold">4.5</span>
              <span className="text-3xl font-semibold text-slate-600">/5</span>
            </div>
            <div className="flex text-3xl gap-1">
              <Rating ratings={4.5} />
            </div>
            <p className="text-sm text-slate-600">23 Reviews</p>
          </div>
          {/*  */}
          <div className="flex gap-2 flex-col py-4">
            <div className="flex justify-start items-center gap-5 xs:gap-2">
              <div className="text-md flex">
                <RatingTemp rating={5} />
              </div>
              <div className="w-[200px] h-[15px] bg-slate-300 relative">
                <div className="h-full bg-[#EDBB0E] w-[80%]"></div>
              </div>
              <p className="text-sm text-slate-600 w-[0%]">128</p>
            </div>
            {/*  */}
            <div className="flex justify-start items-center gap-5 xs:gap-2">
              <div className="text-md flex">
                <RatingTemp rating={4} />
              </div>
              <div className="w-[200px] h-[15px] bg-slate-300 relative">
                <div className="h-full bg-[#EDBB0E] w-[60%]"></div>
              </div>
              <p className="text-sm text-slate-600 w-[0%]">34</p>
            </div>
            {/*  */}
            <div className="flex justify-start items-center gap-5 xs:gap-2">
              <div className="text-md flex">
                <RatingTemp rating={3} />
              </div>
              <div className="w-[200px] h-[15px] bg-slate-300 relative">
                <div className="h-full bg-[#EDBB0E] w-[40%]"></div>
              </div>
              <p className="text-sm text-slate-600 w-[0%]">12</p>
            </div>
            {/*  */}
            <div className="flex justify-start items-center gap-5 xs:gap-2">
              <div className="text-md flex">
                <RatingTemp rating={2} />
              </div>
              <div className="w-[200px] h-[15px] bg-slate-300 relative">
                <div className="h-full bg-[#EDBB0E] w-[20%]"></div>
              </div>
              <p className="text-sm text-slate-600 w-[0%]">2</p>
            </div>
            {/*  */}
            <div className="flex justify-start items-center gap-5 xs:gap-2">
              <div className="text-md flex">
                <RatingTemp rating={1} />
              </div>
              <div className="w-[200px] h-[15px] bg-slate-300 relative">
                <div className="h-full bg-[#EDBB0E] w-[10%]"></div>
              </div>
              <p className="text-sm text-slate-600 w-[0%]">1</p>
            </div>
            {/*  */}
          </div>
        </div>
        {/*  */}
        <h2 className="text-xl font-bold text-slate-600">
          Product Review <span className="text-orange-500">10</span>
        </h2>
        {/*  */}
        <div className="flex flex-col gap-8 pb-10 pt-4">
          {[1, 2, 3, 4, 5].map((r, i) => (
            <div className="gap-1 flex flex-col">
              <div className="flex justify-between items-center">
                <div className="flex gap-1 text-xl">
                  <RatingTemp rating={5} />
                </div>
                <span className="text-slate-600">8 Jan 2024</span>
              </div>
              <span className="text-slate-600 text-md font-semibold">Thanh</span>
              <p className="text-slate-600 text-sm">
                There are many variations of passages of Lorem Ipsum available, but the majority
                have suffered alteration in some form, by injected humour
              </p>
            </div>
          ))}
          {/*  */}
          <div className="flex justify-end">
            {
              <Pagination
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
                totalItem={12}
                parPage={parPage}
                showItem={Math.floor(10 / 3)}
              />
            }
          </div>
        </div>
        <div className="md:pb-8">
          {userInfo ? (
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
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
                <form>
                  <textarea
                    cols="30"
                    name=""
                    id=""
                    className="w-full outline-0 p-3 border border-gray-300 rounded"
                    placeholder="Write your comment here..."
                  />
                  <button className="mt-2 px-5 py-2 bg-blue-500 text-white rounded">Submit</button>
                </form>
              </div>
            </div>
          ) : (
            <div>
              <Link className="flex justify-center items-center gap-2 px-7 py-2 cursor-pointer text-white font-semibold hover:shadow-md bg-[#34548d]">
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
