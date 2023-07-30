import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import useToken from '../../Hook/UseToken';

const SignIn = () => {
    const { register, handleSubmit,formState: { errors }} = useForm();
    const navigate=useNavigate()
    const {login,googlesignin}=useContext(AuthContext)
    const [tokenMail,settokenMail]= useState('')
    const [token]=useToken(tokenMail)
    if(token){
        
    }
    const handleLogin=data=>{
        login(data.email,data.password)
        .then(result=>{
                navigate('/')
                toast.success('Log in successful')
        })
        .catch(err=>console.log(err))
        settokenMail(data.email)
    } 
    const handleGoogle=async()=>{
        googlesignin()
        .then(result=>{
            if(result){
                console.log(result)
                saveUser(result.user.displayName,result.user.email,'Buyer')
                
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
                toast.success('Sign in successfull')
                navigate('/')
        })
        settokenMail(email)
    } 
    return (
        <div className='h-[550px] w-[420px] p-10 mx-auto flex justify-center items-center flex-col gap-3 shadow-xl rounded-xl'>
        <div>
            <h1 className='text-4xl'>Log in</h1>
        </div>
        <div className='grid grid-cols-1 gap-3s'>
            <form onSubmit={handleSubmit(handleLogin)}>
                
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" {...register('email', { required: "Email is required" })} className="input input-bordered w-full " />
                    {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                </div>
                
                <div className="form-control w-full ">
                    <label className="label pt-0">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" {...register('password', {
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
            <p>New to Doctors Portals? <Link to='/signup' className='text-secondary'>Create new account</Link></p>
            <div className="divider">OR</div>
            <button className='btn btn-outline' onClick={handleGoogle}>Contiune with google</button>
        </div>

    </div>
    );
};

export default SignIn;