import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../AuthProvider/AuthProvider';

const Navbar = () => {
    const {user,logout,data,wishlist}=useContext(AuthContext)
    const menuItems = <>
        <li><Link to='/'>Home</Link></li>
        {
            data.status==='Buyer' && <div className="indicator">
            <span className="indicator-item badge badge-primary">{wishlist}</span> 
            <li><Link to='/wishlist'>Wish List</Link></li>
          </div>
        }
       {
        user?.uid &&  <li><Link to='/dashboard'>Dashboard</Link></li>
       }
        <li><Link>Contact Us</Link></li>
        <li><Link to='/blog'>Blog</Link></li>
    </>
    return (
        <div className="navbar">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-lg font-normal">
                        {menuItems}
                        <li><button onClick={()=>logout()}>Logout</button></li>
                    </ul>
                </div>
                <Link className="btn btn-ghost normal-case text-xl">Bikroy.com</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 text-lg font-normal">
                    {menuItems}
                </ul>
            </div>
            {
                user?.uid? <div  className="navbar-end ">
                    <label htmlFor="my-drawer-2" tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                <div className="dropdown dropdown-end hidden lg:block">
                    <label   tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img src={user.photoURL} alt='Profile' />
                        </div>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <Link className="justify-between">
                                Profile
                                <span className="badge">{user?.displayName?.split(' ')[0]}</span>
                            </Link>
                        </li>
                        <li><button onClick={()=>logout()}>Logout</button></li>
                    </ul>
                </div>
            </div>:<li className='text-lg'><Link to='/signin'>Log In</Link></li>
            }
        </div>
    );
};

export default Navbar;