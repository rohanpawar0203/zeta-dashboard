import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { firebase_app } from '../Config/Config';
import { authHeader, handleResponse } from '../Services/Fack.Backend';

const PrivateRoute = () => {
    const [currentUser, setCurrentUser] = useState((localStorage.getItem('currentUser')) || null);
  const [token, settoken] = useState((localStorage.getItem('token')) || null)

    return (
        currentUser && token ?
            <Outlet />
            :
            <Navigate exact to={`${process.env.PUBLIC_URL}/login`} />
    );
};

export default PrivateRoute;

