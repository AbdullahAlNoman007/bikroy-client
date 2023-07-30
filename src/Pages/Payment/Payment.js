import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CheckOutForm from './CheckOutForm';

const Payment = () => {
    const stripePromise = loadStripe('pk_test_51NWIEHGrjLgGHGRDQFoa83Gnip5UcNEBMp96FSzOGPAHrYoVmYslrrGQRCYd9J7k768dHJI34G8FXdNrwhgclIrQ00NdFoGo4Z');
    const data = useLoaderData()
    console.log(data)
    return (
        <div>
            <h3 className='text-3xl'>Payment for {data.title}</h3>
            <p className='text-xl mt-7'>Please, pay {data.price}</p>
            <Elements stripe={stripePromise}>
                <CheckOutForm
                data={data}
                 />
            </Elements>
        </div>
    );
};

export default Payment;