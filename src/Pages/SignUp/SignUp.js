import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { toast } from 'react-toastify';
import useToken from '../../Hook/UseToken';

const SignUp = () => {
    const { register, handleSubmit,formState: { errors }} = useForm();
    const {signup,update,googlesignin}=useContext(AuthContext)
    const navigate=useNavigate()
    const [email,setEmail]= useState('')
    const [token]=useToken(email)
    if(token){
        
    }
    const handleGoogle=async()=>{
        googlesignin()
        .then(result=>{
            if(result){
                saveUser(result.user.displayName,result.user.email,'Buyer')
                
            }
        })
    }
    const onSubmit = (data) => {
        const image= data.img[0]
        const formData =new FormData()
        formData.append('image',image)
        const url=`https://api.imgbb.com/1/upload?key=${process.env.React_APP_image}`
        fetch(url,{
            method:'POST',
            body: formData
        })
        .then(res=>res.json())
        .then(imgData=>{
            if(imgData.success){
                const imgUrl= imgData.data.url
                const userInfo={
                    displayName: data.name, photoURL: imgUrl
                }
                signup(data.email,data.password)
                .then(user=>{
                    update(userInfo)
                    .then(()=>{
                        saveUser(data.name,data.email,data.status)
                    })
                    .catch(err=>console.log(err))
                })
                .catch(err=>console.log(err))
            }
        })
    }
    const saveUser=(name,email,status)=>{
        const details ={name,email,status}
        fetch('https://bikroy-server.vercel.app/users',{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(details)
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.acknowledged){
                setEmail(email)
                toast.success('Sign up successfull')
                navigate('/')
            }
        })
    }
    return (
        <div className='h-[750px] w-[420px] p-10 mx-auto flex justify-center items-center flex-col gap-3 shadow-xl rounded-xl'>
            <div>
                <h1 className='text-4xl'>Sign Up</h1>
            </div>
            <div className='grid grid-cols-1 gap-3s'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="Name" {...register("name", { required: "Name is required" })} className="input input-bordered w-full " />
                        {errors.name && <p className='text-red-600'>{errors.name?.message}</p>}
                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" {...register("email", { required: "Email is required" })} className="input input-bordered w-full " />
                        {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Profile Photo</span>
                        </label>
                        <input type="file" {...register("img", { required: "Image is required" })} className="input w-full " />
                    </div>
                    <div className="form-control w-full my-2 ">
                        <label className="label">
                            <span className="label-text">Status</span>
                        </label>
                        <select className="select select-bordered w-full " {...register("status")} >
                        <option selected>Buyer</option>
                        <option>Seller</option>
                    </select>
                    </div>
                    
                    <div className="form-control w-full ">
                        <label className="label pt-0">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" {...register("password", {
                            required: "Password is required",
                            minLength: { value: 6, message: "Password must be 6 charactes or above" },
                            pattern: { value: /(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])/, message: "Password must be strong" }
                        })} className="input input-bordered w-full " />
                        {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                        <label className="label pb-0">
                            <span className="label-text"><Link to=''>Forget Password?</Link></span>
                        </label>
                    </div>
                    <input type="submit" className='btn btn-accent w-full my-4' />
                </form>
                <p>Already have an account? <Link to='/signin' className='text-secondary'>Please LogIn</Link></p>
                <div className="divider">OR</div>
                <button className='btn btn-outline' onClick={handleGoogle}>Contiune with google</button>
            </div>

        </div>
    );
};

export default SignUp;