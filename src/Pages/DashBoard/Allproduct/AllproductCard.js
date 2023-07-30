import React, { useState } from 'react';
import { MdVerifiedUser } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ConfirmModal from '../../Shared/ConfirmModal/ConfirmModal';

const AllproductCard = ({product}) => {
    const { img, title, location, price, originalPrice, sellerName,verify }=product
    const [adStatus,setAdStatus]=useState(null)
    const navigate=useNavigate()
    const handleAd=product=>{
        fetch('https://bikroy-server.vercel.app/ad',{
            method:"POST",
            headers:{
                'content-type':'application/json',
                token:localStorage.getItem('accesstoken')
            },
            body:JSON.stringify(product)
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.acknowledged){
                toast.success('Successful!!!')
                navigate('/')
            }
            else{
                toast.error(data.sms)
            }
        })
    }
    return (
        <div className="card w-80 bg-base-100 shadow-xl">
            <figure><img src={img} alt={title} style={{height:'150px',width:'100px'}} /></figure>
            <div className="card-body">
                <h2 className="card-title">
                    {title}
                    <div className="badge badge-secondary">Advertised</div>
                </h2>
                <p>Location: {location}</p>
                <div className="card-actions justify-left">
                    <div className="badge badge-outline badge-success">Price: ${price}</div>
                    <div className="badge badge-outline badge-error">Real Price: ${originalPrice}</div>
                </div>
              <span className='flex items-center mt-3'>
              <p className='flex items-center gap-2 font-medium'>Seller: {sellerName}
              {
                verify && <MdVerifiedUser className='text-blue-500' />
              } </p>
              <label htmlFor="my_modal_6" onClick={()=>setAdStatus(product)} className="btn btn-xs btn-primary">Advertised</label>
              </span>
            </div>
            {
                adStatus && <ConfirmModal
                setAdStatus={setAdStatus}
                handleAd={handleAd}
                adData={product}
                ></ConfirmModal>
            }
        </div>
    );
};

export default AllproductCard;