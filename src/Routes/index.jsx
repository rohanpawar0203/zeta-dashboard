import React, { Fragment, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { firebase_app, auth0 } from '../Config/Config';
import { configureFakeBackend, authHeader, handleResponse, } from '../Services/Fack.Backend';
import Loader from '../Layout/Loader';
import LayoutRoutes from './LayoutRoutes';
import Callback from '../Auth/Callback';
import { authRoutes } from './AuthRoutes';
import PrivateRoute from './PrivateRoute';
import Signin from '../Auth/Signin';
import Signup from '../Auth/Signup';
import { connectWithSocketIOServer } from '../Component/Live Chats/Client/wss';

configureFakeBackend();
const Routers = () => {
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('currentUser') || null);
  const [token, settoken] = useState((localStorage.getItem('token')) || null)
  const [authenticated, setAuthenticated] = useState(false);
  const jwt_token = localStorage.getItem('token');
  useEffect(() => {
    console.log(token, currentUser);
    if(token && currentUser){
      connectWithSocketIOServer();
    }
  }, []);

  return (
    <Fragment>
      <Auth0Provider domain={auth0.domain} clientId={auth0.clientId} redirectUri={auth0.redirectUri}>
        <BrowserRouter basename={'/'}>
          <>
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route path={'/'} element={<PrivateRoute />}>
                  {currentUser  && token ?
                    <>
                      <Route exact
                        path={`${process.env.PUBLIC_URL}`}
                        element={<Navigate to={`${process.env.PUBLIC_URL}/dashboard/default`} />}
                      />
                      <Route exact
                        path={`/`}
                        element={<Navigate to={`${process.env.PUBLIC_URL}/dashboard/default`} />}
                      />
                    </> : ''}
                  <Route path={`/*`} element={<LayoutRoutes />} />
                </Route>
                <Route path={`${process.env.PUBLIC_URL}/callback`} render={() => <Callback />} />
                <Route exact path={`${process.env.PUBLIC_URL}/login`} element={<Signin />} />
                <Route exact path={`${process.env.PUBLIC_URL}/signup`} element={<Signup />} />
                {authRoutes.map(({ path, Component }, i) => (
                  <Route path={path} element={Component} key={i} />
                ))}
              </Routes>
            </Suspense>
          </>
        </BrowserRouter>
      </Auth0Provider>
    </Fragment >
  );
};
export default Routers;