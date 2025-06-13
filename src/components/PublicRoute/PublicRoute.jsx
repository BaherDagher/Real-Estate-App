// components/PublicRoute/PublicRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const PublicRoute = ({ children }) => {
    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        // Redirect logged-in users to home or admin dashboard
        const redirectPath = currentUser.role === 'admin' ? '/admin' : '/';
        return <Navigate to={redirectPath} replace />;
    }

    return children;
};

export default PublicRoute;