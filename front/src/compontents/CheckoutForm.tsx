import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useState } from 'react'

export const CheckoutForm = ({setIsProcessing,amount}) => {
  const stripe = useStripe()
  const elements = useElements()
  const [message,setMessage] = useState<string>('')
  
  const handleSubmit: React.EventHandler<React.FormEvent> = async (e) => {
    e.preventDefault()

    if(!stripe || !elements) {
      return
    }
    setIsProcessing(true)
    const {error } = await stripe.confirmPayment({
      elements,
      confirmParams:{
        return_url:`${window.location.origin}/completion`
      }
    })
    if (error) {
      console.error(error)
      setMessage(error.message? error.message : 'An unknown error occured')
  }
  setIsProcessing(false)
 
}
return (
  <form className='mx-auto w-[350px] flex flex-col relative' id='payment-form' onSubmit={handleSubmit}>
    <PaymentElement className='p-4 shadow-xl rounded-lg'></PaymentElement>
  </form>
)
}
