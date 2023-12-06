import io from "socket.io-client";
import axios from "axios";
import { toast } from "react-toastify";
import {
  AgentLiveChatAPI,
  GetConversationsAPI,
  LiveChatsAPI,
} from "../../../api";
import appStore from "./AppStore";
import { getSessionId } from "../../Bots/sessionSetup";
const { v4: uuidv4 } = require("uuid");

// import { setLiveConversation } from "../components/dashboard/liveChat/liveChat";
const SERVER = process.env.REACT_APP_API_SERVER;
const user = JSON.parse(sessionStorage.getItem("currentUser"));
const token = sessionStorage.getItem("token");
// const SERVER = "http://localhost:8081";

var socket = null;
const{setLiveConversation, liveConversation} = appStore.getState();

export const connectWithSocketIOServer = () => {
  socket = io(SERVER, {
    path: "/agent-live-chat-socket/",
  });

  socket.on("connect", () => {
    appStore.getState().setIsConnected(true);
    agentConnected();
    getLiveRooms();
    // console.log("Bot Connected with Server");
  });
  socket.on("room-id", (data) => {
    const { roomId } = data;
    // console.log(roomId);
  });

  socket.on("room-update", (data) => {
    const { connectedUsers } = data;
    // console.log(connectedUsers);
  });

  socket.on("conn-prepare", (data) => {
    const { connUserSocketId } = data;
    // console.log("conn-prepare", connUserSocketId);
  });
  socket.on("conn-signal", (data) => {
    // console.log("conn-signal", data);
  });

  socket.on("conn-init", (data) => {
    const { connUserSocketId } = data;
    // console.log("conn-init", connUserSocketId);
  });

  socket.on("user-disconnected", (data) => {
    // console.log("Data disconnect", data);
  });

  socket.on("message-recieved", (data) => { 
    appStore.getState().setShowTyping(false);
   console.log("message-recieved", data);
    let newMessage = JSON.parse(data);
    console.log('liveConversation ', liveConversation);
    const newArray = appStore.getState().liveConversation.map((el) => {
      if (el.chatSessionId === newMessage.roomId) {
        el.chat = [
          ...el.chat,
          { time: newMessage.time, message: newMessage.message, from: "USER" },
        ];
      }
      return el;
    });

    if (newMessage.identity === "BOT" || newMessage.identity === "AGENT") {
      appStore.getState().messageType(newMessage);
    }
    console.log("message-recieved newArray", newArray);
    appStore.getState().setLiveConversation(newArray);
    console.log("get liveConversation", liveConversation);
  });

  socket.on("disconnect", function () {
    appStore.getState().setIsConnected(false);
    // console.log("client socketio disconnect!");
  });
  socket.on("room-close", function (data) {
    // console.log("roomClose", data);
  });
  socket.on("user-wants-to-chat-agent", function (data) {
    // let roomId = JSON.parse(data);
    toast.success("New Live Chat for Agent !");
    getLiveRooms();
  });
};
export const getRoomExists = async (roomId) => {
  // const serverApi = "http://localhost:8081";
  const serverApi = `${AgentLiveChatAPI}`;
  const response = await axios.get(`${serverApi}/room-exists/${roomId}`);
  return response.data;
};
export const agentConnected = async () => {
  const data = {
    organization_id: user?.userId
      ? user?.userId //handle for agent
      : user?._id,
    email: user?.email,
  };
  socket.emit("agent-connected", JSON.stringify(data));
};
export const createOrConnectRoom = async (identity) => {
  // console.log("working details", appStore.getState().botDetails);
  let roomId = getSessionId(sessionStorage.getItem("sessionUUID"));
  // console.log("RoomID", roomId);
  const data = {
    identity: "USER",
    defaultConnection: socket.id,
    roomId: roomId,
    organization_id: appStore.getState().botDetails.userId,
  };
  if (!data.organization_id) return;
  if (roomId === undefined || roomId === null || roomId === "null") {
    data.roomId = uuidv4();
    sessionStorage.setItem("connectionId", data.roomId);
  } else {
    const resp = await getRoomExists(roomId);
    if (!resp.roomExists) {
      socket.emit("create-new-room", data);
    }
    appStore.getState().setRoomId(data);
    socket.emit("join-room", data);
    return;
  }
  appStore.getState().setRoomId(data);
  // console.log("createOrConnectRoom", data);
  socket.emit("create-new-room", data);
};

export const joinSession = (roomId) => {
  const data = {
    identity: "AGENT",
    roomId: roomId,
  };
  socket.emit("join-room", data);
};
export const sendDataToConnectedUser = (data) => {
  appStore.getState().setShowTyping(true);
  socket.emit("mssg-sent", JSON.stringify(data));
};
export const getLiveRooms = async () => {
  // const serverApi = "http://localhost:8081";
  const serverApi = `${LiveChatsAPI}`;
  const response = await axios.post(`${serverApi}/getChatsForAgent`, {
    organization_id: user?.userId ? user?.userId : user?._id,
    //handle for agent
  });
  appStore.getState().setLiveConversationNewEntry(response.data.rooms);
  setLiveConversations();
};

export const envConversationToServer = async (roomId) => {
  // const serverApi = "http://localhost:8081";
  const serverApi = `${LiveChatsAPI}`;
  const response = await axios.post(`${serverApi}/endConversation`, {
    roomId: roomId,
  });
};

const setLiveConversations = async () => {
  const liveConversationNewEntry = appStore.getState().liveConversationNewEntry;
  const conversation = appStore.getState().conversation;
  const userData = appStore.getState().userData;
  console.log('userData at setLivecon ', userData);
  const token = appStore.getState().token;
  const orgId = userData.userId ? userData.userId : userData._id;
  if (liveConversationNewEntry.length !== 0) {
    if (conversation.length === 0) {
      try {
        const resp = await axios.get(`${GetConversationsAPI}/${orgId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('liveConversationNewEntry  ', liveConversationNewEntry);
        console.log('liveConversationNewEntry resp.data   ', resp.data);
        const filterArray = resp.data.filter((el) => {
          let flag = false;
          liveConversationNewEntry.forEach((element) => {
            if (element.roomId === el.chatSessionId) {
              flag = true;
            }
          });
          if (flag) {
            return el;
          }
        });
        console.log('filterArray first', filterArray)
        appStore.getState().setLiveConversation(filterArray);
        console.log('setLiveConversations 1', appStore.getState().liveConversation);
        appStore.getState().setConversation(resp.data);
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      const filterArray = conversation.filter((el) => {
        let flag = false;
        liveConversationNewEntry.forEach((element) => {
          if (element.roomId === el.chatSessionId) {
            flag = true;
          }
        });
        if (flag) {
          return el;
        }
      });
      appStore.getState().setLiveConversation(filterArray);
      console.log('setLiveConversations 2', appStore.getState().liveConversation);
    }
  }
};
