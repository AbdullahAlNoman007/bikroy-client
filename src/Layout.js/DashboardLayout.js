import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Navbar from '../Pages/Shared/NavBar/Navbar';
import { AuthContext } from '../AuthProvider/AuthProvider';

const DashboardLayout = () => {
    const {data}=useContext(AuthContext)
    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center ">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                        {
                            data.status ==='Buyer'&& <li><Link to='/dashboard/myorders'>My orders</Link></li>
                        }
                       {
                        data?.status === 'Seller' && <>
                         <li><Link to='/dashboard/addproduct'>Add a Product</Link></li>
                        <li><Link to='/dashboard/myProduct'>My Products</Link></li>
                        </>
                       }
                       {
                        data?.role ==='admin' && <>
                         <li><Link to='/dashboard/allsellers'>All sellers</Link></li>
                        <li><Link to='/dashboard/allbuyers'>All Buyers</Link></li>
                        <li><Link to='/dashboard/allproduct'>All Products</Link></li>
                        </>
                       }
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;