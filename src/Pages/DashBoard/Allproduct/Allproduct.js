import { useQuery } from '@tanstack/react-query';
import React from 'react';
import AllproductCard from './AllproductCard';

const Allproduct = () => {
    const url = `https://bikroy-server.vercel.app/allproduct`
    const { isLoading, isError, error, data: products } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    token: localStorage.getItem('accesstoken')
                }
            })
            const data = await res.json()
            return data
        }
    })
    if (isLoading) {
        return <span className="loading loading-dots loading-lg"></span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 m-5'>
            {
                products.map(product => <AllproductCard key={product._id} product={product}></AllproductCard>)
            }
        </div>
    );
};

export default Allproduct;