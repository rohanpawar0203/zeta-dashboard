import { createContext, useContext, useEffect, useState } from "react";
import {
  connectWithSocketIOServer,
  createOrConnectRoom,
  socket,
  socketConnetionURL,
} from "../Client/wss";
import { getSessionId } from "../../Bots/sessionSetup";
import appStore from "../Client/AppStore";

export const SocketContext = createContext();

const SocketContextProvider = ({ children }) => {
  const { userData, token } = appStore();
  const [roomId, setRoomId] = useState(
    getSessionId(sessionStorage.getItem("sessionUUID"))
  );

  useEffect(() => {
    // if (socket !== null) socketConnetionURL();
    if (userData) {
      connectWithSocketIOServer();
    }
  }, [userData]);
  return (
    <SocketContext.Provider value={{ roomId, setRoomId }}>
      {children}
    </SocketContext.Provider>
  );
};

export const GetSocketContextValues = () => {
  const { roomId, setRoomId } = useContext(SocketContext);

  return {
    roomId,
    setRoomId,
  };
};

export default SocketContextProvider;
