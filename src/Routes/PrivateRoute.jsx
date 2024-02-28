import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { firebase_app } from "../Config/Config";
import { authHeader, handleResponse } from "../Services/Fack.Backend";
import {
  connectWithSocketIOServer,
  createOrConnectRoom,
} from "../Component/Live Chats/Client/wss";

const PrivateRoute = () => {
  const [currentUser, setCurrentUser] = useState(
    sessionStorage.getItem("currentUser") || null
  );
  const [token, settoken] = useState(sessionStorage.getItem("token") || null);

  // useEffect(() => {
  //   if (currentUser && token) {
  //     console.log("connectWithSocketIOServer");
  //     connectWithSocketIOServer();
  //     createOrConnectRoom();
  //   }
  // }, []);

  return currentUser && token ? (
    <Outlet />
  ) : (
    <Navigate exact to={`${process.env.PUBLIC_URL}/login`} />
  );
};

export default PrivateRoute;
