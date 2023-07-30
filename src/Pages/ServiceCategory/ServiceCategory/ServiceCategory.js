import React from 'react';
import { useLoaderData } from 'react-router-dom';
import ServiceCard from './ServiceCard';

const ServiceCategory = () => {
    const data= useLoaderData()
    return (
        <div className='grid grid-cols-3 gap-3 my-10'>
            {
                data.map(datam=><ServiceCard key={datam._id} datam={datam}></ServiceCard>)
            }
        </div>
    );
};

export default ServiceCategory;