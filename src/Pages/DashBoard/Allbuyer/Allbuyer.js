import { useQuery } from '@tanstack/react-query';
import React from 'react';

const Allbuyer = () => {
    const url=`https://bikroy-server.vercel.app/alls&b?role=Buyer`
    const {isLoading,isError,error,data:buyers,refetch}=useQuery({
        queryFn:['buyers'],
        queryFn:async()=>{
            const res=await fetch(url,{
                headers:{
                    token:localStorage.getItem('accesstoken')
                }
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
      const handleDetele=id=>{
        fetch(`https://bikroy-server.vercel.app/delete/${id}`,{
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
        <div className="w-3/4 px-10">
        <table className="table">
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    buyers.map((buyer,index)=><tr className="hover" key={buyer._id}>
                    <th>{index+1}</th>
                    <td>{buyer.name}</td>
                    <td>{buyer.email}</td>
                    <td>
                        <button className='btn btn-sm btn-error' onClick={()=>handleDetele(buyer._id)}>Delete</button>
                    </td>
                </tr>)
                }
            </tbody>
        </table>
    </div>
    );
};

export default Allbuyer;