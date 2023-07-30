import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';
import AdvertisedCard from './AdvertisedCard';

const Advertised = () => {
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
        <>
             <h1 className='text-4xl font-medium mt-10'>Advertised</h1>
            <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 mt-10 p-5'>
                {
                   ads.slice(0,4).map(ad=><AdvertisedCard key={ad._id} ad={ad}></AdvertisedCard>)
                }
            </div>
           <div className='text-center mt-5'>
           {
                ads.length>4 && <button className='btn btn-sm btn-primary text-white'><Link to='/allads'>See more</Link></button>
            }
           </div>
        </>
    );
};

export default Advertised;