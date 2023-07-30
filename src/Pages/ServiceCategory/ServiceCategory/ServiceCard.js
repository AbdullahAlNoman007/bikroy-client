import React, { useContext } from 'react';
import { MdVerifiedUser } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../AuthProvider/AuthProvider';

const ServiceCard = ({ datam }) => {
    const {data,user}=useContext(AuthContext)
    const { img, title, location, price, originalPrice, sellerName, verify,_id } = datam
    const product = {
        _id:_id,
        img,
        title,
        location,
        price,
        originalPrice,
        sellerName,
        verify,
        email:user?.email,
      }
    const handleCart=(product)=>{
        fetch('https://bikroy-server.vercel.app/cart',{
          method:'POST',
          headers:{
            'content-type':'application/json',
            token:localStorage.getItem('accesstoken')
          },
          body:JSON.stringify(product)
        })
        .then(res=>res.json())
        .then(data=>{
          if(data.acknowledged){
            toast.success("Added to Cart")
          }
          
        })
      }
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src={img} alt={title} style={{ height: '295px', width: '345px' }} className='rounded-xl' /></figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>Location: {location}</p>
                <div className="card-actions justify-left">
                    <div className="badge badge-outline badge-success">Price: ${price}</div>
                    <div className="badge badge-outline badge-error">Real Price: ${originalPrice}</div>
                </div>
                <span className='flex items-center mt-3'>
                    <p className='flex items-center gap-2 font-medium'>Seller: {sellerName}
                        {
                            verify && <MdVerifiedUser className='text-blue-500' />
                        }
                    </p>
                    <Link to={`/payment/${_id}`}> <button className='btn btn-primary btn-sm bg-gradient-to-r from-primary to-secondary text-white'>Buy</button></Link>
                   {
                    data.status ==='Buyer' && <button className='btn btn-primary btn-sm bg-gradient-to-r from-primary to-secondary text-white mx-3' onClick={()=>handleCart(product)}>Add to Cart</button>
                   }
                </span>
            </div>
        </div>
    );
};

export default ServiceCard;