// AdminRoute.js
import React, { useContext } from 'react';
import {Route, Navigate, Routes} from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';

const AdminRoute = ({ children }) => {
    const { isAdmin } = useContext(AuthContext);
    return isAdmin ?children : <Navigate to="/not-authorized" />;
};

export default AdminRoute;
