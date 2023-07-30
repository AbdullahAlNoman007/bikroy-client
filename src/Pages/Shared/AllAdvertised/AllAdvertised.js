import { useQuery } from '@tanstack/react-query';
import React from 'react';
import AdvertisedCard from '../../Home/Advertised/AdvertisedCard';

const AllAdvertised = () => {
    const url=`https://bikroy-server.vercel.app/ad`
    const {isLoading,isError,data:ads,error}=useQuery({
        queryKey:['ad'],
        queryFn:async()=>{
            const res=await fetch(url,{
            })
            const data=await res.json()
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
        <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 mt-10 p-5'>
                {
                   ads.map(ad=><AdvertisedCard key={ad._id} ad={ad}></AdvertisedCard>)
                }
            </div>
    );
};

export default AllAdvertised;