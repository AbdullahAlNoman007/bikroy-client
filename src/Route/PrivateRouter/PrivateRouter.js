import React from 'react';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const PrivateRouter = ({children}) => {
    let location =useLocation()
    const {user,loading}=useContext(AuthContext)
    if(loading){
        return <span className="loading loading-spinner loading-lg"></span>
    }
    if(user?.uid){
        return children
    }
    else{
        return  <Navigate to="/signin" state={{ from: location }} replace />;
    }
};

export default PrivateRouter;