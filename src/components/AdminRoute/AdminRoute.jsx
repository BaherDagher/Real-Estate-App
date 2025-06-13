import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Loader from '../Loader/Loader';

const AdminRoute = ({ children }) => {
    const { currentUser, loading } = useContext(AuthContext);

    if (loading) {
        return <Loader />;
    }

    // Check if user is logged in and has the admin role
    if (!currentUser || currentUser.role !== 'admin') {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default AdminRoute;