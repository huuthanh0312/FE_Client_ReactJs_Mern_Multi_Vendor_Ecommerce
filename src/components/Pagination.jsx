import React from 'react'
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md'

const Pagination = ({ pageNumber, setPageNumber, totalItem, parPage, showItem }) => {
  let totalPage = Math.ceil(totalItem / parPage)
  let startPage = pageNumber

  let dif = totalPage - pageNumber
  if (dif <= showItem) {
    startPage = totalPage - showItem
  }

  let endPage = startPage < 0 ? showItem : showItem + startPage

  if (startPage <= 0) {
    startPage = 1
  }

  const createButton = () => {
    const btns = []
    for (let i = startPage; i < endPage; i++) {
      btns.push(
        <li
          key={i}
          onClick={() => setPageNumber(i)}
          className={`${
            pageNumber === i
              ? 'bg-[#34548d] shadow-lg shadow-indigo-300/50 text-white'
              : 'bg-slate-400 hover:bg-[#34548d] hover:shadow-indigo-500/50 text-white '
          } 
           w-[33px] h-[33px] rounded-full flex justify-center items-center cursor-pointer`}
        >
          {i}
        </li>
      )
    }
    return btns
  }
  return (
    <ul className="flex gap-3">
      {pageNumber > 1 && (
        <li
          onClick={() => setPageNumber(pageNumber - 1)}
          className="w-[33px] h-[33px] rounded-full flex justify-center items-center bg-slate-300 text-[#383737] cursor-pointer hover:bg-[#34548d]"
        >
          <MdOutlineKeyboardArrowLeft />
        </li>
      )}
      {createButton()}
      {pageNumber < totalPage && (
        <li
          onClick={() => setPageNumber(pageNumber + 1)}
          className="w-[33px] h-[33px] rounded-full flex justify-center items-center bg-slate-300 text-[#383737] cursor-pointer hover:bg-[#34548d]"
        >
          <MdOutlineKeyboardArrowRight />
        </li>
      )}
    </ul>
  )
}

export default Pagination
