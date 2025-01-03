import React, { useEffect, useState } from 'react'
import {
  useStripe,
  useElements,
  PaymentElement,
  LinkAuthenticationElement
} from '@stripe/react-stripe-js'
import { ClipLoader, PropagateLoader } from 'react-spinners'
import config from '../utils/config'

const StripeCheckoutForm = ({ orderId }) => {
  localStorage.setItem('orderId', orderId)
  const stripe = useStripe()
  const elements = useElements()
  const [message, setMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const paymentElementOptions = {
    layout: {
      type: 'tabs',
      defaultCollapsed: false
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }
    setIsLoading(true)
    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: `${config.BASE_URL}/order/confirm`
      }
    })

    if (result?.error?.type === 'card_error' || result?.error?.type === 'validation_error') {
      setMessage(result?.error?.message)
    } else {
      setMessage('An Unexpected error occured')
    }
    setIsLoading(false)
  }
  return (
    <div>
      {' '}
      <form onSubmit={handleSubmit} id="payment-form">
        <LinkAuthenticationElement id="link-authentication-element" />
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button
          disabled={isLoading || !stripe || !elements}
          id="submit"
          className="px-10 py-[6px] bg-green-600 rounded-md hover:shadow-green-600 hover:shadow-md text-white mt-4"
        >
          {isLoading ? <ClipLoader /> : 'Pay Now'}
        </button>
        {message && <div>{message}</div>}
      </form>
    </div>
  )
}

export default StripeCheckoutForm
