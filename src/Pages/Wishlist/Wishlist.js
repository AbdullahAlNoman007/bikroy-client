import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const Wishlist = () => {
    const { user,setwishlist } = useContext(AuthContext)
    const { isLoading, isError, error, data: carts } = useQuery({
        queryKey: ['wishlist',user],
        queryFn: async () => {
            const url = `https://bikroy-server.vercel.app/cart?email=${user?.email}`
            const res = await fetch(url, {
                headers: {
                    token: localStorage.getItem('accesstoken')
                }
            })
            const data = await res.json()
            setwishlist(data.length)
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
        <div className="w-3/4">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Real Price</th>
                        <th>Price</th>
                        <th>Seller</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                  {
                    carts.map(cart=>  <tr key={cart._id}>
                        <td>
                            <div className="flex items-center space-x-3">
                                <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src={cart.img} alt="Avatar Tailwind CSS Component" />
                                    </div>
                                </div>
                                <div>
                                    <div className="font-bold">{cart.title}</div>
                                    <div className="text-sm opacity-50">{cart.location}</div>
                                </div>
                            </div>
                        </td>
                        <td>
                            {cart.originalPrice}
                        </td>
                        <td>
                            {cart.price}
                        </td>
                        <td>{cart.sellerName}</td>
                        <th>
                        <Link to={`/cartpayment/${cart._id}`}> <button className='btn btn-primary btn-sm bg-gradient-to-r from-primary to-secondary text-white'>Buy</button></Link>
                        </th>
                    </tr>)
                  }
                </tbody>
            </table>
        </div>
    );
};

export default Wishlist;