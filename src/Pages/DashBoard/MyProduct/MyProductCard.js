import React from 'react';

const MyProductCard = ({data,refetch}) => {
    const { img, title, location, price, originalPrice, sellerName,_id } = data
    const handledelete=id=>{
        fetch(`https://bikroy-server.vercel.app/productdelete/${id}`,{
            method:'PUT',
            headers:{
                token:localStorage.getItem('accesstoken')
            }
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.acknowledged){
                refetch()
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
              <p className='flex items-center gap-2 font-medium'>Seller: {sellerName} </p>
              <button className='btn btn-xs btn-error' onClick={()=>handledelete(_id)}>Delete</button>
              </span>
            </div>
        </div>
    );
};

export default MyProductCard;