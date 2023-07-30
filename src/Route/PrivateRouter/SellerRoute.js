import React from 'react';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import useSeller from '../../Hook/UseSeller';

const SellerRoute = ({children}) => {
    let location =useLocation()
    const {user,loading}=useContext(AuthContext)
    const [isSeller,isSellerLoading]=useSeller(user?.email)

    if(loading || isSellerLoading){
        return <span className="loading loading-spinner loading-lg"></span>
    }
    if(user?.uid && isSeller){
        return children
    }
    else{
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }
};

export default SellerRoute;