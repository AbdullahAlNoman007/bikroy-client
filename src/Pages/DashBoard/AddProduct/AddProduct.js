import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const {user}=useContext(AuthContext)
    const navigate=useNavigate()
    const addProduct=(data)=>{
        const img=data.img[0]
        const formData =new FormData()
        formData.append('image',img)
        const url=`https://api.imgbb.com/1/upload?key=${process.env.React_APP_image}`
        fetch(url,{
            method:'POST',
           body:formData
        })
        .then(res=>res.json())
        .then(ImgData=>{
            if(ImgData.success){
                fetch(`https://bikroy-server.vercel.app/verifyProduct?email=${user.email}`)
                .then(res=>res.json())
                .then(datam=>{
                    const url =ImgData.data.url
                    const productDetails={
                    sellerName:user.displayName,
                    email:user.email,
                    title:data.productname,
                    catID:data.catID,
                    location:data.location,
                    originalPrice:data.realPrice,
                    price:data.currentPrice,
                    img:url,
                    verify:datam.verify
                    
                }
                fetch('https://bikroy-server.vercel.app/product',{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json',
                        token:localStorage.getItem('accesstoken')
                    },
                    body:JSON.stringify(productDetails)
                })
                .then(res=>res.json())
                .then(data=>{
                    toast.success('Successfully add the product')
                    navigate('/dashboard/myProduct')
                })
                })                
            }
        })
        }
    return (
        <div className='w-96 p-7'>
            <h1 className='text-4xl font-semibold'>Add a Product</h1>
            <form  onSubmit={handleSubmit(addProduct)} >
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">Product's Name</span>
                    </label>
                    <input type="name" {...register('productname', { required: "Product's Name is required" })} className="input input-bordered w-full " />
                    {errors.name && <p className='text-red-600'>{errors.name?.message}</p>}
                </div>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">Categories</span>
                    </label>
                    <input type="number" {...register('catID', { required: "Catgeory ID is required" })} className="input input-bordered w-full " placeholder='11 for Laptop, 22 for Tab, 33 for Phone' />
                    {errors.name && <p className='text-red-600'>{errors.name?.message}</p>}
                </div>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">Location</span>
                    </label>
                    <input type="name" {...register('location', { required: "Location is required" })} className="input input-bordered w-full " />
                    {errors.name && <p className='text-red-600'>{errors.name?.message}</p>}
                </div>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">Real Price</span>
                    </label>
                    <input type="number" {...register('realPrice', { required: "Price Address is required" })} className="input input-bordered w-full " />
                    {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                </div>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">Current Price</span>
                    </label>
                    <input type="Number" {...register('currentPrice', { required: "Price Address is required" })} className="input input-bordered w-full " />
                    {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                </div>
              
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">Image</span>
                    </label>
                    <input type="file" {...register('img', { required: "Give the Product's image" })} className="input w-full " />
                </div>
                <input type="submit" value='Add Product' className='btn btn-accent w-full my-4' />
            </form>
        </div>
    );
};

export default AddProduct;