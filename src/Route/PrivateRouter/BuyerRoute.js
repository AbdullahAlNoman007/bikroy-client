import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import useBuyer from '../../Hook/UseBuyer';

const BuyerRoute = ({children}) => {
    let location =useLocation()
    const {user,loading}=useContext(AuthContext)
    const [isBuyer,isBuyerLoading]=useBuyer(user?.email)

    if(loading || isBuyerLoading){
        return <span className="loading loading-spinner loading-lg"></span>
    }
    if(user?.uid && isBuyer){
        return children
    }
    else{
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }
};

export default BuyerRoute;