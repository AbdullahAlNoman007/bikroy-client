import React, { useContext } from 'react';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import MyProductCard from './MyProductCard';

const MyProduct = () => {
    const {user}=useContext(AuthContext)
    const url =`https://bikroy-server.vercel.app/myProduct?email=${user.email}`
    const { isLoading, isError, data:products, error,refetch } = useQuery({
        queryKey: ['[product',user],
        queryFn:async ()=>{
           const res=await fetch(url,{
                headers:{
                    token:localStorage.getItem('accesstoken')
                }
            })
            const data=await res.json()
            return data
        },
      })
      if (isLoading) {
        return <span className="loading loading-dots loading-lg"></span>
      }
    
      if (isError) {
        return <span>Error: {error.message}</span>
      }

     
    return (
        <div className='mt-10 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-5 ml-10'>
            {
                products.map(data=><MyProductCard key={data._id} data={data} refetch={refetch}></MyProductCard>)
            }
        </div>
    );
};

export default MyProduct;