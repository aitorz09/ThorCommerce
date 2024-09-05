import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

import { Stripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { CheckoutForm } from '../compontents/CheckoutForm';
import { useParams } from 'react-router-dom';

export const Payment = () => {
  const {amount} = useParams<{amount: any}>();
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null);
  const [clientSecret, setClientSecret] = useState('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  useEffect(() => {
    fetch('http://localhost:3000/config')
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        
        console.log(data.publicKey);
        
        setStripePromise(loadStripe(data.publicKey) as Promise<Stripe | null>);
      })
      .catch((err) => {
        console.error('Fetch error:', err);
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({amount}),
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const { clientSecret } = await res.json();
        setClientSecret(clientSecret);
      })
      .catch((err) => {
        console.error('Fetch error:', err);
      });
  }, [amount]);

  return (
    <>
      <section>
        <h1 className='text-center text-5xl my-6'>Payment</h1>
        {
          stripePromise && clientSecret &&
        <Elements stripe={stripePromise} options={{clientSecret}}>
            <CheckoutForm setIsProcessing={setIsProcessing} amount={amount}/>
        </Elements>
        }
        <button disabled={isProcessing} id='submit'>
      <span id='button text' className='bg-[#09f]/50 p-2 rounded-xl absolute my-4 px-4 mx-auto'>
      {isProcessing ? 'Processing...' : `Pay €${amount}`}
      </span>
    </button>
      </section>
    </>
  );
};
