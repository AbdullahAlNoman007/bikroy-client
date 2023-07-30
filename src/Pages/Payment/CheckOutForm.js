import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import './form.css'

const CheckOutForm = ({data}) => {
  const [error,setError]=useState('')
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState("");
    const {price,email,title,_id}=data
    useEffect(() => {
      // Create PaymentIntent as soon as the page loads
      fetch("https://bikroy-server.vercel.app/create-payment-intent", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json" ,
          token:localStorage.getItem('accesstoken')
      },
        body: JSON.stringify({ price }),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    }, [price]);
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (!stripe || !elements) {
          return;
        }
    
      
        const card = elements.getElement(CardElement);
    
        if (card == null) {
          return;
        }
    
        const {error, paymentMethod} = await stripe.createPaymentMethod({
          type: 'card',
          card,
        });
    
        if (error) {
          setError(error.message)
        } else {
         setError('')
        }
        const {paymentIntent,error:confirmError}=await stripe.confirmCardPayment(
         clientSecret,
          {
            payment_method:{
              card:card,
              billing_details:{
                name:title,
                email:email
              }
            }
          }
        )
        if(confirmError){
          setError(confirmError.message)
          return
        }
        if(paymentIntent.status ==='succeeded'){
          fetch('https://bikroy-server.vercel.app/alldelete',{
            method:"DELETE",
            headers:{
              'content-type':'application/json',
              token:localStorage.getItem('accesstoken')
            },
            body:JSON.stringify({_id})
          })
          .then(res=>res.json())
          .then(data=>{
            if(data.acknowledged){
              toast.success('Payment Successful')
            }           
          })
        }
      };
      
    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button type="submit" disabled={!stripe} className='btn btn-sm btn-primary'>
                Pay
            </button>
            {error && <p className='text-red-600'>{error}</p>}
        </form>
    );
};

export default CheckOutForm;