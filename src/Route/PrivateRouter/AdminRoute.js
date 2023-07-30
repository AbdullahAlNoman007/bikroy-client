import React from 'react';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import useAdmin from '../../Hook/UseAdmin';

const AdminRoute = ({children}) => {
    let location =useLocation()
    const {user,loading}=useContext(AuthContext)
    const [isAdmin,isAdminLoading]=useAdmin(user?.email)

    if(loading || isAdminLoading){
        return <span className="loading loading-spinner loading-lg"></span>
    }
    if(user?.uid && isAdmin){
        return children
    }
    else{
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }
};

export default AdminRoute;