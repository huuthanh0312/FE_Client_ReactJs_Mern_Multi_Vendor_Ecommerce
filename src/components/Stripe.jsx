import React, { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import axios from 'axios'
import StripeCheckoutForm from './StripeCheckoutForm'
import { MdOutlinePayments } from 'react-icons/md'
import config from '../utils/config'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)

const Stripe = ({ price, orderId }) => {
  console.log(price, orderId)
  const [clientSecret, setClientSecret] = useState('')
  const apperance = { theme: 'stripe' }
  const options = { apperance, clientSecret }

  // handle createPaymentStripe
  const createPaymentStripe = async () => {
    try {
      const { data } = await axios.post(
        `${config.API_URL}/api/order/create-payment`,
        { price },
        { withCredentials: true }
      )
      setClientSecret(data.clientSecret)
    } catch (error) {
      console.log(error.response.data)
    }
  }
  return (
    <div className="">
      {clientSecret ? (
        <Elements options={options} stripe={stripePromise}>
          <StripeCheckoutForm orderId={orderId} />
        </Elements>
      ) : (
        <button
          onClick={createPaymentStripe}
          className="px-10 py-[6px] rounded-sm hover:shadow-green-500/20 hover:shadow-lg bg-[#34548d] text-white flex flex-wrap justify-center items-center gap-1"
        >
          <MdOutlinePayments size={20} />
          Payment Now
        </button>
      )}
    </div>
  )
}

export default Stripe
