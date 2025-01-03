import React, { useEffect, useState } from 'react'
import { AiOutlineMessage, AiOutlinePlus } from 'react-icons/ai'
import { GrEmoji } from 'react-icons/gr'
import { IoSend } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import config from '../../utils/config'
import io from 'socket.io-client'
import {
  addCustomerFriend,
  customerSendMessage,
  messageClear,
  updateMessage
} from '../../store/Reducers/chatReducer'
import { PiSelectionAllBold } from 'react-icons/pi'
import { RiAttachment2 } from 'react-icons/ri'
import { toast } from 'react-hot-toast'
import { useRef } from 'react'

const socket = io(`${config.API_URL}`)
const Chat = () => {
  const dispatch = useDispatch()
  const { sellerId } = useParams()

  const { userInfo } = useSelector((state) => state.auth)
  const { myFriends, frMessages, currentFriend, loader, successMessage, errorMessage } =
    useSelector((state) => state.chat)

  //state mesage input
  const [message, setMessage] = useState('')
  //receiver message seller send to customer
  const [receiverMessage, setReceiverMessage] = useState('')
  // socket active Seller
  const [activeSeller, setActiveSeller] = useState([])

  // connection socket and seller send message to client
  useEffect(() => {
    socket.emit('add_user', userInfo.id, userInfo)
    socket.on('seller_message_push_customer', (msg) => {
      setReceiverMessage(msg)
    })
    socket.on('activeSeller', (sellers) => {
      //console.log(sellers)
      setActiveSeller(sellers)
    })
  }, [])

  useEffect(() => {
    dispatch(addCustomerFriend({ sellerId: sellerId || '', userId: userInfo.id }))
  }, [sellerId])

  // handleSenMessage
  const handleSendMessageSeller = (e) => {
    e.preventDefault()
    if (message) {
      dispatch(
        customerSendMessage({
          userId: userInfo.id,
          name: userInfo.name,
          sellerId: sellerId || '',
          message
        })
      )
      setMessage('')
    }
  }

  useEffect(() => {
    if (!receiverMessage) return // Nếu không có tin nhắn, thoát khỏi useEffect
    // Kiểm tra tin nhắn có đến từ seller hiện tại và gửi cho người dùng hiện tại không
    const isMessageFromCurrentSeller =
      sellerId === receiverMessage.senderId && userInfo.id === receiverMessage.receiverId

    if (isMessageFromCurrentSeller) {
      dispatch(updateMessage(receiverMessage)) // Cập nhật tin nhắn vào Redux
      toast.success(`${receiverMessage.senderName} sent a message`) // Hiển thị thông báo
      dispatch(messageClear()) // Xóa tin nhắn trong Redux
    }
  }, [receiverMessage, sellerId, dispatch])

  // check send success push client message
  useEffect(() => {
    if (successMessage) {
      socket.emit('customer_send_message_seller', frMessages[frMessages.length - 1])
      dispatch(messageClear()) //message clear function reudx
    }
    if (errorMessage) {
      toast.error(errorMessage)
      dispatch(messageClear()) //message clear function reudx
    }
  }, [successMessage, errorMessage])

  //Bottom Ref Scroll
  const messageEndRef = useRef(null) // Tạo ref cho container tin nhắn
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [frMessages])

  return (
    <div>
      <div className="bg-white px-5 py-2 rounded-md shadow">
        <div className="w-full flex">
          <div className="w-[230px] pr-2">
            <div className="flex justify-start gap-2 items-center font-semibold text-slate-600 text-lg h-[50px] border-b ">
              <span>
                <AiOutlineMessage size={20} />
              </span>
              <span>Messages</span>
            </div>
            <div className="w-full flex flex-col text-slate-600 py-2 h-[400px] overflow-y-auto">
              {myFriends.map((f, i) => (
                <Link
                  to={`/dashboard/chat/${f.friendId}`}
                  key={i}
                  className={`flex gap-2 justify-start items-center pl-2 py-[5px] rounded-md hover:shadow transition-all duration-300 ease-in-out cursor-pointer ${
                    f.friendId === currentFriend?.friendId ? 'bg-slate-200' : ''
                  }`}
                >
                  <div className="w-[30px] h-[30px] rounded-full border-2 border-blue-500 relative">
                    {activeSeller.some((c) => c.sellerId === f.friendId) && (
                      <div className="w-[10px] h-[10px] rounded-full bg-green-500 absolute right-0 -bottom-1"></div>
                    )}

                    <img
                      src={f.image ? f.image : `${config.BASE_URL}/images/no_user_images.png`}
                      alt=""
                      className="rounded-full"
                    />
                  </div>
                  <span className="font-semibold">{f.name}</span>
                </Link>
              ))}
            </div>
          </div>
          <div className={`w-[calc(100%-230px)] ${currentFriend ? '' : 'py-2'}`}>
            {currentFriend ? (
              <div className="w-full h-full">
                <div className="flex justify-start gap-3 items-center text-slate-600 text-lg h-[50px]">
                  <div className="w-[35px] h-[35px] rounded-full border-2 border-blue-500 relative">
                    <img
                      src={
                        currentFriend.image
                          ? currentFriend.image
                          : `${config.BASE_URL}/images/no_user_images.png`
                      }
                      alt=""
                      className="rounded-full"
                    />
                    {activeSeller.some((c) => c.sellerId === currentFriend.friendId) && (
                      <div className="w-[10px] h-[10px] rounded-full bg-green-500 absolute right-0 -bottom-1"></div>
                    )}
                  </div>
                  <span className="font-semibold">{currentFriend.name}</span>
                </div>
                <div className="h-[400px] w-full bg-slate-200 p-4 rounded-md shadow overflow-y-auto">
                  <div className="w-full flex flex-col gap-3">
                    {frMessages.map((m, i) => {
                      if (currentFriend?.friendId !== m.receiverId) {
                        return (
                          <div
                            key={i}
                            ref={messageEndRef}
                            className="w-full flex gap-2 justify-start items-center text-[14px]"
                          >
                            <img
                              className="w-[35px] h-[35px] object-contain rounded-full border-2 border-blue-500 shadow shadow-indigo-200"
                              src={
                                currentFriend.image
                                  ? currentFriend.image
                                  : `${config.BASE_URL}/images/no_user_images.png`
                              }
                              alt=""
                            />
                            <div className="p-2 bg-white text-slate-600 rounded-tl-lg rounded-tr-lg rounded-br-lg">
                              <span>{m.message}</span>
                            </div>
                          </div>
                        )
                      } else {
                        return (
                          <div
                            key={i}
                            ref={messageEndRef}
                            className="w-full flex gap-2 justify-end items-center text-[14px]"
                          >
                            <div className="p-2 bg-blue-500 text-white rounded-tl-lg rounded-tr-lg rounded-bl-lg">
                              <span>{m.message}</span>
                            </div>
                            <img
                              className="w-[35px] h-[35px] rounded-full border-2 border-white shadow shadow-indigo-200"
                              src={`${config.BASE_URL}/images/no_user_images.png`}
                              alt=""
                            />
                          </div>
                        )
                      }
                    })}
                  </div>
                </div>
                <div className="flex  justify-between items-center w-full px-2 py-4">
                  <div className="w-[40px] h-[40px] border p-2 justify-center items-center flex rounded-full">
                    <label className="cursor-pointer" htmlFor="">
                      <RiAttachment2 />
                    </label>
                    <input className="hidden" type="file" />
                  </div>
                  <div className=" h-[40px] p-0 ml-2 w-[calc(100%-90px)] rounded-full relative">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="w-full rounded-full h-full outline-none p-3 border focus:border-blue-500"
                    />
                    <div className="text-2xl right-2 top-2 absolute cursor-auto text-yellow-500">
                      <span>
                        <GrEmoji />
                      </span>
                    </div>
                  </div>
                  <div className="w-[40px] p-2 justify-center items-center rounded-full">
                    <div
                      onClick={handleSendMessageSeller}
                      className="text-2xl cursor-pointer text-[#34548d] active:scale-95 active:translate-y-[2px] transform transition duration-150 ease-in-out"
                    >
                      <IoSend />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex justify-center items-center text-lg bg-slate-200 rounded-md overflow-hidden">
                <div className="flex items-center gap-2 font-medium text-slate-600">
                  <PiSelectionAllBold size={28} />
                  <span>Select Seller ...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat
