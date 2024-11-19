import React from 'react'
import { AiFillStar } from 'react-icons/ai'
import { CiStar } from 'react-icons/ci'

const RatingTemp = ({ rating }) => {
  if (rating === 5) {
    return (
      <>
        <div className="text-[#EDBB0E] flex justify-start items-start gap-1 text-xl cursor-pointer">
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
        </div>
        {/*  */}
      </>
    )
  } else if (rating === 4) {
    return (
      <>
        <div className="text-[#EDBB0E] flex justify-start items-start gap-1 text-xl cursor-pointer">
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
        </div>
        {/*  */}
      </>
    )
  } else if (rating === 3) {
    return (
      <>
        <div className="text-[#EDBB0E] flex justify-start items-start gap-1 text-xl cursor-pointer">
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
        </div>
        {/*  */}
      </>
    )
  } else if (rating === 2) {
    return (
      <>
        <div className="text-[#EDBB0E] flex justify-start items-start gap-1 text-xl cursor-pointer">
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
        </div>
        {/*  */}
      </>
    )
  } else if (rating === 1) {
    return (
      <>
        <div className="text-[#EDBB0E] flex justify-start items-start gap-1 text-xl cursor-pointer">
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
        </div>
        {/*  */}
      </>
    )
  }
}

export default RatingTemp
