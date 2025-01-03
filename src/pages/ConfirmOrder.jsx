import React, { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { HashLoader } from 'react-spinners'
import config from '../utils/config'
import axios from 'axios'
import { Link } from 'react-router-dom'

const load = async () => {
  return await loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)
}

const ConfirmOrder = () => {
  const [loader, setLoader] = useState(true)
  const [stripe, setStripe] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    if (!stripe) {
      return
    }

    // Retrieve the client secret from the URL
    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    )
    if (!clientSecret) {
      return
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent, error }) => {
      if (error) {
        setMessage('An error occurred while retrieving payment status.')
        console.error('Error retrieving payment intent:', error.message)
        return
      }

      switch (paymentIntent.status) {
        case 'succeeded':
          setMessage('succeeded')
          break
        case 'processing':
          setMessage('succeeded')
          break
        case 'requires_payment_method':
          setMessage('Payment failed. Please try again.')
          break
        default:
          setMessage('failed')
      }
    })
  }, [stripe])

  const getLoad = async () => {
    const tempStripe = await load()
    setStripe(tempStripe)
  }
  useEffect(() => {
    getLoad()
  }, [])

  const updatePayment = async () => {
    const orderId = localStorage.getItem('orderId')
    if (orderId) {
      try {
        await axios.get(`${config.API_URL}/api/order/confirm/${orderId}`)
        localStorage.removeItem('orderId')
        setLoader(false)
      } catch (error) {
        console.log(error.response.data)
      }
    }
  }
  useEffect(() => {
    if (message === 'succeeded') {
      updatePayment()
    }
  }, [message])
  return (
    <div>
      <div className="w-full h-full bg-gray-100 flex justify-center items-center ">
        {/* Left: Image */}
        <div className="w-1/2 h-screen block md:hidden">
          <img
            src={`${config.BASE_URL}/images/image_bg.jpg`}
            alt=""
            className="w-full h-full object-cover "
          />
        </div>
        {/* Right: */}
        <div className=" flex md:w-full w-1/2 h-screen">
          <div className="w-full flex flex-col justify-center items-center bg-white p-6 rounded-md shadow md:mx-auto h-screen">
            <img src={`${config.BASE_URL}/images/logo.png`} alt="" className=" object-contain " />
            {message === 'processing' || message === 'failed' ? (
              <>
                <img
                  src={`${config.BASE_URL}/images/error.png`}
                  alt=""
                  className=" object-contain "
                />

                <div className="text-center">
                  <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                    Connect Stripe Payment Error!
                  </h3>
                  <p className="text-gray-600 my-2 font-semibold">You can try again !</p>

                  <div className="py-10 text-center">
                    <Link
                      to="/dashboard/my-orders"
                      className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
                    >
                      BACK TO DASHBOARD
                    </Link>
                  </div>
                </div>
              </>
            ) : message === 'succeeded' ? (
              loader ? (
                <>
                  <HashLoader size={40} color="#f77001" className=" items-center justify-center" />
                  <div className="text-center pt-2">
                    <p className="inline-flex justify-center items-end text-green-600 font-semibold text-center">
                      Processing Payment ...
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
                    <path
                      fill="currentColor"
                      d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
                    ></path>
                  </svg>
                  <div className="text-center">
                    <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                      Stripe Payment Done!
                    </h3>
                    <p className="text-gray-600 my-2 font-semibold">
                      Thank you for completing your secure online payment.
                    </p>
                    <p className="font-semibold"> Have a great day!</p>
                    <div className="py-10 text-center">
                      <Link
                        to="/dashboard/my-orders"
                        className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
                      >
                        BACK TO DASHBOARD
                      </Link>
                    </div>
                  </div>
                </>
              )
            ) : (
              <>
                <HashLoader size={40} color="#f77001" className=" items-center justify-center" />
                <div className="text-center pt-2">
                  <p className="inline-flex justify-center items-end text-green-600 font-semibold text-center">
                    Processing Payment ...
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmOrder
