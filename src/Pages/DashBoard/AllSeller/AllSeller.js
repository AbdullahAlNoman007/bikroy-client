import { useQuery } from '@tanstack/react-query';
import React from 'react';

const AllSeller = () => {
    const url = `https://bikroy-server.vercel.app/alls&b?role=Seller`
    const { isLoading, isError, data: sellers, error,refetch } = useQuery({
        queryKey: ['seller'],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    token: localStorage.getItem('accesstoken')
                }
            })
            const data = await res.json()
            return data
        }
    })
    if (isLoading) {
        return <span className="loading loading-dots loading-lg"></span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }
    const handleVerify=id=>{
        fetch(`https://bikroy-server.vercel.app/verify/${id}`,{
            method:'PATCH',
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
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        sellers.map((seller,index)=><tr className="hover" key={seller._id}>
                        <th>{index+1}</th>
                        <td>{seller.name}</td>
                        <td>{seller.email}</td>
                        <td>
                            {
                                seller.verify ? <button className='btn btn-sm'disabled>Verified</button>:<button className='btn btn-sm btn-accent' onClick={()=>handleVerify(seller._id)} >Verify</button>
                            }
                        </td>
                        <td>
                        <button className='btn btn-sm btn-error' onClick={()=>handleDetele(seller._id)}>Delete</button>
                    </td>
                    </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default AllSeller;